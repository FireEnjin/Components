import { Color } from "@ionic/core";
import {
  Build,
  Component,
  ComponentInterface,
  Listen,
  h,
  Prop,
} from "@stencil/core";

@Component({
  tag: "fireenjin-popover-filter",
  styleUrl: "popover-filter.css",
})
export class PopoverFilter implements ComponentInterface {
  formEl: HTMLFireenjinFormElement;

  @Prop() label = "Filter";
  @Prop() icon?: string;
  @Prop() name? = "filter";
  @Prop() options: {
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
  @Prop() beforeSubmit: (data, value?: string[]) => any;
  @Prop() beforeChange: (
    value,
    options?: {
      name: string;
      multiple: boolean;
    },
  ) => any;
  @Prop() enableLoader = false;
  @Prop() hideControls = false;
  @Prop() multiple = false;
  @Prop({ mutable: true }) value: any;
  @Prop() submitButton = "Filter";

  @Listen("fireenjinReset")
  onReset() {
    const value = this.multiple ? [] : null;
    this.formEl.formData.value = value;
    if (typeof this.beforeChange === "function")
      this.beforeChange(value, {
        name: this.name,
        multiple: this.multiple,
      });
    this.formEl.submit();
    const popoverEl = document.querySelector("ion-popover");
    if (popoverEl?.dismiss) popoverEl.dismiss();
  }

  @Listen("ionChange")
  onChange(event) {
    const value = this.multiple
      ? event?.detail?.checked
        ? [...(this.formEl?.formData?.value || []), event?.target?.name]
        : (this.formEl?.formData?.value || []).filter(
            (val) => val !== event?.target?.name,
          )
      : event?.detail?.checked
        ? event?.target?.name
        : null;
    this.formEl.formData.value = value;
    if (typeof this.beforeChange === "function")
      this.beforeChange(value, {
        name: this.name,
        multiple: this.multiple,
      });
    if (this.multiple) return;
    this.formEl.submit();
    const popoverEl = document.querySelector("ion-popover");
    if (popoverEl?.dismiss) popoverEl.dismiss();
  }

  componentDidLoad() {
    if (!Build?.isBrowser) return;
    if (this.value) this.formEl.formData.value = this.value;
  }

  render() {
    return (
      <ion-content
        style={{
          "--background": "#fff",
        }}
      >
        <fireenjin-form
          ref={(el) => (this.formEl = el)}
          disableLoader={!this.enableLoader}
          name={this.name}
          beforeSubmit={(data) => {
            if (typeof this.beforeSubmit === "function") {
              this.beforeSubmit(data, data?.value);
            }
            return data;
          }}
          submitButton={this.submitButton}
          hideControls={!this.multiple || this.hideControls}
          resetButton={"Clear"}
          resetButtonShape="round"
          submitButtonShape="round"
        >
          <ion-list lines="full" class="ion-no-padding">
            {this.label ? (
              <fireenjin-list-header label={this.label} icon={this.icon} />
            ) : null}
            {this.options?.length
              ? this.options.map((control) => (
                  <ion-item
                    class={{ "hover-color": !!control?.color }}
                    style={{
                      "--hover-color": `var(--ion-color-${control.color})`,
                    }}
                  >
                    <ion-checkbox
                      color={control?.color || "primary"}
                      name={control?.value}
                      style={{ marginRight: "0.6rem" }}
                      slot="start"
                      checked={
                        (this.multiple &&
                          (this.value || []).includes(
                            `${control?.value || ""}`,
                          )) ||
                        control.value === this.value ||
                        control.checked
                      }
                    />
                    <ion-label class="ion-no-padding">
                      {control?.label || control?.value}
                    </ion-label>
                    {control?.icon && (
                      <ion-icon
                        name={control.icon}
                        class={{
                          "active-color": this.multiple
                            ? (this.value || []).includes(control?.value)
                            : this.value === control?.value,
                        }}
                        style={{
                          "--active-color": `var(--ion-color-${control.color})`,
                        }}
                        slot="end"
                      />
                    )}
                    {control?.image && (
                      <fireenjin-avatar
                        size="2rem"
                        src={control?.image}
                        initials={(control?.label || control?.value).charAt(0)}
                      />
                    )}
                  </ion-item>
                ))
              : null}
          </ion-list>
        </fireenjin-form>
      </ion-content>
    );
  }
}
