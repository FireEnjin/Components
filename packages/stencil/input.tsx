
> @fireenjin/components@2.0.0 compile:stencil
> mitosis compile -t stencil "./src/components/input/input.lite.tsx"

import { Component, Prop, h, State, Fragment } from "@stencil/core";

@Component({
  tag: "fireenjin-input",
  styles: `
       .input {
         display: var(--input-display, block);
         background: var(--input-background, transparent);
         border: var(--input-border, none);
         box-shadow: var(--input-box-shadow, none);
       }
       .input:active {
         border: var(--input-active-border, var(--input-border, none));
       }
       .input:focus {
         border: var(--input-focus-border, var(--input-border, none));
         border-color: inherit;
         webkit-box-shadow: var(
           --input-focus-box-shadow,
           var(--input-box-shadow, none)
         );
         box-shadow: var(--input-focus-box-shadow, var(--input-box-shadow, none));
         outline: var(--input-focus-outline, var(--input-border, none));
       }
       .input:hover {
         border: var(--input-hover-border, var(--input-border, none));
       }
`,
})
export default class Input {
  @Prop() label: any;

  @State() value = this.value;

  onChange(event) {
    console.log("change", event);
  }
  onInput(event) {
    console.log("input", event);
  }

  render() {
    return (
      <div
        style={{
          display: this.labelPosition !== "stacked" ? "flex" : "block",
        }}
      >
        {this.label ? (
          <label for={this.for || this.name || this.label}>{this.label}</label>
        ) : null}

        <input
          id={this.for || this.name || this.label}
          name={this.name}
          accept={this.accept}
          value={this.value}
          checked={this.checked}
          form={this.form}
          formaction={this.formaction}
          formenctype={this.formenctype}
          formmethod={this.formmethod}
          formnovalidate={this.formnovalidate}
          formtarget={this.formtarget}
          height={this.height}
          alt={this.alt}
          list={this.list}
          max={this.max}
          min={this.min}
          maxlength={this.maxlength}
          multiple={this.multiple}
          pattern={this.pattern}
          ref={(el) => (this.inputRef = el)}
          placeholder={this.placeholder}
          readonly={this.readonly}
          size={this.size}
          src={this.src}
          step={this.step}
          type={this.type || "text"}
          width={this.width}
        />
      </div>
    );
  }
}

