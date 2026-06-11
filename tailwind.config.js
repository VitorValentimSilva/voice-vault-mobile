/** @type {import('tailwindcss').Config} */

export const content = [
  "./src/**/*.{js,jsx,ts,tsx}",
  "./app/**/*.{js,jsx,ts,tsx}",
];
export const presets = [require("nativewind/preset")];

export const theme = {
  extend: {
    colors: {
      background: "var(--color-background)",
      "background-deep": "var(--color-background-deep)",

      surface: "var(--color-surface)",
      "surface-elevated": "var(--color-surface-elevated)",
      "surface-input": "var(--color-surface-input)",
      "surface-hover": "var(--color-surface-hover)",
      "tab-bar": "var(--color-tab-bar)",

      text: "var(--color-text)",
      "text-secondary": "var(--color-text-secondary)",
      "text-muted": "var(--color-text-muted)",

      primary: "var(--color-primary)",
      "primary-hover": "var(--color-primary-hover)",
      "on-primary": "var(--color-on-primary)",
      "primary-soft": "var(--color-primary-soft-bg)",
      "primary-soft-border": "var(--color-primary-soft-border)",
      "primary-soft-text": "var(--color-primary-soft-text)",

      accent: "var(--color-accent)",
      "accent-soft": "var(--color-accent-soft-bg)",
      "accent-soft-border": "var(--color-accent-soft-border)",
      "accent-soft-text": "var(--color-accent-soft-text)",

      border: "var(--color-border)",
      "border-subtle": "var(--color-border-subtle)",
      "border-strong": "var(--color-border-strong)",
      "border-focus": "var(--color-border-focus)",

      success: "var(--color-success)",
      "success-soft": "var(--color-success-soft-bg)",
      "success-soft-text": "var(--color-success-soft-text)",

      error: "var(--color-error)",
      "error-soft": "var(--color-error-soft-bg)",

      warning: "var(--color-warning)",
      "warning-soft": "var(--color-warning-soft-bg)",
      "warning-soft-text": "var(--color-warning-soft-text)",

      "icon-default": "var(--color-icon-default)",
      "icon-active": "var(--color-icon-active)",

      "recording-active": "var(--color-recording-active)",
      "recording-active-bg": "var(--color-recording-active-bg)",
      "waveform-bar": "var(--color-waveform-bar)",
      "waveform-bar-active": "var(--color-waveform-bar-active)",
      "waveform-track": "var(--color-waveform-track)",

      "input-bg": "var(--color-input-bg)",
      "input-placeholder": "var(--color-input-placeholder)",
      "input-focus-border": "var(--color-input-focus-border)",

      "progress-track": "var(--color-progress-track)",
      "progress-fill": "var(--color-progress-fill)",
      "progress-warn": "var(--color-progress-warn)",
      "progress-critical": "var(--color-progress-critical)",

      "skeleton-base": "var(--color-skeleton-base)",
      "skeleton-shimmer": "var(--color-skeleton-shimmer)",

      overlay: "var(--color-overlay)",

      "avatar-bg": "var(--color-avatar-bg)",
      "avatar-text": "var(--color-avatar-text)",
      "avatar-online": "var(--color-avatar-online)",

      "plan-pro": "var(--color-plan-pro)",
      "plan-pro-soft": "var(--color-plan-pro-soft-bg)",
      "plan-free": "var(--color-plan-free)",
      "plan-free-soft": "var(--color-plan-free-soft-bg)",

      "transcript-text": "var(--color-transcript-text)",
      "transcript-timestamp": "var(--color-transcript-timestamp)",
      "transcript-highlight": "var(--color-transcript-highlight)",
      "transcript-speaker": "var(--color-transcript-speaker)",
      "transcript-speaker-text": "var(--color-transcript-speaker-text)",
    },
    fontFamily: {
      jakarta: ["PlusJakartaSans_400Regular"],
      "jakarta-medium": ["PlusJakartaSans_500Medium"],
      "jakarta-semibold": ["PlusJakartaSans_600SemiBold"],
      "jakarta-bold": ["PlusJakartaSans_700Bold"],
      "jakarta-extrabold": ["PlusJakartaSans_800ExtraBold"],
      "jakarta-italic": ["PlusJakartaSans_400Regular_Italic"],
      "jakarta-medium-italic": ["PlusJakartaSans_500Medium_Italic"],
      "jakarta-semibold-italic": ["PlusJakartaSans_600SemiBold_Italic"],
      "jakarta-bold-italic": ["PlusJakartaSans_700Bold_Italic"],
    },
  },
};

export const plugins = [require("tailwindcss-animate")];
