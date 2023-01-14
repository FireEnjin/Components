import { onMount, onUnMount, useRef, useStore } from "@builder.io/mitosis";

export default function Form(
  props: {
    /**
     * The name of the form used for ID and name
     */
    name?: string;
    /**
     * The data from the form being filled out
     */
    formData?: any;
    /**
     * What the save button says
     */
    submitButton?: string;
    /**
     * What color the submit button is
     */
    submitButtonColor?: string;
    /**
     * What fill option to use for the submit button
     */
    submitButtonFill?: "clear" | "outline" | "solid" | "default";
    /**
     * What the reset button says
     */
    resetButton?: string;
    /**
     * What color the reset button is
     */
    resetButtonColor?: string;
    /**
     * What fill option to use for the reset button
     */
    resetButtonFill?: "clear" | "outline" | "solid" | "default";
    /**
     * Should the form controls be hidden?
     */
    hideControls?: boolean;
    /**
     * The id of the document being edited
     */
    documentId?: string;
    /**
     * A method that runs before form submission to allow editing of formData
     */
    beforeSubmit?: (data: any, options?: any) => Promise<any>;
    /**
     * Should the form disable the loader on submit
     */
    disableLoader?: boolean;
    /**
     * Is the component currently loading
     */
    loading?: boolean;
    /**
     * Should the enter button binding be disabled
     */
    disableEnterButton?: boolean;
    /**
     * Should the form disable reset
     */
    disableReset?: boolean;
    /**
     * Confirm leaving the page when the form is filled
     */
    confirmExit?: boolean;
    /**
     * The HTTP method to use when submitting the form
     */
    method?: "post" | "get" | "dialog";
    /**
     * The endpoint that form submission should link to
     */
    action?: string;
    /**
     * Emit the fetch event emitted when component loads
     */
    fetch?: string | boolean;
    /**
     * The fetch params
     */
    fetchParams?: any;
    /**
     * The map to bind data from fetch response to form data
     */
    fetchDataMap?: any;
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
    cacheKey?: string;
    /**
     * The list of events to listen for input from
     */
    eventListeners?: string[];
    /**
     * The slot (innerHTML) of the component
     */
    children?: any;
  } = {
    formData: {},
    submitButton: "Save",
    submitButtonFill: "solid",
    resetButton: "Cancel",
    resetButtonFill: "clear",
    hideControls: false,
    disableLoader: false,
    loading: false,
    disableEnterButton: false,
    disableReset: false,
    confirmExit: false,
    method: "post",
    eventListeners: [
      "ionInput",
      "ionChange",
      "ionSelect",
      "input",
      "change",
      "fireenjinCodeChange",
    ],
  }
) {
  const formRef = useRef<HTMLFormElement>(null);
  const state = useStore({
    /**
     * The data collected for form submission
     */
    formData: {},
    /**
     * Has the form fields been changed
     */
    hasChanged: false,
    /**
     * The list of events to listen for input from
     */
    eventListeners: [
      "ionInput",
      "ionChange",
      "ionSelect",
      "input",
      "change",
      "fireenjinCodeChange",
    ],
    onInput(event) {
      void (async function () {
        const saveCache = async function () {
          localStorage.setItem(
            props?.cacheKey,
            JSON.stringify(props?.formData)
          );
        };
        const setFilteredValue = async function (key, value) {
          let newValue = value;
          for (const filter of typeof props?.filterData === "string"
            ? props?.filterData.split(",")
            : props?.filterData) {
            if (typeof filter !== "function") continue;
            const filterName =
              Object.getOwnPropertyDescriptors(filter)?.name?.value;
            if (!filterName || filterName !== key) continue;
            newValue = await filter(value);
          }
          return newValue;
        };
        const setByPath = function (obj, path, value) {
          const pList = path.split(".");
          const len = pList.length;
          for (let i = 0; i < len - 1; i++) {
            const nextElemIsArray = !isNaN(parseInt(pList[i + 1]));
            const elem = pList[i];
            if (!obj[elem]) obj[elem] = nextElemIsArray ? [] : {};
            obj = obj[elem];
          }

          obj[pList[len - 1]] = value;
        };
        if (!event?.target?.name?.startsWith?.("ion-")) {
          const value =
            typeof event?.detail?.checked === "boolean"
              ? event.detail.checked
              : event?.detail?.value || event?.target?.value;
          setByPath(
            state?.formData || {},
            event?.target?.name,
            props?.filterData?.length
              ? await setFilteredValue(event?.target?.name, value)
              : value
          );
          if (props.cacheKey) await saveCache();
          if (!state?.hasChanged) {
            state.hasChanged = true;
          }
        }
      })();
    },
    submit(event) {
      (event?.target || document).dispatchEvent(
        new CustomEvent("fireenjinSubmit", {
          bubbles: true,
          detail: {
            event,
            endpoint: props?.action,
            data: state?.formData || null,
          },
        })
      );
    },
  });

  onMount(() => {
    if (props.formData) state.formData = props.formData;
    if (props.eventListeners) state.eventListeners = props.eventListeners;
    const ref =
      (formRef?.addEventListener && formRef) ||
      (formRef?.current?.addEventListener && formRef.current);
    if (ref?.addEventListener)
      state.eventListeners.map((eventName) =>
        ref.addEventListener(eventName, state.onInput.bind(this))
      );
  });

  onUnMount(() => {
    const ref =
      (formRef?.addEventListener && formRef) ||
      (formRef?.current?.addEventListener && formRef.current);
    (props?.eventListeners || []).map((eventName) =>
      ref.removeEventListener(eventName, state.onInput.bind(this))
    );
  });

  return (
    <form
      ref={formRef}
      onSubmit={(event) => {
        event.preventDefault();
        state.submit(event);
      }}
      action={props?.action}
      method={props?.method}
    >
      {props.children}
      <button type="submit">Save</button>
    </form>
  );
}
