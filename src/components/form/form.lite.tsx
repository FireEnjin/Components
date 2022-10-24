export default function Form(props: {
  /**
   * The name of the form used for ID and name
   */
  name: string;
  /**
   * The data from the form being filled out
   */
  formData: any = {};
  /**
   * What the save button says
   */
  submitButton: string = "Save";
  /**
   * What color the submit button is
   */
  submitButtonColor: string = "primary";
  /**
   * What fill option to use for the submit button
   */
  submitButtonFill: "clear" | "outline" | "solid" | "default" = "solid";
  /**
   * What the reset button says
   */
  resetButton: string = "Cancel";
  /**
   * What color the reset button is
   */
  resetButtonColor: string = "dark";
  /**
   * What fill option to use for the reset button
   */
  resetButtonFill: "clear" | "outline" | "solid" | "default" = "clear";
  /**
   * Should the form controls be hidden?
   */
  hideControls: boolean = false;

  endpoint: string;
  /**
   * The id of the document being edited
   */
  documentId: string;
  /**
   * A method that runs before form submission to allow editing of formData
   */
  beforeSubmit: (data: any, options?: any) => Promise<any>;
  /**
   * Should the form disable the loader on submit
   */
  disableLoader: boolean = false;
  /**
   * Is the component currently loading
   */
  loading: boolean = false;
  /**
   * Should the enter button binding be disabled
   */
  disableEnterButton: boolean = false;
  /**
   * Should the form disable reset
   */
  disableReset: boolean = false;
  /**
   * Confirm leaving the page when the form is filled
   */
  confirmExit: boolean = false;
  /**
   * Has the form fields been changed
   */
  hasChanged: boolean = false;
  /**
   * The HTTP method to use when submitting the form
   */
  method: "post" | "get" | "dialog" = "post";
  /**
   * The endpoint that form submission should link to
   */
  action: string;
  /**
   * Emit the fetch event emitted when component loads
   */
  fetch: string | boolean;
  /**
   * The fetch params
   */
  fetchParams: any;
  /**
   * The map to bind data from fetch response to form data
   */
  fetchDataMap: any;
  /**
   * The result key to use for formData
   */
  fetchKey?: string;
  /**
   * A comma separated list or array of items to filter out for submission
   */
  // filterData?: (string | ((value: any) => Promise<any> | any))[];
  filterData?: any;
  /**
   * The localStorage key name to store as
   */
  cacheKey: string;
  /**
   * The slot (innerHTML) of the component
   */
  children?: any;
}) {
  return (
    <form onLoad={} action={props?.action} method={props?.method}>
      {props.children}
    </form>
  );
}
