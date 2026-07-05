#!/usr/bin/env bash
set -euo pipefail

# ── SCL CLI Installer ────────────────────────────────────────
# Usage: curl -fsSL https://raw.githubusercontent.com/Single-Core-Labs/scl-aggregator/main/scripts/install-scl.sh | bash

VERSION="${SCL_VERSION:-latest}"
INSTALL_DIR="${SCL_INSTALL_DIR:-/usr/local/bin}"
REPO="Single-Core-Labs/scl-aggregator"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
CYAN='\033[0;36m'
DIM='\033[2m'
RESET='\033[0m'

info()  { echo -e "${CYAN}▸${RESET} $1"; }
ok()    { echo -e "${GREEN}✓${RESET} $1"; }
err()   { echo -e "${RED}✗${RESET} $1" >&2; exit 1; }
dim()   { echo -e "${DIM}$1${RESET}"; }

# ── Detect OS and Architecture ───────────────────────────────

detect_platform() {
    local os arch

    case "$(uname -s)" in
        Linux*)   os="linux" ;;
        Darwin*)  os="darwin" ;;
        *)        err "Unsupported OS: $(uname -s). Only Linux and macOS are supported." ;;
    esac

    case "$(uname -m)" in
        x86_64|amd64)   arch="x86_64" ;;
        arm64|aarch64)  arch="aarch64" ;;
        *)              err "Unsupported architecture: $(uname -m). Only x86_64 and arm64 are supported." ;;
    esac

    echo "${os}-${arch}"
}

# ── Resolve Version ─────────────────────────────────────────

resolve_version() {
    if [ "$VERSION" = "latest" ]; then
        VERSION=$(curl -fsSL "https://api.github.com/repos/${REPO}/releases/latest" \
            | grep '"tag_name"' \
            | sed -E 's/.*"tag_name": *"([^"]+)".*/\1/' \
            | sed 's/^v//')
        if [ -z "$VERSION" ]; then
            err "Failed to fetch latest version from GitHub."
        fi
    fi
    echo "$VERSION"
}

# ── Download and Install ────────────────────────────────────

main() {
    echo ""
    echo -e "${CYAN}  ╭─ SCL CLI Installer ──────────────────────────╮${RESET}"
    echo ""

    # Detect platform
    local platform
    platform=$(detect_platform)
    info "Detected platform: ${platform}"

    # Resolve version
    local version
    version=$(resolve_version)
    info "Installing version: v${version}"

    # Build download URL
    local filename="scl-${version}-${platform}.tar.gz"
    local url="https://github.com/${REPO}/releases/download/v${version}/${filename}"
    info "Downloading from: ${url}"

    # Create temp directory
    local tmpdir
    tmpdir=$(mktemp -d)
    trap "rm -rf ${tmpdir}" EXIT

    # Download
    if command -v curl &>/dev/null; then
        curl -fsSL "$url" -o "${tmpdir}/${filename}" || err "Download failed. Check the version and URL."
    elif command -v wget &>/dev/null; then
        wget -q "$url" -O "${tmpdir}/${filename}" || err "Download failed. Check the version and URL."
    else
        err "Neither curl nor wget found. Please install one."
    fi

    # Extract
    tar -xzf "${tmpdir}/${filename}" -C "${tmpdir}"
    ok "Downloaded and extracted"

    # Install binary
    if [ -w "$INSTALL_DIR" ]; then
        cp "${tmpdir}/scl" "${INSTALL_DIR}/scl"
    else
        info "Requesting sudo to install to ${INSTALL_DIR}..."
        sudo cp "${tmpdir}/scl" "${INSTALL_DIR}/scl"
    fi
    chmod +x "${INSTALL_DIR}/scl"
    ok "Installed scl to ${INSTALL_DIR}/scl"

    # Install shell completions (best-effort)
    local shell_name
    shell_name=$(basename "$SHELL" 2>/dev/null || echo "unknown")

    case "$shell_name" in
        bash)
            if [ -d "${tmpdir}/completions" ] && [ -f "${tmpdir}/completions/scl.bash" ]; then
                mkdir -p ~/.local/share/bash-completion/completions
                cp "${tmpdir}/completions/scl.bash" ~/.local/share/bash-completion/completions/scl
                ok "Bash completions installed"
            fi
            ;;
        zsh)
            if [ -d "${tmpdir}/completions" ] && [ -f "${tmpdir}/completions/_scl" ]; then
                mkdir -p ~/.zsh/completions
                cp "${tmpdir}/completions/_scl" ~/.zsh/completions/_scl
                ok "Zsh completions installed (run 'compinit' to activate)"
            fi
            ;;
        fish)
            if [ -d "${tmpdir}/completions" ] && [ -f "${tmpdir}/completions/scl.fish" ]; then
                mkdir -p ~/.config/fish/completions
                cp "${tmpdir}/completions/scl.fish" ~/.config/fish/completions/scl.fish
                ok "Fish completions installed"
            fi
            ;;
        *)
            dim "  Shell completions not auto-installed for ${shell_name}. See README."
            ;;
    esac

    # Interactive setup
    echo ""
    info "Running initial configuration..."
    echo ""

    local gateway_url api_key

    read -rp "  Gateway URL [https://api.sclhq.com]: " gateway_url
    gateway_url="${gateway_url:-https://api.sclhq.com}"
    "${INSTALL_DIR}/scl" config set gateway_url "$gateway_url"

    read -rp "  API Key: " api_key
    if [ -n "$api_key" ]; then
        "${INSTALL_DIR}/scl" config set api_key "$api_key"
    else
        dim "  Skipped. Set later with: scl config set api_key <key>"
    fi

    echo ""
    echo -e "${CYAN}  ╰─────────────────────────────────────────────╯${RESET}"
    echo ""
    ok "SCL CLI installed successfully!"
    echo ""
    dim "  Try it out:"
    echo "    scl run \"hello world\""
    echo "    scl models"
    echo "    scl --help"
    echo ""
}

main "$@"
