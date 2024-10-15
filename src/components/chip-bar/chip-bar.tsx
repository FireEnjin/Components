import { Component, h, Host, Prop } from "@stencil/core";

@Component({
  tag: "fireenjin-chip-bar",
  styleUrl: "chip-bar.css",
})
export class ChipBar {
  @Prop() overflow = false;

  render() {
    return (
      <Host class={{ overflow: this.overflow }}>
        <slot></slot>
      </Host>
    );
  }
}
