Could not replace Node {
  type: 'Identifier',
  start: 159,
  end: 164,
  loc: SourceLocation {
    start: Position { line: 5, column: 2, index: 159 },
    end: Position { line: 5, column: 7, index: 164 },
    filename: undefined,
    identifierName: 'color'
  },
  name: 'color',
  leadingComments: null,
  innerComments: null,
  trailingComments: null
} with function (name) { return "state.".concat(name); }
import { Component, Prop, h, State, Fragment } from "@stencil/core";

@Component({
  tag: "fireenjin-button",
})
export default class Button {
  @Prop() target: any;
  @Prop() title: any;
  @Prop() href: any;
  @Prop() size: any;
  @Prop() children: any;
  @Prop() color: any;
  @Prop() fill: any;
  @Prop() radius: any;

  @State() color = "blue";
  @State() fill = "solid";
  @State() radius = "md";

  componentDidLoad() {
    this.color = this.color || "blue";
    this.fill = this.fill || "solid";
    this.radius = this.radius || "md";
  }

  render() {
    return (
      <a
        target={this.target}
        title={this.title}
        href={this.href}
        style={{
          fontFamily: "inherit",
          fontSize:
            (this.size === "large" && "2rem") ||
            (this.size === "small" && "1.1rem") ||
            "1.2rem",
          textDecoration: "none",
          color:
            this.fill !== "solid" ? `var(--color-${this.color})` : "#ffffff",
          display: "inline-flex",
          gap: "8px",
          alignItems: "center",
          border:
            this.fill === "outline"
              ? `1px solid var(--color-${this.color})`
              : "none",
          background:
            this.fill !== "solid" ? "none" : `var(--color-${this.color})`,
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
      </a>
    );
  }
}
