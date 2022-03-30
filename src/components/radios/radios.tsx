import { Component, ComponentInterface, Prop, h } from "@stencil/core";
import { FieldOption } from "../../typings";

@Component({
  tag: "fireenjin-radios",
  styleUrl: "radios.css",
})
export class Radios implements ComponentInterface {
  @Prop() label: string;
  @Prop({
    mutable: true,
  })
  value: any;
  @Prop() required: any;
  @Prop() options: FieldOption[];
  @Prop() name: string;
  @Prop() disabled = false;
  @Prop() allowEmptySelection = false;
  @Prop() lines: "full" | "inset" | "none" = "none";
  @Prop() labelPosition?: "stacked" | "fixed" | "floating";

  render() {
    return (
      <ion-list>
        <ion-radio-group
          name={this.name}
          value={this.value}
          allowEmptySelection={this.allowEmptySelection}
        >
          <ion-list-header position={this.labelPosition}>
            {this.label}
          </ion-list-header>
          {this.options.map((radio) => (
            <ion-item lines={this.lines}>
              <ion-label>{radio?.label || radio?.value}</ion-label>
              <ion-radio
                disabled={this.disabled || radio.disabled}
                slot={radio?.slot || "start"}
                value={radio?.value || null}
              />
            </ion-item>
          ))}
        </ion-radio-group>
      </ion-list>
    );
  }
}
