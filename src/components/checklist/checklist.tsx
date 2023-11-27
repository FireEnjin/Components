import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Prop,
} from "@stencil/core";
import { FieldOption } from "../../index";

@Component({
  tag: "fireenjin-checklist",
})
export class Checklist {
  @Element() el: HTMLElement;

  @Prop() options: FieldOption[] = [];
  @Prop() name: string;
  @Prop({ mutable: true }) value: any[] = [];
  @Prop() disabled = false;

  @Event() ionChange: EventEmitter;

  render() {
    const value =
      (typeof this.value === "string" && JSON.parse(this.value)) ||
      (this.el.getAttribute("value") &&
        JSON.parse(this.el.getAttribute("value"))) ||
      this.value;
    const options =
      (typeof this.options === "string" && JSON.parse(this.options)) ||
      (this.el.getAttribute("options") &&
        JSON.parse(this.el.getAttribute("options"))) ||
      this.options ||
      [];

    return (
      <ion-list>
        {options.map((option) => (
          <ion-item>
            <ion-checkbox
              onIonChange={(event) => {
                event.stopImmediatePropagation();
                if (
                  event?.detail?.checked &&
                  !(value || []).includes(option?.value)
                )
                  this.value = [...value, option?.value];
                if (
                  !event?.detail?.checked &&
                  (value || []).includes(option?.value)
                )
                  this.value = value.filter((value) => option?.value !== value);

                this.ionChange.emit({
                  value,
                });
              }}
              disabled={this.disabled}
              value={option?.value}
              checked={option?.checked}
              name={this.name}
              slot="start"
            ></ion-checkbox>
            <ion-label>{option?.label || option?.value || ""}</ion-label>
          </ion-item>
        ))}
      </ion-list>
    );
  }
}
