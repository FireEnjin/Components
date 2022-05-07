import { FireEnjinFetchEvent } from "@fireenjin/sdk";
import Debounce from "debounce-decorator";
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
import Handlebars from "handlebars";
import * as jsonLogic from "json-logic-js";
import backoff from "../../helpers/backoff";

@Component({
  tag: "fireenjin-render-template",
})
export class RenderTemplate implements ComponentInterface {
  @Event() fireenjinFetch: EventEmitter<FireEnjinFetchEvent>;

  @Prop() templateId: string;
  @Prop() name: string;
  @Prop() data: any = {};
  @Prop({ mutable: true }) template: any = {};
  @Prop({ mutable: true }) partials: {
    id: string;
    html: string;
    [key: string]: any;
  }[] = [];
  @Prop() helpers: { [helperName: string]: any } = {
    formatUSD: (amount) => {
      const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
      });

      return formatter.format(amount ? amount : 0);
    },
    logic: (context, rules, tempData) =>
      jsonLogic.apply(JSON.parse(rules.replace('"@tempData"', tempData)), {
        ...context,
        tempData,
      }),
  };

  @State() html = "";
  @State() currentPartials: string[] = [];
  @State() currentHelpers: string[] = [];

  async componentWillLoad() {
    if (!Build?.isBrowser) return;
    if (this.helpers && Object.keys(this.helpers)?.length) this.setHelpers();
    if (this.partials?.length) this.setPartials();
    if (this.templateId) this.getTemplate(this.templateId);
    if (this.template) backoff(10, this.renderTemplate.bind(this));
  }

  getTemplate(id: string) {
    this.fireenjinFetch.emit({
      endpoint: "findTemplate",
      name: this.name,
      params: {
        id,
      },
    });
  }

  @Method()
  async fetchData(input?: { templateId?: string }) {
    this.getTemplate(input?.templateId || this.templateId);
  }

  @Method()
  async unsetPartials() {
    for (const partialName of this.currentPartials) {
      Handlebars.unregisterPartial(partialName);
    }
    this.currentPartials = [];
    this.partials = [];
  }

  @Method()
  @Debounce(1000)
  @Watch("partials")
  async setPartials(partials?: any[]) {
    try {
      Handlebars.registerPartial(null, "");
    } catch {
      // Make sure handlebars doesn't error when null as partial name
    }
    try {
      if (partials?.length && this.partials !== partials) {
        this.partials = partials;
      }
      for (const partial of this.partials) {
        try {
          if (this.currentPartials.includes(partial?.id))
            Handlebars.unregisterPartial(partial?.id);
          Handlebars.registerPartial(partial?.id, partial?.html || "");
          if (!this.currentPartials.includes(partial?.id))
            this.currentPartials = [...this.currentPartials, partial?.id];
        } catch {
          console.log(`Error setting partial ${partial?.id}.`);
        }
      }
    } catch {
      console.log("Error setting partials.");
    }
  }

  @Method()
  @Debounce(1000)
  @Watch("helpers")
  async setHelpers(helpers?: { [helperName: string]: any }) {
    try {
      if (helpers && this.helpers !== helpers) {
        this.helpers = helpers;
      }
      for (const [helperName, helperFn] of Object.entries(this.helpers)) {
        try {
          if (this.currentHelpers.includes(helperName))
            Handlebars.unregisterHelper(helperName);
          Handlebars.registerHelper(helperName, helperFn);
          if (!this.currentHelpers.includes(helperName))
            this.currentHelpers = [...this.currentHelpers, helperName];
        } catch {
          console.log(`Error setting helper ${helperName}.`);
        }
      }
    } catch {
      console.log("Error setting helpers.");
    }
  }

  @Method()
  async renderTemplate() {
    this.html = Handlebars.compile(
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

  render() {
    return <div innerHTML={this.html || ""} />;
  }
}
