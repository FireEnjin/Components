import { Component, h, Host } from "@stencil/core";

@Component({
  tag: "fireenjin-chip-bar",
  styleUrl: "chip-bar.css",
})
export class ChipBar {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
