import { Color } from "@ionic/core";
import {
  Component,
  ComponentInterface,
  Event,
  EventEmitter,
  h,
  Prop,
} from "@stencil/core";

@Component({
  tag: "fireenjin-toggle",
  styleUrl: "toggle.css",
})
export class Toggle implements ComponentInterface {
  @Event() ionChange: EventEmitter;

  @Prop() label: string;
  @Prop() name: string;
  @Prop() value: boolean;
  @Prop() color: Color;
  @Prop() labelPosition?: "stacked" | "fixed" | "floating";
  /**
   * If `true`, the user cannot interact with the select.
   */
  @Prop() disabled = false;
  @Prop() lines: "full" | "inset" | "none";
  @Prop() enableOnOffLabels?: boolean;

  render() {
    return (
      <ion-item lines={this.lines}>
        <slot name="start" slot="start" />
        {this.label && (
          <ion-label position={this.labelPosition}>{this.label}</ion-label>
        )}
        <ion-toggle
          enableOnOffLabels={this.enableOnOffLabels}
          disabled={this.disabled}
          color={this.color}
          onIonChange={(event) => {
            this.value = !!event?.target?.checked;
            this.ionChange.emit({
              event,
              name: this.name,
              value: this.value,
              checked: this.value,
            });
          }}
          checked={!!this.value}
        />
        <slot name="end" slot="after" />
      </ion-item>
    );
  }
}
