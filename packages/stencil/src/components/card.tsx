import { Component, Prop, h, State, Fragment } from "@stencil/core";

@Component({
  tag: "fireenjin-card",
})
export default class Card {
  @Prop() size: any;
  @Prop() children: any;
  @Prop() theme: any;
  @Prop() fill: any;
  @Prop() radius: any;

  @State() theme = "#ffffff";
  @State() fill = "solid";
  @State() radius = "md";

  componentDidLoad() {
    this.theme = this.theme || "#ffffff";
    this.fill = this.fill || "solid";
    this.radius = this.radius || "md";
  }

  render() {
    return (
      <div
        style={{
          fontFamily: "inherit",
          fontSize:
            (this.size === "large" && "2rem") ||
            (this.size === "small" && "1.1rem") ||
            "1.2rem",
          textDecoration: "none",
          color: "inherit",
          display: "inline-flex",
          gap: "8px",
          alignItems: "center",
          border:
            this.fill === "outline"
              ? `1px solid ${
                  this.theme
                    ? ((this.theme.includes("#") || this.theme.includes("(")) &&
                        this.theme) ||
                      `var(--color-${this.theme})`
                    : "#ffffff"
                }`
              : "none",
          background: this.theme
            ? ((this.theme.includes("#") || this.theme.includes("(")) &&
                this.theme) ||
              `var(--color-${this.theme})`
            : "#ffffff",
          padding:
            (this.size === "large" && "var(--size-2) var(--size-5)") ||
            (this.size === "small" && "var(--size-px) var(--size-2)") ||
            "var(--size-1) var(--size-4)",
          borderRadius:
            (this.radius === "none" && "none") ||
            `var(--radius-${this.radius || ""})`,
          boxShadow:
            (this.fill !== "solid" && "none") ||
            (this.size === "large" && "var(--shadow-md)") ||
            (this.size === "small" && "var(--shadow-xs)") ||
            "var(--shadow-sm)",
        }}
      >
        {this.children}
      </div>
    );
  }
}

