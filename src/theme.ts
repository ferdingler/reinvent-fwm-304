// src/theme.ts
import { createTheme, defaultTheme } from "@aws-amplify/ui-react";

export const theme = createTheme(
  {
    name: "resource-planner-theme",
    tokens: {
      colors: {
        background: {
          primary: { value: "#232f3e" },
          secondary: { value: "#0d1117" },
        },
        brand: {
          primary: { value: "#00a1c9" },
          secondary: { value: "#e41c5f" },
        },
        font: {
          primary: { value: "#ffffff" },
          secondary: { value: "#d1d5db" },
          tertiary: { value: "#9ca3af" },
          interactive: { value: "#00a1c9" },
        },
        border: {
          primary: { value: "#30363d" },
          secondary: { value: "#21262d" },
        },
      },
      fonts: {
        default: {
          variable: {
            value: "Amazon Ember Display, -apple-system, sans-serif",
          },
          static: { value: "Amazon Ember Display, -apple-system, sans-serif" },
        },
      },
      components: {
        button: {
          backgroundColor: { value: "{colors.brand.secondary.value}" },
          _hover: {
            backgroundColor: { value: "#c41751" },
          },

          primary: {
            backgroundColor: { value: "{colors.brand.primary.value}" },
            color: { value: "{colors.font.primary.value}" },
            _hover: {
              backgroundColor: { value: "#0088aa" },
            },
          },
        },
        card: {
          backgroundColor: { value: "{colors.background.secondary.value}" },
          borderRadius: { value: "8px" },
          boxShadow: { value: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" },
        },
        heading: {
          color: { value: "{colors.font.primary.value}" },
        },
        text: {
          color: { value: "{colors.font.secondary.value}" },
        },
      },
      radii: {
        small: { value: "4px" },
        medium: { value: "8px" },
        large: { value: "12px" },
      },
      space: {
        small: { value: "1rem" },
        medium: { value: "1.5rem" },
        large: { value: "2rem" },
      },
    },
  },
  defaultTheme,
);