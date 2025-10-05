# Agent Guidelines for github-readme-terminal

## Build/Run/Test Commands
- **Run script**: `python main.py`
- **No test suite present**: This is a single-script project
- **Dependencies**: Install with `pip install git+https://github.com/x0rzavi/github-readme-terminal.git@main`

## Code Style Guidelines

### Imports
- Standard library imports first (`datetime`, `zoneinfo`)
- Third-party imports after (`gifos`)
- No type hints used in this codebase

### Formatting
- Indentation: 4 spaces
- No trailing commas in function calls
- ANSI color codes used extensively for terminal styling (e.g., `\x1b[96m`, `\x1b[93m`)

### Naming Conventions
- Variables: `snake_case` (e.g., `user_age`, `git_user_details`, `top_languages`)
- Constants: `UPPER_SNAKE_CASE` (e.g., `FONT_FILE_LOGO`, `FONT_FILE_BITMAP`)
- Functions: `snake_case` (e.g., `main()`)

### Error Handling
- No explicit error handling in current code
- Relies on default Python exceptions
