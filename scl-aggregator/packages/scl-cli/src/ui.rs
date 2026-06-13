use colored::*;
use indicatif::{ProgressBar, ProgressStyle};
use std::env;

pub fn is_color_enabled() -> bool {
    env::var("NO_COLOR").is_err()
}

// THEME
pub fn primary(s: &str) -> ColoredString { if is_color_enabled() { s.bright_cyan() } else { s.normal() } }
pub fn success(s: &str) -> ColoredString { if is_color_enabled() { s.bright_green() } else { s.normal() } }
pub fn warning(s: &str) -> ColoredString { if is_color_enabled() { s.bright_yellow() } else { s.normal() } }
pub fn error(s: &str) -> ColoredString { if is_color_enabled() { s.bright_red() } else { s.normal() } }
pub fn muted(s: &str) -> ColoredString { if is_color_enabled() { s.bright_black() } else { s.normal() } }
pub fn white(s: &str) -> ColoredString { s.white() }

// COMPONENTS

pub fn print_header(title: &str) {
    let width = 40;
    println!("{} {} {}", "╭─".bold(), title.bold(), "─".repeat(width - title.len()).bold());
}

pub fn create_spinner(message: &str) -> ProgressBar {
    let pb = ProgressBar::new_spinner();
    pb.set_style(ProgressStyle::default_spinner()
        .tick_chars("⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏")
        .template("{spinner:.cyan} {msg}").unwrap());
    pb.set_message(message.to_string());
    pb.enable_steady_tick(std::time::Duration::from_millis(80));
    pb
}

pub fn print_route_card(model: &str, provider: &str, intent: &str, policy: &str, cached: bool, cost: &str) {
    println!("┌─────────────────────────────────────────────┐");
    println!("│  {}  {}  │", muted("model"), model);
    println!("│  {}  {}  │", muted("provider"), provider);
    println!("│  {}  {}  │", muted("intent"), intent);
    println!("│  {}  {}  │", muted("policy"), policy);
    println!("│  {}  {}  │", muted("cached"), if cached { success("true") } else { error("false") });
    println!("│  {}  {}  │", muted("est cost"), cost);
    println!("└─────────────────────────────────────────────┘");
}

pub fn print_footer(tokens: u64, latency: u128, cost: &str, saved: &str) {
    println!("───────────────────────────────────────────────");
    let saved_str = format!("saved {} via cache", saved);
    println!("{}  {} {} · {} {} · {} {} · {}", success("✓"), muted("tokens"), tokens, muted("latency"), format!("{}ms", latency), muted("cost"), cost, muted(&saved_str));
}

pub fn print_error_box(message: &str, details: &str) {
    println!("{} {} {}", "╰─".red(), "Error".red().bold(), "─".repeat(30).red());
    println!("  {}", message);
    println!("  {}", muted(details));
}

pub fn render_table(headers: Vec<String>, rows: Vec<Vec<String>>) {
    // Basic implementation: calculate column widths
    let mut widths = headers.iter().map(|h| h.len()).collect::<Vec<usize>>();
    for row in &rows {
        for (i, cell) in row.iter().enumerate() {
            if cell.len() > widths[i] { widths[i] = cell.len(); }
        }
    }
    
    // Print headers
    for (i, h) in headers.iter().enumerate() {
        print!("{:<width$}  ", h.bold(), width = widths[i]);
    }
    println!();
    
    // Print rows
    for row in rows {
        for (i, cell) in row.iter().enumerate() {
            print!("{:<width$}  ", cell, width = widths[i]);
        }
        println!();
    }
}
