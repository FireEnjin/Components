import { useMetadata, useRef, useStore } from "@builder.io/mitosis";

export default function Input(
  props: {
    /**
     * Hint for expected file type in file upload controls
     */
    accept?: any;
    /**
     * The label to display
     */
    label?: string;
    /**
     * The position of the label
     */
    labelPosition?: "fixed" | "stacked" | "floating";
    /**
     * The name of the form used for ID and name
     */
    name?: string;
    /**
     * The value of the input
     */
    value?: any;
    /**
     * The alt attribute for the image type. Required for accessibility
     */
    alt?: string;
    /**
     * Hint for form autofill feature
     */
    autocomplete?: string;
    /**
     * Media capture input method in file upload controls
     */
    capture?: any;
    /**
     * The for attribute on label to link to the input
     */
    for?: string;
    /**
     * Whether the command or control is checked
     */
    checked?: boolean;
    /**
     * Name of form field to use for sending the element's directionality in form submission
     */
    dirname?: string;
    /**
     * Whether the form control is disabled
     */
    disabled?: boolean;
    /**
     * Associates the control with a form element using it's ID
     */
    form?: string;
    /**
     * URL to use for form submission
     */
    formaction?: string;
    /**
     * Form data set encoding type to use for form submission
     */
    formenctype?: any;
    /**
     * HTTP method to use for form submission
     */
    formmethod?: any;
    /**
     * Bypass form control validation for form submission
     */
    formnovalidate?: boolean;
    /**
     * Browsing context for form submission
     */
    formtarget?: string;
    /**
     * Same as height attribute for <img>; vertical dimension
     */
    height?: string | number;
    /**
     * Value of the id attribute of the <datalist> of autocomplete options
     */
    list?: string;
    /**
     * Maximum value
     */
    max?: any;
    /**
     * Maximum length (number of characters) of value
     */
    maxlength?: number;
    /**
     * Minimum value
     */
    min?: any;
    /**
     * Minimum length (number of characters) of value
     */
    minlength?: number;
    /**
     * Boolean. Whether to allow multiple values
     */
    multiple?: boolean;
    /**
     * Pattern the value must match to be valid
     */
    pattern?: any;
    /**
     * Text that appears in the form control when it has no value set
     */
    placeholder?: string;
    /**
     * Boolean. The value is not editable
     */
    readonly?: boolean;
    /**
     * Boolean. A value is required or must be check for the form to be submittable
     */
    required?: boolean;
    /**
     * Size of the control
     */
    size?: string | number;
    /**
     * Same as src attribute for <img>; address of image resource
     */
    src?: string;
    /**
     * Incremental values that are valid
     */
    step?: string | number;
    /**
     * Type of form control
     */
    type?: string;
    /**
     * Same as width attribute for <img>
     */
    width?: string | number;
  } = {}
) {
  useMetadata({
    tagName: "fireenjin-input",
  });
  const inputRef = useRef<HTMLInputElement>(null);
  const state = useStore({
    onChange(event) {
      console.log("change", event);
    },
    onInput(event) {
      console.log("input", event);
    },
    value: props?.value,
  });

  return (
    <div
      class="input-wrapper"
      style={{ display: props?.labelPosition !== "stacked" ? "flex" : "block" }}
    >
      {props?.label && (
        <label data-for={props?.for || props?.name || props?.label}>
          {props.label}
        </label>
      )}
      <input
        css={{
          display: "var(--input-display, block)",
          background: "var(--input-background, transparent)",
          border: "var(--input-border, none)",
          boxShadow: "var(--input-box-shadow, none)",
          "&:active": {
            border: "var(--input-active-border, var(--input-border, none))",
          },
          "&:focus": {
            border: "var(--input-focus-border, var(--input-border, none))",
            borderColor: "inherit",
            "-webkit-box-shadow":
              "var(--input-focus-box-shadow, var(--input-box-shadow, none))",
            boxShadow:
              "var(--input-focus-box-shadow, var(--input-box-shadow, none))",
            outline: "var(--input-focus-outline, var(--input-border, none))",
          },
          "&:hover": {
            border: "var(--input-hover-border, var(--input-border, none))",
          },
        }}
        id={props?.for || props?.name || props?.label}
        name={props?.name}
        accept={props?.accept}
        value={props?.value}
        checked={props?.checked}
        form={props?.form}
        formAction={props?.formaction}
        formEncType={props?.formenctype}
        formMethod={props?.formmethod}
        formNoValidate={props?.formnovalidate}
        formTarget={props?.formtarget}
        height={props?.height}
        alt={props?.alt}
        list={props?.list}
        max={props?.max}
        min={props?.min}
        maxLength={props?.maxlength}
        multiple={props?.multiple}
        pattern={props?.pattern}
        ref={inputRef}
        placeholder={props?.placeholder}
        readOnly={props?.readonly}
        size={props?.size}
        src={props?.src}
        step={props?.step}
        type={props?.type || "text"}
        width={props?.width}
      />
    </div>
  );
}
