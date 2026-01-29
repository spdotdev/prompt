import yaml from 'js-yaml';

export async function loadConfig() {
    try {
        const response = await fetch('/config.yaml');
        const text = await response.text();
        const config = yaml.load(text);
        return config;
    } catch (e) {
        console.error("Failed to load config:", e);
        return null;
    }
}

export function applyTheme(config) {
    if (!config || !config.theme || !config.theme.colors) return;

    const root = document.documentElement;
    const colors = config.theme.colors;

    if (colors.primary) root.style.setProperty('--primary', colors.primary);
    if (colors.background_dark) root.style.setProperty('--bg-dark', colors.background_dark);
    // Add more mappings as needed
}
