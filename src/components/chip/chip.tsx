import { Color } from "@ionic/core";
import { Component, Prop, h } from "@stencil/core";

@Component({
  tag: "fireenjin-chip",
  styleUrl: "chip.css",
})
export class Chip {
  @Prop() color?: Color;
  @Prop() href?: string;
  @Prop() outline = false;
  @Prop() disabled = false;

  render() {
    return (
      <ion-chip
        disabled={this.disabled}
        outline={this.outline}
        onClick={() =>
          this.href
            ? document.querySelector("ion-router").push(this.href)
            : null
        }
        color={this.color}
        style={{ "--background": !this.color && "var(--ion-color-step-50)" }}
      >
        <slot />
      </ion-chip>
    );
  }
}
