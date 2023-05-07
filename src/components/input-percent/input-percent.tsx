import { Color } from "@ionic/core";
import { Component, Prop, h } from "@stencil/core";

@Component({
  tag: "fireenjin-input-percent",
})
export class InputPercent {
  @Prop() lines = "none";
  @Prop() label = "Percent";
  @Prop() labelPosition = "stacked";
  @Prop() pin = true;
  @Prop() debounce: number = 300;
  @Prop() color: Color;
  @Prop() disabled = false;
  @Prop() min = 0;
  @Prop() max = 1;
  @Prop() step = "0.01";
  @Prop() pinFormatter = (value: number) => `${Math.round(value * 100)}%`;
  @Prop() name = "percent";
  @Prop({ mutable: true }) value = 0;

  render() {
    return (
      <ion-item
        lines={this.lines}
        style={{ position: "relative", "--background": "transparent" }}
      >
        {this.label && (
          <ion-label
            style={{ minHeight: "2rem" }}
            position={this.labelPosition}
          >
            {this.label}
          </ion-label>
        )}
        <ion-range
          onIonChange={(event) => (this.value = event?.detail?.value || 0)}
          style={{
            paddingTop: "0",
            paddingBottom: "0",
            "--bar-background-active": "var(--active-color)",
          }}
          name={this.name}
          value={this.value}
          pinFormatter={this.pinFormatter}
          disabled={this.disabled}
          color={this.color}
          debounce={this.debounce}
          pin={this.pin}
          step={this.step}
          min={this.min}
          max={this.max}
        />
        <ion-input
          onIonChange={(event) =>
            (this.value = parseInt(event?.detail?.value || "0") / 100)
          }
          type="number"
          min={Math.round(this.min * 100)}
          max={Math.round(this.max * 100)}
          value={Math.round(this.value * 100)}
          style={{
            display: "inline-block",
            position: "absolute",
            right: "0.2rem",
            top: "0.2rem",
            width: "50px",
            color:
              this.color?.includes?.("#") || this.color?.includes?.("(")
                ? this.color
                : `var(--active-color, var(--ion-color-${
                    this.color || "primary"
                  }))`,
          }}
        />
      </ion-item>
    );
  }
}
