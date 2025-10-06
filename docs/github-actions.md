# GitHub Actions Documentation

This document provides comprehensive information about the GitHub Actions workflows used in this repository to automatically generate and update the GitHub profile README animations.

## Overview

This repository uses two automated GitHub Actions workflows to create dynamic visual content for the GitHub profile:

1. **Snake Animation Workflow** (`snake.yml`) - Generates a snake game animation based on GitHub contribution graph
2. **Terminal Animation Workflow** (`terminal.yml`) - Creates a retro terminal/CLI interface animation displaying personal information and GitHub statistics

Both workflows run automatically on a daily schedule and can be triggered manually when needed.

---

## 1. Snake Animation Workflow

**File:** `.github/workflows/snake.yml`

### Purpose

This workflow generates an animated snake game that navigates through your GitHub contribution graph, eating the contribution dots. It creates two versions: one for light theme and one for dark theme, providing a visually engaging way to showcase your contribution activity.

### Triggers

The workflow runs in three scenarios:

```yaml
on:
  workflow_dispatch:    # Manual trigger via GitHub UI
  schedule:
    - cron: "0 0 * * *" # Daily at midnight UTC
  push:
    branches:
      - main            # On push to main branch
    paths:              # Only when these files change
      - '.github/workflows/snake.yml'
      - 'README.md'
```

- **Manual Trigger**: Can be manually executed via the Actions tab in GitHub
- **Scheduled**: Runs automatically every day at 00:00 UTC
- **Push Events**: Runs when code is pushed to the `main` branch, **but only if** changes affect:
  - The workflow file itself (`.github/workflows/snake.yml`)
  - The README file (`README.md`) where the animation is displayed

**Path Filters Explained:**

The `paths` filter ensures the workflow only runs when relevant files are modified. This means:

- ✅ Workflow runs if you update `snake.yml` (workflow configuration changes)
- ✅ Workflow runs if you update `README.md` (may affect where/how the animation is displayed)
- ❌ Workflow skips if you only modify documentation files in `docs/`
- ❌ Workflow skips if you only change `main.py` (doesn't affect snake generation)
- ❌ Workflow skips if you only update font files (snake doesn't use custom fonts)

This optimization saves GitHub Actions minutes and reduces unnecessary workflow runs while still ensuring the animation is regenerated when needed. The daily scheduled run ensures the animation stays current with your latest contributions regardless of code changes.

### Workflow Steps

#### Step 1: Generate Snake SVG

```yaml
- name: Generate snake svg
  uses: Platane/snk/@v3
  with:
    github_user_name: ${{ github.repository_owner }}
    outputs: |
      dist/snake.svg?color_snake=#707070&color_dots=#eaeaea,#5d5d5d,#4e4e4e,#414141,#353535
      dist/snake-dark.svg?color_snake=#707070&color_dots=#1e1e1e,#878787,#9d9d9d,#b3b3b3,#cccccc
```

**What it does:**

- Uses the `Platane/snk` action (version 3) to generate snake animations
- Automatically uses the repository owner's username (`github.repository_owner`)
- Generates two SVG files with different color schemes:
  - `snake.svg` - Light theme with lighter dots
  - `snake-dark.svg` - Dark theme with darker background

**Color Configuration:**

- `color_snake`: Gray snake (#707070)
- `color_dots`: Five shades representing contribution levels (0 to highest)
  - Light theme: Light gray to dark gray
  - Dark theme: Very dark to light gray

#### Step 2: Deploy to GitHub Pages Branch

```yaml
- name: Push snake svg to the snake branch
  uses: crazy-max/ghaction-github-pages@v3.1.0
  with:
    target_branch: snake
    build_dir: dist
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

**What it does:**

- Pushes the generated SVG files to a dedicated `snake` branch
- Uses the `crazy-max/ghaction-github-pages` action
- Files are accessible via raw GitHub URLs

### Runtime Configuration

```yaml
runs-on: ubuntu-latest
timeout-minutes: 5
permissions:
  contents: write
```

- Runs on Ubuntu (latest version)
- Maximum execution time: 5 minutes
- Requires write permissions to push to branches

### Required Secrets

- **`GITHUB_TOKEN`**: Automatically provided by GitHub Actions (no manual setup required)

### Output Files

The generated files are pushed to the `snake` branch and can be accessed at:

- `https://raw.githubusercontent.com/{username}/{repo}/snake/snake.svg`
- `https://raw.githubusercontent.com/{username}/{repo}/snake/snake-dark.svg`

---

## 2. Terminal Animation Workflow

**File:** `.github/workflows/terminal.yml`

### Purpose

This workflow executes the Python script (`main.py`) to generate an animated GIF that simulates a retro terminal boot sequence and displays personal information, GitHub statistics, and a custom ASCII art character. It creates a nostalgic CLI aesthetic for the GitHub profile.

### Triggers

The workflow runs in three scenarios with path filtering:

```yaml
on:
  workflow_dispatch:    # Manual trigger
  schedule:
    - cron: "0 0 * * *" # Daily at midnight UTC
  push:
    branches:
      - main            # On push to main branch
    paths:              # Only when these files change
      - '.github/workflows/terminal.yml'
      - 'main.py'
      - 'README.md'
      - 'fonts/**'
```

- **Manual Trigger**: Can be manually executed via the Actions tab in GitHub
- **Scheduled**: Runs automatically every day at 00:00 UTC
- **Push Events**: Runs when code is pushed to the `main` branch, **but only if** changes affect:
  - The workflow file itself (`.github/workflows/terminal.yml`)
  - The Python script (`main.py`) that generates the animation
  - The README file (`README.md`) where the animation is displayed
  - Any font files in the `fonts/` directory (used for terminal rendering)

**Path Filters Explained:**

The `paths` filter prevents unnecessary workflow runs by only triggering when files that actually affect the terminal animation are modified. This means:

- ✅ Workflow runs if you update `terminal.yml` (workflow configuration changes)
- ✅ Workflow runs if you modify `main.py` (changes the animation content/logic)
- ✅ Workflow runs if you update `README.md` (may affect display)
- ✅ Workflow runs if you add/modify fonts in `fonts/` (changes terminal appearance)
- ❌ Workflow skips if you only modify documentation files in `docs/`
- ❌ Workflow skips if you only change `.github/workflows/snake.yml` (different workflow)
- ❌ Workflow skips if you only update `.gitignore` or other config files

This optimization conserves GitHub Actions minutes and reduces build times by avoiding regeneration when the output would be identical. The daily scheduled run ensures your GitHub statistics remain up-to-date even without code changes.

### Workflow Steps

#### Step 1: Checkout Repository

```yaml
- uses: actions/checkout@v4
  with:
    lfs: true
```

**What it does:**

- Checks out the repository code
- Enables Git LFS (Large File Storage) to properly handle font files

#### Step 2: Install Dependencies

```yaml
- name: Install dependencies
  run: |
    sudo apt update && sudo apt install -y ffmpeg
    python -m pip install --upgrade pip
    pip install git+https://github.com/x0rzavi/github-readme-terminal.git@main
```

**What it does:**

- Updates package lists
- Installs `ffmpeg` (required for GIF generation)
- Upgrades pip to latest version
- Installs the `github-readme-terminal` package (gifos library) directly from GitHub

#### Step 3: Run Python Script

```yaml
- name: Run python script to generate output gif
  run: python main.py
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
    IMGBB_API_KEY: ${{ secrets.IMGBB_API_KEY }}
    GIFOS_GENERAL_USER_NAME: "noidilin"
    GIFOS_GENERAL_FPS: 12
    GIFOS_GENERAL_LOOP_COUNT: 0
    GIFOS_GENERAL_COLOR_SCHEME: "yoru"
```

**What it does:**

- Executes `main.py` to generate the terminal animation GIF
- Sets environment variables for configuration

**Environment Variables:**

- `GITHUB_TOKEN`: Authentication for GitHub API requests
- `IMGBB_API_KEY`: API key for ImgBB image hosting (optional, currently commented out in code)
- `GIFOS_GENERAL_USER_NAME`: GitHub username to fetch stats for
- `GIFOS_GENERAL_FPS`: Frame rate (12 fps)
- `GIFOS_GENERAL_LOOP_COUNT`: Loop count (0 = infinite loop)
- `GIFOS_GENERAL_COLOR_SCHEME`: Terminal color scheme ("yoru" theme)

#### Step 4: Prepare Distribution Directory

```yaml
- name: Create dist directory
  run: mkdir -p dist

- name: Copy gif to dist
  run: cp output.gif dist/
```

**What it does:**

- Creates a `dist` directory
- Copies the generated `output.gif` to the distribution folder

#### Step 5: Deploy to Terminal Branch

```yaml
- name: Push output gif to terminal branch
  uses: crazy-max/ghaction-github-pages@v3.1.0
  with:
    target_branch: terminal
    build_dir: dist
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

**What it does:**

- Pushes the GIF file to the `terminal` branch
- Uses the same deployment action as the snake workflow
- Makes the GIF accessible via raw GitHub URLs

### Runtime Configuration

```yaml
runs-on: ubuntu-latest
timeout-minutes: 5
permissions:
  contents: write
```

- Runs on Ubuntu (latest version)
- Maximum execution time: 5 minutes
- Requires write permissions for branch deployment

### Required Secrets

You must configure these secrets in your repository settings (Settings → Secrets and variables → Actions):

1. **`GITHUB_TOKEN`**: Automatically provided by GitHub Actions
2. **`IMGBB_API_KEY`**: (Optional) API key from ImgBB for image hosting
   - Currently not actively used in the code (line 174 is commented out)
   - Can be obtained from [ImgBB API](https://api.imgbb.com/)

### Output Files

The generated GIF is pushed to the `terminal` branch and can be accessed at:

- `https://raw.githubusercontent.com/{username}/{repo}/terminal/output.gif`

---

## How the Workflows Relate to Project Goals

### Project Goal

Build a minimalist GitHub profile that showcases personal information with a CLI interface aesthetic by mimicking real terminal behavior.

### Workflow Integration

1. **Terminal Workflow** (Primary)
   - Directly implements the core project goal
   - Generates the main visual element: a retro terminal animation
   - Simulates BIOS boot sequence, login process, and system information display
   - Fetches real-time GitHub statistics via the `gifos` library
   - Creates an authentic CLI aesthetic using:
     - ANSI color codes
     - Terminal fonts (bitmap and TrueType)
     - Typing animations
     - ASCII art

2. **Snake Workflow** (Supplementary)
   - Provides additional visual interest to the profile
   - Gamifies the contribution graph
   - Complements the terminal theme with a nostalgic game aesthetic
   - Offers theme-aware versions (light/dark mode)

### Usage in README

Both outputs are embedded in the `README.md` file:

```markdown
<!-- Terminal Animation -->
<picture>
  <source media="(prefers-color-scheme: dark)" 
          srcset="https://raw.githubusercontent.com/noidilin/noidilin/terminal/output.gif">
  <source media="(prefers-color-scheme: light)" 
          srcset="https://raw.githubusercontent.com/noidilin/noidilin/terminal/output.gif">
  <img alt="GIFOS terminal animation" 
       src="https://raw.githubusercontent.com/noidilin/noidilin/terminal/output.gif">
</picture>

<!-- Snake Animation -->
<picture>
  <source media="(prefers-color-scheme: dark)" 
          srcset="https://raw.githubusercontent.com/noidilin/noidilin/snake/snake-dark.svg">
  <source media="(prefers-color-scheme: light)" 
          srcset="https://raw.githubusercontent.com/noidilin/noidilin/snake/snake.svg">
  <img alt="github contribution grid snake animation" 
       src="https://raw.githubusercontent.com/noidilin/noidilin/snake/snake.svg">
</picture>
```

---

## Maintenance Guide

### Updating Terminal Content

To modify the terminal animation content:

1. Edit `main.py` to change:
   - User details (lines 99-122)
   - Colors and styling (ANSI codes)
   - Animation timing (count parameters)
   - GitHub stats displayed

2. Push changes to `main` branch - the workflow will automatically regenerate the GIF (since `main.py` is in the path filter)

**Note:** Changes to documentation files (`docs/`) or other non-workflow files won't trigger regeneration. To force a regeneration without changing code, you can either:

- Manually trigger the workflow via the Actions tab
- Wait for the daily scheduled run
- Make a trivial change to `README.md` or `main.py`

### Updating Configuration

To modify workflow behavior:

1. **Change schedule**: Edit the cron expression

   ```yaml
   schedule:
     - cron: "0 12 * * *"  # Run at noon UTC instead
   ```

2. **Modify path filters**: Add or remove files that trigger the workflow

   ```yaml
   paths:
     - '.github/workflows/terminal.yml'
     - 'main.py'
     - 'README.md'
     - 'fonts/**'
     - 'docs/**'  # Example: also trigger on documentation changes
   ```

3. **Change color schemes**: Modify the `outputs` parameter in `snake.yml` or environment variables in `terminal.yml`

4. **Adjust timeout**: Increase if workflows are timing out

   ```yaml
   timeout-minutes: 10
   ```

### Troubleshooting

**Workflow fails due to permissions:**

- Ensure Actions have write permissions: Settings → Actions → General → Workflow permissions → "Read and write permissions"

**Snake animation not updating:**

- Check if contributions exist in the time period
- Verify the `github_user_name` is correct

**Terminal GIF not generating:**

- Verify `GITHUB_TOKEN` has necessary permissions
- Check Python script for syntax errors
- Ensure font files are committed with Git LFS

**Missing IMGBB_API_KEY warning:**

- This is optional unless you uncomment line 174 in `main.py`
- Obtain from [ImgBB API](https://api.imgbb.com/) if needed

### Manual Execution

To manually trigger either workflow:

1. Go to the **Actions** tab in your GitHub repository
2. Select the desired workflow (Snake or Terminal)
3. Click **Run workflow**
4. Choose the branch (usually `main`)
5. Click **Run workflow** button

---

## Technical Details

### Dependencies

**Terminal Workflow:**

- Python 3.x (provided by Ubuntu runner)
- `ffmpeg` - Video/GIF processing
- `gifos` (github-readme-terminal) - Terminal GIF generation library
  - Source: <https://github.com/x0rzavi/github-readme-terminal>

**Snake Workflow:**

- `Platane/snk@v3` - Snake animation generator
- No additional dependencies

### Branch Structure

The workflows create and maintain separate branches:

- `main` - Source code and configuration
- `snake` - Contains generated snake SVG files
- `terminal` - Contains generated terminal GIF

These branches should not be manually edited as they are automatically overwritten on each workflow run.

### Resource Usage

Both workflows are lightweight:

- Typical execution time: 1-3 minutes
- Timeout limit: 5 minutes
- Runs daily, using minimal GitHub Actions minutes
- Free tier is sufficient for this usage pattern

---

## References

- **Snake Action**: <https://github.com/Platane/snk>
- **GitHub Pages Action**: <https://github.com/crazy-max/ghaction-github-pages>
- **GIFOS Library**: <https://github.com/x0rzavi/github-readme-terminal>
- **Original Inspiration**: <https://github.com/x0rzavi/x0rzavi> (terminal workflow)
- **Original Inspiration**: <https://github.com/Platane/Platane> (snake workflow)

---

## License & Attribution

This workflow configuration is based on examples from:

- x0rzavi's GitHub profile automation
- Platane's contribution snake animation

When using these workflows, consider:

- Giving credit to the original creators
- Reviewing the licenses of the actions used
- Customizing content to reflect your own profile
