# Agent

## Build GIF

- script: `python main.py` (generates `output.gif` in current directory)
- Environment vars: Optionally set `GITHUB_TOKEN`, `GIFOS_GENERAL_USER_NAME`, `GIFOS_GENERAL_FPS`, `GIFOS_GENERAL_LOOP_COUNT`, `GIFOS_GENERAL_COLOR_SCHEME`

## Build resume PDFs

- Use YAMLResume CLI from the repository root.
- Build both resumes with a longer LaTeX timeout because the Traditional Chinese PDF can exceed the default 30 seconds:

```sh
yamlresume build -t 120 resumes/resume-en.yml
yamlresume build -t 120 resumes/resume-zh-TW.yml
```

- Outputs are written next to the YAML files:
  - `resumes/resume-en.tex`
  - `resumes/resume-en.pdf`
  - `resumes/resume-zh-TW.tex`
  - `resumes/resume-zh-TW.pdf`
- If `tectonic` aborts while loading `fontawesome5`, create a temporary local fallback before building, then remove it after:

```sh
cat > resumes/moderncviconssymbols.sty <<'EOF'
\NeedsTeXFormat{LaTeX2e}
\ProvidesPackage{moderncviconssymbols}[local fallback]
\newcommand{\faGithub}{}
\endinput
EOF

yamlresume build -t 120 resumes/resume-en.yml
yamlresume build -t 120 resumes/resume-zh-TW.yml

rm -f resumes/moderncviconssymbols.sty
```
