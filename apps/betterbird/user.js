// Betterbird user.js — rice preferences

// ===== GENERAL =====
user_pref("browser.startup.homepage_override.mstone", "ignore");
user_pref("mail.shell.checkDefaultClient", false);
user_pref("mail.default_send_format", 0); // HTML

// ===== APPEARANCE =====
user_pref("layout.css.devToolsThemeEnabled", false);
user_pref("toolkit.legacyUserProfileCustomizations.stylesheets", true); // Enable userChrome.css

// ===== COMPOSE =====
user_pref("mail.compose.default_font", "JetBrainsMono NF");
user_pref("mail.compose.default_font_size", 13);
user_pref("mail.identity.default.compose_html", true);
user_pref("mailnews.default_html_charset", "UTF-8");

// ===== READING =====
user_pref("mailnews.default_display.charset", "UTF-8");
user_pref("mailnews.wraplength", 72);
user_pref("mailnews.plaintext.wrap", true);

// ===== PRIVACY =====
user_pref("privacy.trackingprotection.enabled", true);
user_pref("privacy.trackingprotection.socialtracking.enabled", true);
user_pref("mail.spam捍Level", 3);

// ===== PERFORMANCE =====
user_pref("dom.ipc.processCount", 4);
user_pref("javascript.options.mem.high_water_mark", 128);

// ===== FONTS =====
user_pref("font.name.monospace.x-western", "JetBrainsMono NF");
user_pref("font.name.sans-serif.x-western", "Segoe UI");
user_pref("font.name.serif.x-western", "Times New Roman");
user_pref("font.size.monospace.x-western", 13);
