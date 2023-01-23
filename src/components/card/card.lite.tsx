import { useMetadata, useStore, onMount } from "@builder.io/mitosis";

export default function Card(props: {
  theme?: string;
  fill?: "outline" | "solid" | "none";
  radius?: "xs" | "sm" | "md" | "lg" | "xl" | "100" | "full" | "none";
  size?: "large" | "small";
  children?: any;
}) {
  useMetadata({
    tagName: "fireenjin-card",
    isAttachedToShadowDom: true,
  });
  const state = useStore({
    theme: "#ffffff",
    fill: "solid",
    radius: "md",
  });

  onMount(() => {
    state.theme = props.theme || "#ffffff";
    state.fill = props.fill || "solid";
    state.radius = props.radius || "md";
  });

  return (
    <div
      style={{
        fontFamily: "inherit",
        fontSize:
          (props.size === "large" && "2rem") ||
          (props.size === "small" && "1.1rem") ||
          "1.2rem",
        textDecoration: "none",
        color: "inherit",
        display: "inline-flex",
        gap: "8px",
        alignItems: "center",
        border:
          state.fill === "outline"
            ? `1px solid ${
                state.theme
                  ? ((state.theme.includes("#") || state.theme.includes("(")) &&
                      state.theme) ||
                    `var(--color-${state.theme})`
                  : "#ffffff"
              }`
            : "none",
        background: state.theme
          ? ((state.theme.includes("#") || state.theme.includes("(")) &&
              state.theme) ||
            `var(--color-${state.theme})`
          : "#ffffff",
        padding:
          (props.size === "large" && "var(--size-2) var(--size-5)") ||
          (props.size === "small" && "var(--size-px) var(--size-2)") ||
          "var(--size-1) var(--size-4)",
        borderRadius:
          (state.radius === "none" && "none") ||
          `var(--radius-${state.radius || ""})`,
        boxShadow:
          (state.fill !== "solid" && "none") ||
          (props.size === "large" && "var(--shadow-md)") ||
          (props.size === "small" && "var(--shadow-xs)") ||
          "var(--shadow-sm)",
      }}
    >
      {props.children}
    </div>
  );
}
