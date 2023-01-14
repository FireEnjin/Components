import { Component, Prop, h, State, Fragment } from "@stencil/core";

@Component({
  tag: "fireenjin-button",
  styles: `
      .a {
        text-decoration: none;
        font-weight: bold;
        color: white;
        padding: 15px;
      }
`,
})
export default class Button {
  @Prop() children: any;

  render() {
    return (
      <a
        type="button"
        href={this.href}
        style={{
          background: `var(--color-${this.color})`,
        }}
      >
        {this.children}
      </a>
    );
  }
}

