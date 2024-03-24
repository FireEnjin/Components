import type { FireEnjinTriggerInput } from "@fireenjin/sdk";
import { Component, Event, EventEmitter, Method, Prop, h } from "@stencil/core";
import loadScript from "../../helpers/loadScript";
// import Handsontable from "handsontable";

@Component({
  tag: "fireenjin-spreadsheet",
  styleUrl: "spreadsheet.css",
})
export class Spreadsheet {
  containerEl: HTMLDivElement;
  hot: any;

  @Event() fireenjinTrigger: EventEmitter<FireEnjinTriggerInput>;

  @Prop() data: any;
  @Prop() columns?: any[] | ((index: number) => any);
  @Prop() height = 450;
  @Prop() colWidths?:
    | string
    | number
    | number[]
    | string[]
    | undefined[]
    | (string | number)[]
    | ((index: number) => string | number);
  @Prop() colHeaders?: boolean | string[] | ((index: number) => string) = true;
  @Prop() rowHeaders?: boolean | string[] | ((index: number) => string) = true;
  @Prop() options?: any;

  @Method()
  async getInstance() {
    return this.hot;
  }

  async componentDidLoad() {
    await loadScript(
      "https://unpkg.com/handsontable@14.2.0/dist/handsontable.min.js",
    );
    this.hot = new (window as any).Handsontable(this.containerEl, {
      data: this.data,
      height: this.height,
      colWidths: this.colWidths,
      colHeaders: this.colHeaders,
      rowHeaders: this.rowHeaders,
      columns: this.columns,
      dropdownMenu: true,
      hiddenColumns: {
        indicators: true,
      },
      contextMenu: true,
      multiColumnSorting: true,
      filters: true,
      manualRowMove: true,
      autoWrapCol: true,
      autoWrapRow: true,
      licenseKey: "non-commercial-and-evaluation",
      ...(this.options || {}),
    });
  }

  render() {
    return <div ref={(el) => (this.containerEl = el)}></div>;
  }
}
