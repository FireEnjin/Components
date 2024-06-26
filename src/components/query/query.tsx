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
  @Prop() documentId: string;
  @Prop() name: string;
  @Prop() dataPropsMap: any;
  @Prop() params: any = {};
  @Prop() resultsKey: string;
  @Prop() error?: (data) => void;
  @Prop() success?: (data) => void;

  @Listen("fireenjinError")
  async onError(event) {
    if (event.detail.name === this.name) {
      let result = event?.detail?.data || null;
      if (typeof this.error === "function") this.error(result);
    }
  }

  @Listen("fireenjinSuccess")
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
  async fetch() {
    this.fireenjinFetch.emit({
      name: this.name,
      endpoint: this.endpoint,
      id: this.documentId,
      dataPropsMap: this.dataPropsMap ? this.dataPropsMap : null,
      params: this.params || {},
    });
  }

  componentDidLoad() {
    if (!Build?.isBrowser) return;
    if (!this.name) this.name = this.endpoint;
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
