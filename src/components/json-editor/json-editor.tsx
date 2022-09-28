import {
  Component,
  ComponentInterface,
  Host,
  h,
  Build,
  Event,
  EventEmitter,
  Prop,
  Method,
  Watch,
} from "@stencil/core";
import { JSONEditor, JSONEditorPropsOptional } from "vanilla-jsoneditor";

declare interface Content {
  json?: any;
  text?: string;
}

@Component({
  tag: "fireenjin-json-editor",
  styleUrl: "json-editor.css",
  scoped: true,
})
export class JsonEditor implements ComponentInterface {
  editor: JSONEditor;
  jsonEditorEl: any;
  content: Content;
  valueType: "string" | "object" = "string";

  @Event() ionInput: EventEmitter;
  @Event() ionChange: EventEmitter;

  @Prop() name = "json";
  @Prop({ mutable: true }) value: any;
  @Prop() mode?: "tree" | "text" = "tree";
  @Prop() mainMenuBar = true;
  @Prop() navigationBar = true;
  @Prop() statusBar = true;
  @Prop() readOnly = false;
  @Prop() indentation: number | string = 4;
  @Prop() tabSize = 4;
  @Prop() escapeControlCharacters = false;
  @Prop() escapeUnicodeCharacters = false;
  @Prop() validator: any;
  @Prop() options: any = {};

  @Watch("value")
  onValueChange(value, lastValue) {
    if (value === lastValue) return;
    if (typeof value === "string") {
      this.content = {
        text: value,
      };
      this.valueType = "string";
    } else {
      this.content = { json: value };
      this.valueType = "object";
    }
    this.set(this.content);
  }

  @Method()
  async getEditor() {
    return this.editor;
  }

  @Method()
  async set(content: Content) {
    if (!content?.text && !content?.json) return;
    this.editor.set(content as any);
  }

  @Method()
  async update(content: Content) {
    return this.editor.update(content as any);
  }

  @Method()
  async updateOptions(options: JSONEditorPropsOptional) {
    return this.editor.updateProps(options);
  }

  @Method()
  async refresh() {
    return this.editor.refresh();
  }

  @Method()
  async expand(callback: any) {
    return this.editor.expand(callback);
  }

  @Method()
  async setFocus() {
    return this.editor.focus();
  }

  @Method()
  async destroy() {
    return this.editor.destroy();
  }

  @Method()
  async scrollToPath(path: any) {
    return this.editor.scrollTo(path);
  }

  @Method()
  async validate() {
    return this.editor.validate() as any;
  }

  componentDidLoad() {
    if (!Build?.isBrowser) return;
    let value: any;
    this.editor = new JSONEditor({
      target: this.jsonEditorEl,
      props: {
        content: this.content,
        mode: this.mode as any,
        mainMenuBar: this.mainMenuBar,
        navigationBar: this.navigationBar,
        statusBar: this.statusBar,
        readOnly: this.readOnly,
        indentation: this.indentation,
        tabSize: this.tabSize,
        escapeControlCharacters: this.escapeControlCharacters,
        escapeUnicodeCharacters: this.escapeUnicodeCharacters,
        validator: this.validator,
        onBlur: () => {
          this.value = value;
        },
        onChange: (updatedContent) => {
          this.content = updatedContent;
          value = this.content[this.valueType === "string" ? "text" : "json"];
          this.ionChange.emit({
            name: this.name,
            value,
          });
          this.ionInput.emit({
            name: this.name,
            value,
          });
        },
        ...(this.options || {}),
      },
    });
  }

  disconnectedCallback(): void {
    this.destroy();
  }

  render() {
    return <Host ref={(el) => (this.jsonEditorEl = el)} />;
  }
}
