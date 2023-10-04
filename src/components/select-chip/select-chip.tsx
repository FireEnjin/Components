import { Component, Event, EventEmitter, Prop, h } from "@stencil/core";
import { Color, popoverController } from "@ionic/core";

@Component({
  tag: "fireenjin-select-chip",
})
export class SelectChip {
  popoverEl: HTMLIonPopoverElement;

  @Event() ionChange: EventEmitter;
  @Event() ionInput: EventEmitter;

  @Prop() color?: Color;
  @Prop() outline = false;
  @Prop() disabled = false;
  @Prop() icon?: string;
  @Prop() selectIcon? = "chevron-down-circle";
  @Prop() multiple? = false;
  @Prop() showBackdrop? = false;
  @Prop() name: string;
  @Prop({ mutable: true }) value: string;
  @Prop({ mutable: true }) label?: string;
  @Prop() selectedText? = "Selected";
  @Prop() disableSelectedCount = false;
  @Prop() placeholder?: string;
  @Prop() disableBackgroundDismiss? = false;
  @Prop() options?: {
    name?: string;
    image?: string;
    label?: string;
    color?: Color;
    checked?: boolean;
    icon?: string;
    value?: string;
    header?: string;
    subHeader?: string;
    message?: string;
    optionEl?: (result: any) => HTMLIonSelectOptionElement;
    placeholder?: string;
    endpoint?: string;
    query?: string;
    limit?: number;
    orderBy?: string;
    dataPropsMap?: string;
    params?: any;
    options?: {
      label: string;
      value: string;
    }[];
  }[];

  async openFilterPopover(event) {
    const componentProps = {
      beforeSubmit: async (data, value) => {
        this.value = value;
        this.ionChange.emit({
          value,
          name: this.name,
          data,
          event,
        });
        if (this.multiple) this.popoverEl.dismiss();

        return data;
      },
      beforeChange: async (value, options) => {
        this.value = value;
        this.ionInput.emit({
          value,
          name: this.name,
          options,
          event,
        });

        return value;
      },
      multiple: this.multiple,
      name: this.name,
      label: this.label,
      icon: this.icon,
      options: this.options,
      value: this.value,
    };
    this.popoverEl = await popoverController.create({
      event,
      translucent: true,
      showBackdrop: this.showBackdrop,
      backdropDismiss: !this.disableBackgroundDismiss,
      component: "fireenjin-popover-filter",
      componentProps,
    });
    this.popoverEl.present();
  }

  render() {
    const selectedOption =
      this.value &&
      !this.multiple &&
      this.options?.find((opt) => `${opt?.value}` === `${this.value}`);
    return (
      <fireenjin-chip
        color={this.color}
        outline={this.outline}
        disabled={this.disabled}
        onClick={(event) => this.openFilterPopover(event)}
        class={{
          "has-value": !!(this.multiple ? this.value?.length : this.value),
        }}
      >
        {this.icon && !selectedOption?.image ? (
          <ion-icon name={selectedOption?.icon || this.icon} />
        ) : null}
        {selectedOption?.image ? (
          <fireenjin-avatar size="20px" src={selectedOption.image} />
        ) : null}
        <ion-label>
          {(this.value &&
            this.multiple &&
            this.value?.length &&
            `${this.disableSelectedCount ? "" : this.value?.length + " "}${
              this.selectedText
            }`) ||
            (this.value && (selectedOption?.label || selectedOption?.value)) ||
            this.placeholder ||
            this.label}
        </ion-label>
        <ion-icon name={this.selectIcon} />
      </fireenjin-chip>
    );
  }
}
