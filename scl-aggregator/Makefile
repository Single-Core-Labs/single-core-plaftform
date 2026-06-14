.PHONY: dev build test lint migrate logs clean

# ── Local Development ────────────────────────────────────────

dev:
	docker-compose up

build:
	docker-compose build

logs:
	docker-compose logs -f

clean:
	docker-compose down -v
	cargo clean -p scl-cli
	rm -rf apps/billing/dist

# ── Testing & Linting ────────────────────────────────────────

test:
	@echo "Running CLI tests..."
	cargo test --workspace
	@echo "Running Router tests..."
	cd apps/router && uv run pytest
	@echo "Running Cache Service tests..."
	cd apps/cache && uv run pytest
	@echo "Running Semantic Cache package tests..."
	cd packages/semantic-cache && uv run pytest
	@echo "Running Billing Service tests..."
	cd apps/billing && npm test

lint:
	@echo "Linting Rust (Clippy)..."
	cargo clippy --all-targets --all-features -- -D warnings
	@echo "Linting Python (Ruff)..."
	cd apps/router && uv run ruff check .
	cd apps/cache && uv run ruff check .
	cd packages/semantic-cache && uv run ruff check .
	@echo "Linting Node/TypeScript (ESLint)..."
	cd apps/billing && npm run lint || true
	cd apps/dashboard && npm run lint || true

# ── Database ─────────────────────────────────────────────────

migrate:
	@echo "Running Prisma migrations for Billing service..."
	cd apps/billing && npx prisma migrate dev

# ── SCL CLI ──────────────────────────────────────────────────

build-cli:
	cargo build --release -p scl-cli

install-cli: build-cli
ifeq ($(OS),Windows_NT)
	copy target\release\scl.exe $(USERPROFILE)\.cargo\bin\scl.exe
else
	sudo cp target/release/scl /usr/local/bin/scl
	@echo "✓ Installed scl to /usr/local/bin/scl"
endif

install-completions-bash: build-cli
	@mkdir -p ~/.local/share/bash-completion/completions
	@cp $$(find target/release/build/scl-cli-*/out/completions/scl.bash 2>/dev/null | head -1) ~/.local/share/bash-completion/completions/scl
	@echo "✓ Bash completions installed"

install-completions-zsh: build-cli
	@mkdir -p ~/.zsh/completions
	@cp $$(find target/release/build/scl-cli-*/out/completions/_scl 2>/dev/null | head -1) ~/.zsh/completions/_scl
	@echo "✓ Zsh completions installed. Run 'compinit' to activate."

install-completions-fish: build-cli
	@mkdir -p ~/.config/fish/completions
	@cp $$(find target/release/build/scl-cli-*/out/completions/scl.fish 2>/dev/null | head -1) ~/.config/fish/completions/scl.fish
	@echo "✓ Fish completions installed"

clean-cli:
	cargo clean -p scl-cli
