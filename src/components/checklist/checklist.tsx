import { Component, Event, EventEmitter, h, Prop } from "@stencil/core";
import { FieldOption } from "../../typings";

@Component({
  tag: "fireenjin-checklist",
})
export class Checklist {
  @Prop() options: FieldOption[] = [];
  @Prop() name: string;
  @Prop({ mutable: true }) value: any[] = [];
  @Prop() disabled = false;

  @Event() ionChange: EventEmitter;

  render() {
    return (
      <ion-list>
        {(this.options || []).map((option) => (
          <ion-item>
            <ion-checkbox
              onIonChange={(event) => {
                event.stopImmediatePropagation();
                if (
                  event?.detail?.checked &&
                  !(this.value || []).includes(option?.value)
                )
                  this.value = [...this.value, option?.value];
                if (
                  !event?.detail?.checked &&
                  (this.value || []).includes(option?.value)
                )
                  this.value = this.value.filter(
                    (value) => option?.value !== value
                  );

                this.ionChange.emit({
                  value: this.value,
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
