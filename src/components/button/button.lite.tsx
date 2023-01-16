import { useMetadata, useStore, onMount, Slot } from "@builder.io/mitosis";

export default function Button(props: {
  color?: string;
  href?: string;
  title?: string;
  fill?: "outline" | "solid" | "none";
  radius?: "xs" | "sm" | "md" | "lg" | "xl" | "100" | "full" | "none";
  size?: "large" | "small";
  target?: string;
  children?: any;
}) {
  useMetadata({
    tagName: "fireenjin-button",
    isAttachedToShadowDom: true,
  });
  const state = useStore({ color: "blue", fill: "solid", radius: "md" });

  onMount(() => {
    state.color = props.color || "blue";
    state.fill = props.fill || "solid";
    state.radius = props.radius || "md";
  });
  return (
    <a
      target={props.target}
      title={props.title}
      href={props.href}
      style={{
        fontFamily: "inherit",
        fontSize:
          (props.size === "large" && "2rem") ||
          (props.size === "small" && "1.1rem") ||
          "1.2rem",
        textDecoration: "none",
        color:
          state.fill !== "solid" ? `var(--color-${state.color})` : "#ffffff",
        display: "inline-flex",
        gap: "8px",
        alignItems: "center",
        border:
          state.fill === "outline"
            ? `1px solid var(--color-${state.color})`
            : "none",
        background:
          state.fill !== "solid" ? "none" : `var(--color-${state.color})`,
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
  );
}
