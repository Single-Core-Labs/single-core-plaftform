use colored::*;
use indicatif::{MultiProgress, ProgressBar, ProgressStyle};
use std::env;
use std::time::Duration;

// ── NO_COLOR Support ────────────────────────────────────────

pub fn is_color_enabled() -> bool {
    env::var("NO_COLOR").is_err()
}

// ── THEME / COLORS ──────────────────────────────────────────

pub fn primary(s: &str) -> ColoredString {
    if is_color_enabled() { s.bright_cyan() } else { s.normal() }
}
pub fn success(s: &str) -> ColoredString {
    if is_color_enabled() { s.bright_green() } else { s.normal() }
}
pub fn warning(s: &str) -> ColoredString {
    if is_color_enabled() { s.bright_yellow() } else { s.normal() }
}
pub fn error(s: &str) -> ColoredString {
    if is_color_enabled() { s.bright_red() } else { s.normal() }
}
pub fn muted(s: &str) -> ColoredString {
    if is_color_enabled() { s.bright_black() } else { s.normal() }
}
pub fn white(s: &str) -> ColoredString {
    if is_color_enabled() { s.white() } else { s.normal() }
}

// ── COMPONENTS ──────────────────────────────────────────────

/// Header bar: ╭─ scl run ──────────────────────────────────────╮
pub fn print_header(title: &str) {
    let total_width = terminal_width().min(80);
    let fill = total_width.saturating_sub(title.len() + 6); // 4 for "╭─ " + 2 for " ╮"
    println!(
        "{} {} {}{}",
        "╭─".bold(),
        title.bold(),
        "─".repeat(fill).bold(),
        "╮".bold()
    );
}

/// Async spinner with braille animation: ⠋ Routing request...
pub fn create_spinner(message: &str) -> ProgressBar {
    let pb = ProgressBar::new_spinner();
    pb.set_style(
        ProgressStyle::default_spinner()
            .tick_chars("⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏")
            .template("{spinner:.cyan} {msg}")
            .unwrap(),
    );
    pb.set_message(message.to_string());
    pb.enable_steady_tick(Duration::from_millis(80));
    pb
}

/// Route card showing routing metadata
pub fn print_route_card(
    model: &str,
    provider: &str,
    intent: &str,
    policy: &str,
    cached: bool,
    cost: &str,
) {
    let w = 45;
    println!("┌{}┐", "─".repeat(w));
    print_card_row("model", &primary(model).to_string(), w);
    print_card_row("provider", provider, w);
    print_card_row("intent", intent, w);
    print_card_row("policy", policy, w);
    print_card_row(
        "cached",
        &if cached {
            success("true").to_string()
        } else {
            error("false").to_string()
        },
        w,
    );
    print_card_row("est cost", cost, w);
    println!("└{}┘", "─".repeat(w));
}

fn print_card_row(label: &str, value: &str, box_width: usize) {
    // We need to handle ANSI escape codes in value that affect visible width
    let visible_value_len = strip_ansi_codes(value).len();
    let label_part = format!("  {}  {}", muted(label), value);
    let label_visible_len = 2 + label.len() + 2 + visible_value_len;
    let padding = box_width.saturating_sub(label_visible_len + 2);
    println!("│{}{}│", label_part, " ".repeat(padding));
}

/// Strip ANSI escape codes to get visible character count
fn strip_ansi_codes(s: &str) -> String {
    let mut result = String::new();
    let mut in_escape = false;
    for c in s.chars() {
        if c == '\x1b' {
            in_escape = true;
        } else if in_escape {
            if c.is_ascii_alphabetic() {
                in_escape = false;
            }
        } else {
            result.push(c);
        }
    }
    result
}

/// Footer bar with stats
pub fn print_footer(tokens: u64, latency: u128, cost: &str, saved: &str) {
    let width = terminal_width().min(80);
    println!("{}", "─".repeat(width));
    let parts = format!(
        "{}  {} {} · {} {} · {} {}",
        success("✓"),
        muted("tokens"),
        format_number(tokens),
        muted("latency"),
        format!("{}ms", latency),
        muted("cost"),
        cost
    );
    if !saved.is_empty() && saved != "0%" {
        println!("{} · {}", parts, muted(&format!("saved {} via cache", saved)));
    } else {
        println!("{}", parts);
    }
}

/// Error box
pub fn print_error_box(message: &str, details: &str) {
    let total_width = terminal_width().min(80);
    let fill = total_width.saturating_sub(message.len() + 6);
    println!(
        "{} {} {}",
        "╰─".red(),
        error(message).bold(),
        "─".repeat(fill).red()
    );
    println!("  {}", details);
}

/// Table renderer — auto-width columns with header
pub fn render_table(headers: Vec<String>, rows: Vec<Vec<String>>) {
    if headers.is_empty() {
        return;
    }

    // Calculate column widths
    let mut widths: Vec<usize> = headers.iter().map(|h| h.len()).collect();
    for row in &rows {
        for (i, cell) in row.iter().enumerate() {
            if i < widths.len() && cell.len() > widths[i] {
                widths[i] = cell.len();
            }
        }
    }

    // Print headers
    print!("  ");
    for (i, h) in headers.iter().enumerate() {
        print!("{:<width$}  ", muted(&h.to_uppercase()), width = widths[i]);
    }
    println!();

    // Separator
    let total: usize = widths.iter().sum::<usize>() + (widths.len() - 1) * 2 + 2;
    println!("  {}", muted(&"─".repeat(total)));

    // Print rows
    for row in &rows {
        print!("  ");
        for (i, cell) in row.iter().enumerate() {
            if i < widths.len() {
                print!("{:<width$}  ", cell, width = widths[i]);
            }
        }
        println!();
    }

    // Bottom separator
    println!("  {}", muted(&"─".repeat(total)));
}

/// Progress bar for bench command: Running 3 models ████████████░░░░░░░░ 2/3
pub fn create_progress_bar(total: u64, message: &str) -> ProgressBar {
    let pb = ProgressBar::new(total);
    pb.set_style(
        ProgressStyle::with_template(
            "{msg} {bar:20.cyan/dim} {pos}/{len}"
        )
        .unwrap()
        .progress_chars("█░"),
    );
    pb.set_message(message.to_string());
    pb
}

/// Multi-progress for parallel bench runs
pub fn create_multi_progress() -> MultiProgress {
    MultiProgress::new()
}

/// Create a progress bar for a specific model within a multi-progress context
pub fn create_model_progress(mp: &MultiProgress, model_name: &str) -> ProgressBar {
    let pb = mp.add(ProgressBar::new(100));
    pb.set_style(
        ProgressStyle::with_template(
            "  {msg:<22} {bar:20.cyan/dim} {pos:>3}%"
        )
        .unwrap()
        .progress_chars("█░"),
    );
    pb.set_message(model_name.to_string());
    pb
}

// ── UTILITIES ───────────────────────────────────────────────

fn terminal_width() -> usize {
    crossterm::terminal::size()
        .map(|(w, _)| w as usize)
        .unwrap_or(80)
}

fn format_number(n: u64) -> String {
    if n >= 1_000_000 {
        format!("{:.1}M", n as f64 / 1_000_000.0)
    } else if n >= 1_000 {
        format!("{},{:03}", n / 1_000, n % 1_000)
    } else {
        n.to_string()
    }
}
