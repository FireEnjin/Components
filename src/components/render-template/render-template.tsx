import { FireEnjinFetchEvent } from "@fireenjin/sdk";
import {
  Build,
  Component,
  ComponentInterface,
  Event,
  EventEmitter,
  Prop,
  h,
  Watch,
  State,
  Listen,
  Method,
} from "@stencil/core";
import backoff from "../../helpers/backoff";
import injectScript from "../../helpers/injectScript";

@Component({
  tag: "fireenjin-render-template",
})
export class RenderTemplate implements ComponentInterface {
  @Event() fireenjinFetch: EventEmitter<FireEnjinFetchEvent>;

  @Prop() templateId: string;
  @Prop() data: any = {};
  @Prop({ mutable: true }) template: any = {};
  @Prop({ mutable: true }) partials: { id: string; html: string }[];

  @State() html = "";

  async componentWillLoad() {
    if (!Build?.isBrowser) return;
    if (!(window as any)?.Handlebars)
      await injectScript(
        "https://cdn.jsdelivr.net/npm/handlebars@latest/dist/handlebars.js"
      );
    if (this.templateId)
      this.fireenjinFetch.emit({
        endpoint: "findTemplate",
        params: {
          id: this.templateId,
        },
      });
    backoff(10, this.renderTemplate.bind(this));
    this.setPartials();
  }

  @Method()
  async setPartials(partials?: { id: string; html: string }[]) {
    if (partials?.length && this.partials !== partials)
      this.partials = partials;
    for (const partial of this.partials || []) {
      if (!partial.html) continue;
      try {
        (window as any).Handlebars.registerPartial(partial.id, partial.html);
      } catch {
        console.log(`Failed to load partial: ${partial?.id}`, partial);
      }
    }
  }

  @Method()
  async renderTemplate() {
    this.html = (window as any).Handlebars.compile(
      this.template?.html ? this.template?.html : ""
    )(this.data ? this.data : {});
  }

  @Listen("fireenjinSuccess", { target: "body" })
  onSuccess(event) {
    if (
      event?.detail?.endpoint === "findTemplate" &&
      event.detail?.data?.template?.id === this.templateId
    ) {
      this.template = event?.detail?.data?.template
        ? event.detail.data.template
        : null;
    }
  }

  @Watch("templateId")
  onTemplateId() {
    this.fireenjinFetch.emit({
      endpoint: "findTemplate",
      params: {
        id: this.templateId,
      },
    });
  }

  @Watch("data")
  onData() {
    backoff(10, this.renderTemplate.bind(this));
  }

  @Watch("template")
  onTemplate() {
    backoff(10, this.renderTemplate.bind(this));
  }

  @Watch("partials")
  onPartials() {
    this.setPartials();
  }

  render() {
    return <div innerHTML={this.html || ""} />;
  }
}
