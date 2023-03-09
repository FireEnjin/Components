import { useMetadata, useStore, onMount, Show } from "@builder.io/mitosis";

export default function Button(props: {
  theme?: string;
  href?: string;
  type?: "submit" | "reset" | "button";
  title?: string;
  fill?: "outline" | "solid" | "none";
  radius?: "xs" | "sm" | "md" | "lg" | "xl" | "100" | "full" | "none";
  size?: "large" | "small";
  target?: string;
  children?: any;
}) {
  useMetadata({
    tagName: "fireenjin-button",
  });
  const state = useStore({
    theme: "blue",
    fill: "solid",
    radius: "md",
  });

  onMount(() => {
    state.theme = props.theme || "blue";
    state.fill = props.fill || "solid";
    state.radius = props.radius || "md";
  });

  return (
    <span>
      <Show when={props.type}>
        <button
          title={props.title}
          type={props.type}
          style={{
            fontFamily: "inherit",
            fontSize:
              (props.size === "large" && "2rem") ||
              (props.size === "small" && "1.1rem") ||
              "1.2rem",
            textDecoration: "none",
            color:
              state.fill !== "solid"
                ? state.theme
                  ? ((state.theme.includes("#") || state.theme.includes("(")) &&
                      state.theme) ||
                    `var(--color-${state.theme})`
                  : "transparent"
                : "#ffffff",
            display: "inline-flex",
            gap: "8px",
            alignItems: "center",
            border:
              state.fill === "outline"
                ? `1px solid ${
                    state.theme
                      ? ((state.theme.includes("#") ||
                          state.theme.includes("(")) &&
                          state.theme) ||
                        `var(--color-${state.theme})`
                      : "#ffffff"
                  }`
                : "none",
            background:
              state.fill !== "solid"
                ? "none"
                : `${
                    state.theme
                      ? ((state.theme.includes("#") ||
                          state.theme.includes("(")) &&
                          state.theme) ||
                        `var(--color-${state.theme})`
                      : "#ffffff"
                  }`,
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
        </button>
      </Show>
      <Show when={!props.type}>
        <a
          href={props.href}
          target={props.target}
          title={props.title}
          style={{
            fontFamily: "inherit",
            fontSize:
              (props.size === "large" && "2rem") ||
              (props.size === "small" && "1.1rem") ||
              "1.2rem",
            textDecoration: "none",
            color:
              state.fill !== "solid"
                ? state.theme
                  ? ((state.theme.includes("#") || state.theme.includes("(")) &&
                      state.theme) ||
                    `var(--color-${state.theme})`
                  : "transparent"
                : "#ffffff",
            display: "inline-flex",
            gap: "8px",
            alignItems: "center",
            border:
              state.fill === "outline"
                ? `1px solid ${
                    state.theme
                      ? ((state.theme.includes("#") ||
                          state.theme.includes("(")) &&
                          state.theme) ||
                        `var(--color-${state.theme})`
                      : "#ffffff"
                  }`
                : "none",
            background:
              state.fill !== "solid"
                ? "none"
                : `${
                    state.theme
                      ? ((state.theme.includes("#") ||
                          state.theme.includes("(")) &&
                          state.theme) ||
                        `var(--color-${state.theme})`
                      : "#ffffff"
                  }`,
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
        </a>
      </Show>
    </span>
  );
}
