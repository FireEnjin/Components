import { Color, SelectCompareFn, SelectInterface } from "@ionic/core";

export type FieldOption = {
  label?: string;
  value?: any;
  checked?: boolean;
  disabled?: boolean;
  payload?: any;
  slot?: string;
  color?: Color;
};

export interface Control {
  /**
   * The label to show next to the button
   */
  label: string;
  /**
   * The value of the field
   */
  value?: any;
  /**
   * The icon to use in the button
   */
  icon?: string;
  /**
   * The color from the theme to make the button
   */
  color?: Color;
  /**
   * The link to use for the button
   */
  href?: string;
  /**
   * The check if detail icon will display
   */
  detail?: boolean;
  /**
   * The icon used when detail is set true
   */
  detailIcon?: string;
  /**
   * The name of the input
   */
  name?: string;
  /**
   * The type of event to fire when a options are selected
   */
  type?: "set" | "move" | "select" = "set";
  /**
   * The functionality to run when the button is clicked
   */
  onClick?: (event: any) => any;
  /**
   * Can you check the controls
   */
  checkable?: boolean;
  /**
   * Can you select multiple
   */
  multiple?: boolean;
  /**
   * Is the checkbox or radio checked
   */
  checked?: boolean;
  /**
   * Should we hide the checkbox or radio for this item?
   */
  hideCheckable?: boolean;
  /**
   * Should we show the clear button
   */
  showClear?: boolean;
}

export type Field = {
  compareWith?: string | SelectCompareFn | null;
  options?: FieldOption[];
  beforeHTML?: string;
  innerHTML?: string;
  afterHTML?: string;
  path?: string;
  fileName?: string;
  accept?: string;
  defaultValue?: any;
  documentId?: string;
  stripeKey?: string;
  type?: any;
  required?: any;
  autocomplete?: "on" | "off";
  autocapitalize?: string;
  autocorrect?: "on" | "off";
  autofocus?: boolean;
  googleMapsKey?: string;
  minlength?: number;
  maxlength?: number;
  helperText?: string;
  errorText?: string;
  debounce?: number;
  counter?: boolean;
  counterFormatter?: (inputLength: number, maxLength: number) => string;
  edit?: boolean;
  min?: string;
  max?: string;
  iconLeft?: string;
  iconRight?: string;
  silence?: boolean;
  step?: string;
  actionOptions?: any;
  pattern?: any;
  clearInput?: boolean;
  readOnly?: boolean;
  spellCheck?: boolean;
  inputMode?: string;
  stripeElements?: any;
  lines?: "full" | "inset" | "none";
  labelPosition?: "stacked" | "fixed" | "floating";
  resultsKey?: string;
  name?: string;
  icon?: string;
  label?: string;
  value?: any;
  header?: string;
  subHeader?: string;
  fallback?: string;
  message?: string;
  optionEl?: (result: any) => any;
  endpoint?: string;
  query?: string;
  limit?: number;
  orderBy?: string;
  dataPropsMap?: any;
  params?: any;
  multiple?: boolean;
  disabled?: boolean;
  cancelText?: string;
  okText?: string;
  placeholder?: string;
  selectedText?: string;
  interface?: SelectInterface;
  interfaceOptions?: any;
  uploadData?: any;
  showButton?: boolean;
  buttonText?: string;
  initials?: string;
  resize?: boolean;
  loading?: boolean;
  template?: (result) => any;
  searchParams?: any;
  mode?: string;
  results?: any;
};

export type Step = {
  beforeHTML?: string;
  name?: string;
  fields?: Field[];
  innerHTML?: string;
  afterHTML?: string;
  component?: string;
  componentProps?: any;
};

export type FilterControl = {
  resultsKey?: string;
  name: string;
  icon?: string;
  label?: string;
  value?: any;
  header?: string;
  subHeader?: string;
  message?: string;
  optionEl?: (result: any) => any;
  endpoint?: string;
  query?: string;
  limit?: number;
  orderBy?: string;
  dataPropsMap?: any;
  params?: any;
  multiple?: boolean;
  disabled?: boolean;
  cancelText?: string;
  okText?: string;
  placeholder?: string;
  selectedText?: string;
  interface?: SelectInterface;
  interfaceOptions?: any;
  compareWith?: string | SelectCompareFn | null;
  options?: FieldOption[];
};
