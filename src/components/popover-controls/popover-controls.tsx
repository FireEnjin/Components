import { Component, Event, EventEmitter, Prop, h } from "@stencil/core";
import { Control } from "../..";

@Component({
  tag: "fireenjin-popover-controls",
  styleUrl: "popover-controls.css",
})
export class PopoverControls {
  @Event() fireenjinTrigger: EventEmitter;

  @Prop() el: any;
  /**
   * The icon to display in the header label
   */
  @Prop() icon: string;
  /**
   * The label to display at the top of the popover
   */
  @Prop() label: string;
  /**
   * The type of event to fire when a options are selected
   */
  @Prop() type: "set" | "move" | "select" = "set";
  /**
   * The name of the input
   */
  @Prop() name: string;
  /**
   * The value of the input
   */
  @Prop({ mutable: true }) value: any;
  /**
   * Can you check the controls
   */
  @Prop() checkable = false;
  /**
   * Can you select multiple
   */
  @Prop() multiple = false;
  /**
   * The list of buttons to show when the material button is clicked
   */
  @Prop() controls: Control[] = [];
  /**
   * Should we show the clear button
   */
  @Prop() showClear = false;
  /**
   * Should the popover close on selection?
   */
  @Prop() closeOnSelect = false;
  /**
   * Should the popover close on clear?
   */
  @Prop() closeOnClear = true;

  onChange(event) {
    if (
      this.multiple &&
      event?.detail?.checked &&
      !this.value?.includes?.(event?.detail?.value)
    ) {
      if (!this.value) this.value = [];
      this.value = [...this.value, event?.detail?.value];
    } else if (
      this.multiple &&
      !event?.detail?.checked &&
      this.value?.includes?.(event?.detail?.value)
    ) {
      if (!this.value) this.value = [];
      this.value = this.value.filter((value) => value !== event?.detail?.value);
    } else {
      this.value = event?.detail?.value;
      this.fireenjinTrigger.emit({ event, name: "closePopover" });
    }
    this.fireenjinTrigger.emit({
      event,
      el: this.el,
      name: this.type,
      payload: {
        name: this.name,
        value: this.value,
      },
    });
  }

  render() {
    const ControlListEl = () => (
      <ion-list class="ion-no-padding">
        {this.label && (
          <ion-item-divider>
            {this.icon && (
              <ion-icon
                style={{ marginRight: "0.5rem" }}
                name={this.icon.includes("/") ? this.icon : null}
                src={this.icon.includes("/") ? null : this.icon}
                slot="start"
              />
            )}
            {this.label}
            {this.showClear && (
              <ion-button
                fill="clear"
                slot="end"
                onClick={(event) =>
                  this.fireenjinTrigger.emit({
                    event,
                    el: this.el,
                    name: this.type,
                    payload: {
                      name: this.name,
                      value: undefined,
                    },
                  }) &&
                  this.closeOnClear &&
                  this.fireenjinTrigger.emit({ event, name: "closePopover" })
                }
              >
                Clear
              </ion-button>
            )}
          </ion-item-divider>
        )}
        {(this.controls || []).map((control) => (
          <ion-item
            detail={control.detail}
            detail-icon={control?.detailIcon}
            lines="full"
            href={control?.href || "#"}
            onClick={(event: any) => {
              if (this.checkable && this.multiple) {
                const checkbox = event?.target?.querySelector?.("ion-checkbox");
                if (checkbox) checkbox.checked = !checkbox.checked;
              }
              if (this.checkable && !this.multiple) {
                const radios = event?.target?.closest?.("ion-radio-group");
                if (radios) radios.value = control?.value || null;
              }
              if (typeof control?.onClick !== "function") return;
              control.onClick(event, control);
              if (this.closeOnSelect)
                this.fireenjinTrigger.emit({ event, name: "closePopover" });
            }}
          >
            {this.checkable && this.multiple && !control?.hideCheckable && (
              <ion-checkbox
                style={{ marginRight: "0.5rem" }}
                onIonChange={(event) => this.onChange(event)}
                value={control?.value}
                checked={
                  control?.checked || this.value?.includes?.(control?.value)
                }
                slot="start"
              />
            )}
            {this.checkable && !this.multiple && !control?.hideCheckable && (
              <ion-radio
                style={{ marginRight: "0.5rem" }}
                value={control?.value}
                slot="start"
              />
            )}
            <ion-label
              style={{ pointerEvents: "none" }}
              color={(control?.color && control?.color) || ""}
              innerHTML={control?.label}
            />
            {control?.icon && (
              <ion-icon
                color={(control?.color && control?.color) || ""}
                name={
                  control?.icon?.indexOf?.("/") === -1 ? control.icon : null
                }
                src={control?.icon?.indexOf?.("/") === -1 ? null : control.icon}
                slot="end"
              />
            )}
          </ion-item>
        ))}
      </ion-list>
    );
    return (
      <ion-content>
        {this.multiple ? (
          <ControlListEl />
        ) : (
          <ion-radio-group
            value={this.value}
            onIonChange={(event) => this.onChange(event)}
          >
            <ControlListEl />
          </ion-radio-group>
        )}
      </ion-content>
    );
  }
}
