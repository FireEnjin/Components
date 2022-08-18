import { FireEnjinFetchEvent } from "@fireenjin/sdk";
import { Color, Mode } from "@ionic/core";
import {
  Component,
  ComponentInterface,
  Event,
  EventEmitter,
  Listen,
  Prop,
  State,
  h,
  Build,
} from "@stencil/core";
import { FieldOption } from "../../typings";

@Component({
  tag: "fireenjin-radios",
  styleUrl: "radios.css",
})
export class Radios implements ComponentInterface {
  @Event() fireenjinFetch: EventEmitter<FireEnjinFetchEvent>;

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
  @Prop() labelPosition?: any = "stacked";
  @Prop() endpoint?: string;
  @Prop() orderBy?: string;
  @Prop() dataPropsMap?: any;
  @Prop() optionEl?: (result: any) => any;
  @Prop() limit = 15;
  @Prop() params?: any;
  @Prop() query?: string;
  @Prop() resultsKey?: string;
  @Prop() radioSlot = "start";
  @Prop() color: Color;
  @Prop() mode: Mode;

  @State() results: any[] = [];

  @Listen("fireenjinSuccess", { target: "body" })
  onSuccess(event) {
    if (
      event?.detail?.name !== "radios" ||
      event.detail.endpoint !== this.endpoint
    )
      return;
    this.results = event?.detail?.data?.results
      ? event.detail.data.results
      : [];
    setTimeout(() => {
      this.value = this.value;
    }, 200);
  }

  fetchData() {
    if (!this.endpoint) return;
    this.fireenjinFetch.emit({
      name: "radios",
      endpoint: this.endpoint,
      dataPropsMap: this.dataPropsMap
        ? this.dataPropsMap
        : this.resultsKey
        ? { [this.resultsKey]: "results" }
        : null,
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
      <ion-list>
        <ion-radio-group
          name={this.name}
          value={this.value}
          allowEmptySelection={this.allowEmptySelection}
        >
          <ion-list-header>{this.label}</ion-list-header>
          {(this.options ? this.options : []).map((option) =>
            this.optionEl ? (
              this.optionEl(option)
            ) : (
              <ion-item lines={this.lines}>
                <ion-label>{option?.label || option?.value}</ion-label>
                <ion-radio
                  mode={this.mode}
                  color={option?.color || this.color}
                  disabled={this.disabled || option.disabled}
                  slot={option?.slot || this.radioSlot}
                  value={option?.value || null}
                />
              </ion-item>
            )
          )}
          {(this.results ? this.results : []).map((result) =>
            this.optionEl ? (
              this.optionEl(result)
            ) : (
              <ion-item lines={this.lines}>
                <ion-label position={this.labelPosition}>
                  {result?.label || result?.name || result?.value || result?.id}
                </ion-label>
                <ion-radio
                  mode={this.mode}
                  color={result?.color || this.color}
                  disabled={this.disabled || result?.disabled}
                  slot={result?.slot || this.radioSlot}
                  value={result?.value || result?.id || null}
                />
              </ion-item>
            )
          )}
        </ion-radio-group>
      </ion-list>
    );
  }
}
