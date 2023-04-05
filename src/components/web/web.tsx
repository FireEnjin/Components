import { Component, Element, Host, Method, Prop, h } from "@stencil/core";
import loadScript from "../../helpers/loadScript";

@Component({
  tag: "fireenjin-web",
  assetsDirs: ["assets"],
})
export class web {
  @Element() el: HTMLElement;

  @Prop({ mutable: true }) lines: any[] = [];
  @Prop() startKey = "data-start";
  @Prop() endKey = "data-end";
  @Prop() optionsKey = "data-options";
  @Prop() options: any = {};
  @Prop() createConnectionFn: (
    connection: [any, any, any?]
  ) => Promise<[any, any, any?]>;

  connections: [any, any, any?][] = [];

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  @Method()
  async createConnectionList() {
    const elements = this.el.querySelectorAll(`[${this.startKey}]`);
    for (let i = 0; i < elements.length; i++) {
      const startEl: any = elements[i];
      const optionsKeyword = this.optionsKey.replace("data-", "");
      const startKeyword = this.startKey.replace("data-", "");
      const endKeyword = this.endKey.replace("data-", "");
      for (const start of (startEl?.dataset?.[startKeyword] || "").split(",")) {
        const dataOptions =
          startEl?.dataset?.[
            `${optionsKeyword}${this.capitalizeFirstLetter(start)}`
          ] || startEl?.dataset?.[optionsKeyword];
        const options =
          (dataOptions && JSON.parse(dataOptions)) || this.options;
        this.el
          .querySelectorAll(`[${this.endKey}*="${start}"]`)
          .forEach((endEl: any) => {
            const endList = (endEl?.dataset?.[endKeyword] || "").split(",");
            if (endList.includes(start))
              this.connections.push([startEl, endEl, options]);
          });
      }
    }

    return this.connections;
  }

  async componentDidLoad() {
    if (!(window as any).LeaderLine)
      await loadScript("./build/assets/leader-line.js");
    for (const connection of (await this.createConnectionList()) || []) {
      const [start, end, options] =
        typeof this.createConnectionFn === "function"
          ? await this.createConnectionFn(connection)
          : connection;
      this.lines.push(
        new (window as any).LeaderLine(start, end, options || this.options)
      );
    }
  }

  render() {
    return (
      <Host>
        <slot />
      </Host>
    );
  }
}
