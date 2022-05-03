import { FireEnjinFetchEvent } from "@fireenjin/sdk";
import {
  Build,
  Component,
  Event,
  EventEmitter,
  h,
  Host,
  Listen,
  Method,
  Prop,
} from "@stencil/core";

@Component({
  tag: "fireenjin-query",
})
export class Query {
  @Event() fireenjinFetch: EventEmitter<FireEnjinFetchEvent>;

  @Prop() endpoint: string;
  @Prop() name = "query";
  @Prop() dataPropsMap: any;
  @Prop() params: any = {};
  @Prop() resultsKey: string;
  @Prop() success?: (data) => void;

  @Listen("fireenjinSuccess", { target: "body" })
  async onSuccess(event) {
    if (event.detail.name === this.name) {
      let result = event?.detail?.data || [];
      if (this.resultsKey) {
        try {
          result = this.resultsKey
            .split(".")
            .reduce((o, i) => o[i], event.detail.data);
        } catch (error) {
          console.log("Error getting results", event.detail, this.resultsKey);
        }
      }
      if (typeof this.success === "function") this.success(result);
    }
  }

  @Listen("ionRouteDidChange", { target: "body" })
  @Method()
  async fetch(
    options: {
      paramData?: any;
    } = {}
  ) {
    this.params = options?.paramData || {};
    this.fireenjinFetch.emit({
      name: this.name,
      endpoint: this.endpoint,
      dataPropsMap: this.dataPropsMap ? this.dataPropsMap : null,
      params: this.params || {},
    });
  }

  componentDidLoad() {
    if (!Build?.isBrowser) return;
    this.fetch();
  }

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
