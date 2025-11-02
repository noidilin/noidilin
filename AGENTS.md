# Agent Guidelines for github-readme-terminal

## Repo Goals
Generate a minimalist GitHub profile README with CLI/terminal aesthetics using animated GIFs created via the `gifos` library.

## Build/Run/Test Commands
- **Install dependencies**: `pip install git+https://github.com/x0rzavi/github-readme-terminal.git@main` (also requires `ffmpeg`)
- **Run script**: `python main.py` (generates `output.gif` in current directory)
- **No test suite**: Single-script project with no automated tests
- **Environment vars**: Optionally set `GITHUB_TOKEN`, `GIFOS_GENERAL_USER_NAME`, `GIFOS_GENERAL_FPS`, `GIFOS_GENERAL_LOOP_COUNT`, `GIFOS_GENERAL_COLOR_SCHEME`

## Code Style Guidelines
- **Imports**: Standard library first (`datetime`, `zoneinfo`), third-party after (`gifos`). No type hints.
- **Formatting**: 4-space indentation, no trailing commas in function calls, multi-line f-strings for large text blocks
- **ANSI colors**: Extensive use of ANSI escape codes (e.g., `\x1b[31m` for red, `\x1b[93m` for bright yellow, `\x1b[0m` to reset)
- **Naming**: Variables/functions = `snake_case`, constants = `UPPER_SNAKE_CASE`
- **Error handling**: No explicit try/except blocks; relies on default Python exceptions
- **String formatting**: Prefer f-strings and triple-quoted strings for multi-line terminal output
- **Comments**: Minimal inline comments; use docstrings sparingly (only module-level docstring for ANSI color reference)
- **Font files**: Reference fonts in `./fonts/` directory; use `.pil`, `.ttf`, `.otf` formats
- **User data**: Hard-coded personal info (name, age, contact) directly in `user_details_lines` variable
