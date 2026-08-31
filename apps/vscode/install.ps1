Copy-Item "$PSScriptRoot\settings.json" "$env:APPDATA\Code\User\settings.json" -Force
Copy-Item "$PSScriptRoot\keybindings.json" "$env:APPDATA\Code\User\keybindings.json" -Force
# minimal, clean — Vitesse Dark + functional + power-minimal pack
code --install-extension antfu.theme-vitesse --force
code --install-extension usernamehw.errorlens --force
code --install-extension esbenp.prettier-vscode --force
code --install-extension dbaeumer.vscode-eslint --force
code --install-extension eamodio.gitlens --force
code --install-extension mhutchie.git-graph --force
code --install-extension christian-kohler.path-intellisense --force
code --install-extension formulahendry.auto-rename-tag --force
code --install-extension naumovs.color-highlight --force
code --install-extension oderwat.indent-rainbow --force
# power-user, still minimal (no chrome until used)
code --install-extension EditorConfig.EditorConfig --force
code --install-extension streetsidesoftware.code-spell-checker --force
code --install-extension Gruntfuggly.todo-tree --force
code --install-extension alefragnani.Bookmarks --force
# beautiful icons: keep vs-minimal (built-in) — no extension needed
Write-Host "vscode installed — Vitesse Dark minimal clean (13/22, 0.3) + functional + power (EditorConfig/Spell/Todo/Bookmarks)" -ForegroundColor Green
