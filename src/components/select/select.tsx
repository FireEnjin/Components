import { FireEnjinFetchEvent } from "@fireenjin/sdk";
import { SelectCompareFn, SelectInterface } from "@ionic/core";
import {
  Component,
  ComponentInterface,
  Event,
  EventEmitter,
  Host,
  Listen,
  Prop,
  h,
  Build,
  State,
} from "@stencil/core";

@Component({
  tag: "fireenjin-select",
  styleUrl: "select.css",
})
export class Select implements ComponentInterface {
  @Event() fireenjinFetch: EventEmitter<FireEnjinFetchEvent>;
  @Event() ionChange: EventEmitter<{
    event;
    name: string;
    value: any;
  }>;
  /**
   * If `true`, the user cannot interact with the select.
   */
  @Prop() disabled = false;
  /**
   * The text to display on the cancel button.
   */
  @Prop() cancelText = "Dismiss";
  /**
   * The text to display on the ok button.
   */
  @Prop() okText = "Okay";
  /**
   * The text to display when the select is empty.
   */
  @Prop() placeholder?: string | null;
  /**
   * The name of the control, which is submitted with the form data.
   */
  @Prop() name: string;
  /**
   * The text to display instead of the selected option's value.
   */
  @Prop() selectedText?: string | null;
  /**
   * If `true`, the select can accept multiple values.
   */
  @Prop() multiple = false;
  /**
   * The interface the select should use: `action-sheet`, `popover` or `alert`.
   */
  @Prop() interface: SelectInterface = "alert";
  /**
   * Any additional options that the `alert`, `action-sheet` or `popover` interface
   * can take. See the [ion-alert docs](../alert), the
   * [ion-action-sheet docs](../action-sheet) and the
   * [ion-popover docs](../popover) for the
   * create options for each interface.
   *
   * Note: `interfaceOptions` will not override `inputs` or `buttons` with the `alert` interface.
   */
  @Prop() interfaceOptions: any = {};
  /**
   * A property name or function used to compare object values
   */
  @Prop() compareWith?: string | SelectCompareFn | null;
  /**
   * the value of the select.
   */
  @Prop({ mutable: true }) value?: any;
  @Prop() endpoint?: string;
  @Prop() header?: string;
  @Prop() subHeader?: string;
  @Prop() message?: string;
  @Prop() orderBy?: string;
  @Prop() dataPropsMap?: any;
  @Prop() optionEl?: (result: any) => any;
  @Prop() limit = 15;
  @Prop() params?: any;
  @Prop() query?: string;
  @Prop() label: string;
  @Prop() pattern: any;
  @Prop({ mutable: true }) options: {
    label?: string;
    value?: any;
    disabled?: boolean;
    payload?: any;
  }[] = [];
  @Prop() required = false;
  @Prop() resultsKey? = "results";
  @Prop() labelPosition?: "stacked" | "fixed" | "floating";
  @Prop() lines: "full" | "inset" | "none";

  @State() results: any[] = [];

  @Listen("ionChange")
  onChange(event) {
    if (event?.target?.name !== this.name) return;
    this.value = event.target?.value || null;
  }

  @Listen("fireenjinSuccess")
  onSuccess(event) {
    if (
      event?.detail?.name !== "select" ||
      event.detail.endpoint !== this.endpoint
    )
      return;
    this.results = event?.detail?.data?.[this.resultsKey] || [];
  }

  fetchData() {
    if (!this.endpoint) return;
    this.fireenjinFetch.emit({
      name: "select",
      endpoint: this.endpoint,
      dataPropsMap: this.dataPropsMap || null,
      params: {
        data: {
          ...(this.query ? { query: this.query } : {}),
          ...(this.orderBy ? { orderBy: this.orderBy } : {}),
          limit: this.limit ? this.limit : 15,
        },
        ...(this.params ? this.params : {}),
      },
    });
  }

  componentWillLoad() {
    if (!Build.isBrowser) return;
    this.fetchData();
  }

  render() {
    return (
      <Host>
        <ion-item lines={this.lines}>
          <div
            slot="start"
            style={{
              marginRight: "0.5rem",
              display: "flex",
              justifyContent: "center",
              minHeight: "60px",
              alignItems: "center",
            }}
          >
            <slot name="start" />
          </div>
          {this.label && (
            <ion-label position={this.labelPosition}>{this.label}</ion-label>
          )}
          {/* <select
            title={this.placeholder || this.name}
            disabled={this.disabled}
            multiple={this.multiple}
            name={this.name}
            required={this.required}
            onChange={(event) => this.ionChange.emit({
              event,
              name: this.name,
              value: this.value
            })}
          >
            <slot />

            {this.options.map((option) => (
              <option
                selected={
                  this.multiple
                    ? this.value && this.value.indexOf(option.value) >= 0
                    : option.value + "" === this.value + ""
                }
                value={option.value}
              >
                {option.label}
              </option>
            ))}
          </select> */}
          <ion-select
            disabled={this.disabled}
            selectedText={this.selectedText}
            interface={this.interface}
            compareWith={this.compareWith}
            name={this.name}
            value={this.value}
            okText={this.okText}
            multiple={this.multiple}
            cancelText={this.cancelText}
            placeholder={this.placeholder}
            interfaceOptions={
              this.interfaceOptions
                ? this.interfaceOptions
                : {
                    header: this.header,
                    subHeader: this.subHeader,
                    message: this.message,
                  }
            }
          >
            {(this.options ? this.options : []).map((option) =>
              this.optionEl ? (
                this.optionEl(option)
              ) : (
                <ion-select-option
                  value={option.value}
                  disabled={option.disabled}
                >
                  {option.label}
                </ion-select-option>
              )
            )}
            {(this.results ? this.results : []).map((result) =>
              this.optionEl ? (
                this.optionEl(result)
              ) : (
                <ion-select-option value={result.id}>
                  {result.name}
                </ion-select-option>
              )
            )}
            <slot />
          </ion-select>
          <input
            style={{
              opacity: "0",
              height: "0",
              width: "0",
              float: "left",
              margin: "0",
              padding: "0",
            }}
            type="text"
            pattern={this.pattern}
            value={this.value}
            required={this.required}
          />
          <div
            slot="end"
            style={{
              marginLeft: "0.5rem",
              display: "flex",
              justifyContent: "space-between",
              minHeight: "60px",
              alignItems: "center",
            }}
          >
            <slot name="end" />
          </div>
        </ion-item>
      </Host>
    );
  }
}
