import { componentQrl, inlinedQrl, useStore, useClientEffectQrl, useLexicalScope, Slot, _IMMUTABLE, _wrapSignal, useRef, useCleanupQrl, useStylesScopedQrl } from "@builder.io/qwik";
import { jsx, jsxs } from "@builder.io/qwik/jsx-runtime";
const pollen = "";
const global = "";
const Button = /* @__PURE__ */ componentQrl(inlinedQrl((props) => {
  const state = useStore({
    fill: "solid",
    radius: "md",
    theme: "blue"
  });
  useClientEffectQrl(inlinedQrl(() => {
    const [props2, state2] = useLexicalScope();
    state2.theme = props2.theme || "blue";
    state2.fill = props2.fill || "solid";
    state2.radius = props2.radius || "md";
  }, "Button_component_useClientEffect_fjdI3gikD7E", [
    props,
    state
  ]));
  return /* @__PURE__ */ jsx("a", {
    get target() {
      return props.target;
    },
    get title() {
      return props.title;
    },
    get href() {
      return props.href;
    },
    style: {
      fontFamily: "inherit",
      fontSize: props.size === "large" && "2rem" || props.size === "small" && "1.1rem" || "1.2rem",
      textDecoration: "none",
      color: state.fill !== "solid" ? state.theme ? (state.theme.includes("#") || state.theme.includes("(")) && state.theme || `var(--color-${state.theme})` : "transparent" : "#ffffff",
      display: "inline-flex",
      gap: "8px",
      alignItems: "center",
      border: state.fill === "outline" ? `1px solid ${state.theme ? (state.theme.includes("#") || state.theme.includes("(")) && state.theme || `var(--color-${state.theme})` : "#ffffff"}` : "none",
      background: state.fill !== "solid" ? "none" : `${state.theme ? (state.theme.includes("#") || state.theme.includes("(")) && state.theme || `var(--color-${state.theme})` : "#ffffff"}`,
      padding: props.size === "large" && "var(--size-2) var(--size-5)" || props.size === "small" && "var(--size-px) var(--size-2)" || "var(--size-1) var(--size-4)",
      borderRadius: state.radius === "none" && "none" || `var(--radius-${state.radius || ""})`,
      boxShadow: state.fill !== "solid" && "none" || props.size === "large" && "var(--shadow-md)" || props.size === "small" && "var(--shadow-xs)" || "var(--shadow-sm)"
    },
    children: /* @__PURE__ */ jsx(Slot, {}, "Tv_0"),
    [_IMMUTABLE]: {
      target: _wrapSignal(props, "target"),
      title: _wrapSignal(props, "title"),
      href: _wrapSignal(props, "href")
    }
  });
}, "Button_component_0c0eZeZK1vk"));
const Card = /* @__PURE__ */ componentQrl(inlinedQrl((props) => {
  const state = useStore({
    fill: "solid",
    radius: "md",
    theme: "#ffffff"
  });
  useClientEffectQrl(inlinedQrl(() => {
    const [props2, state2] = useLexicalScope();
    state2.theme = props2.theme || "#ffffff";
    state2.fill = props2.fill || "solid";
    state2.radius = props2.radius || "md";
  }, "Card_component_useClientEffect_BhyQjBz6ofU", [
    props,
    state
  ]));
  return /* @__PURE__ */ jsx("div", {
    style: {
      fontFamily: "inherit",
      fontSize: props.size === "large" && "2rem" || props.size === "small" && "1.1rem" || "1.2rem",
      textDecoration: "none",
      color: "inherit",
      display: "inline-flex",
      gap: "8px",
      alignItems: "center",
      border: state.fill === "outline" ? `1px solid ${state.theme ? (state.theme.includes("#") || state.theme.includes("(")) && state.theme || `var(--color-${state.theme})` : "#ffffff"}` : "none",
      background: state.theme ? (state.theme.includes("#") || state.theme.includes("(")) && state.theme || `var(--color-${state.theme})` : "#ffffff",
      padding: props.size === "large" && "var(--size-2) var(--size-5)" || props.size === "small" && "var(--size-px) var(--size-2)" || "var(--size-1) var(--size-4)",
      borderRadius: state.radius === "none" && "none" || `var(--radius-${state.radius || ""})`,
      boxShadow: state.fill !== "solid" && "none" || props.size === "large" && "var(--shadow-md)" || props.size === "small" && "var(--shadow-xs)" || "var(--shadow-sm)"
    },
    children: /* @__PURE__ */ jsx(Slot, {}, "D7_0")
  });
}, "Card_component_dZ4OrT0UOZM"));
const onInput = function onInput2(props, state, formRef, event) {
  (async function() {
    const saveCache = async function() {
      localStorage.setItem(props?.cacheKey, JSON.stringify(props?.formData));
    };
    const setFilteredValue = async function(key, value) {
      let newValue = value;
      for (const filter of typeof props?.filterData === "string" ? props?.filterData.split(",") : props?.filterData) {
        if (typeof filter !== "function")
          continue;
        const filterName = Object.getOwnPropertyDescriptors(filter)?.name?.value;
        if (!filterName || filterName !== key)
          continue;
        newValue = await filter(value);
      }
      return newValue;
    };
    const setByPath = function(obj, path, value) {
      const pList = path.split(".");
      const len = pList.length;
      for (let i = 0; i < len - 1; i++) {
        const nextElemIsArray = !isNaN(parseInt(pList[i + 1]));
        const elem = pList[i];
        if (!obj[elem])
          obj[elem] = nextElemIsArray ? [] : {};
        obj = obj[elem];
      }
      obj[pList[len - 1]] = value;
      return obj;
    };
    if (!event?.target?.name?.startsWith?.("ion-")) {
      const value = typeof event?.detail?.checked === "boolean" ? event.detail.checked : event?.detail?.value || event?.target?.value;
      setByPath(state?.formData || {}, event?.target?.name, props?.filterData?.length ? await setFilteredValue(event?.target?.name, value) : value);
      if (props.cacheKey)
        await saveCache();
      if (!state?.hasChanged)
        state.hasChanged = true;
    }
  })();
};
const submit = function submit2(props, state, formRef, event) {
  (event?.target || document).dispatchEvent(new CustomEvent("fireenjinSubmit", {
    bubbles: true,
    detail: {
      event,
      endpoint: props?.action,
      data: state?.formData || null
    }
  }));
};
const Form = /* @__PURE__ */ componentQrl(inlinedQrl((props) => {
  const formRef = useRef();
  const state = useStore({
    eventListeners: [
      "ionInput",
      "ionChange",
      "ionSelect",
      "input",
      "change",
      "fireenjinCodeChange"
    ],
    formData: {},
    hasChanged: false,
    resetButton: "Clear",
    resetButtonFill: "solid",
    resetButtonRadius: "md",
    resetButtonTheme: "grey",
    submitButton: "Save",
    submitButtonFill: "solid",
    submitButtonRadius: "md",
    submitButtonTheme: "blue"
  });
  useClientEffectQrl(inlinedQrl(() => {
    const [formRef2, props2, state2] = useLexicalScope();
    if (props2.formData)
      state2.formData = props2.formData;
    if (props2.eventListeners)
      state2.eventListeners = props2.eventListeners;
    state2.submitButton = props2?.submitButton ?? "Save";
    state2.submitButtonTheme = props2?.submitButtonTheme || "blue";
    state2.submitButtonFill = props2?.submitButtonFill || "solid";
    state2.submitButtonRadius = props2?.submitButtonRadius || "md";
    state2.resetButton = props2?.resetButton ?? "Clear";
    state2.resetButtonTheme = props2?.resetButtonTheme || "grey";
    state2.resetButtonFill = props2?.resetButtonFill || "solid";
    state2.resetButtonRadius = props2?.submitButtonRadius || "md";
    const ref = formRef2?.addEventListener && formRef2 || formRef2?.current?.addEventListener && formRef2.current;
    if (ref?.addEventListener)
      state2.eventListeners.map((eventName) => ref.addEventListener(eventName, onInput.bind(null, props2, state2, formRef2).bind(void 0)));
  }, "Form_component_useClientEffect_7zbnHAft35s", [
    formRef,
    props,
    state
  ]));
  useCleanupQrl(inlinedQrl(() => {
    const [formRef2, props2, state2] = useLexicalScope();
    const ref = formRef2?.addEventListener && formRef2 || formRef2?.current?.addEventListener && formRef2.current;
    (props2?.eventListeners || []).map((eventName) => ref.removeEventListener(eventName, onInput.bind(null, props2, state2, formRef2).bind(void 0)));
  }, "Form_component_useCleanup_3kjfgNnuUGs", [
    formRef,
    props,
    state
  ]));
  return /* @__PURE__ */ jsxs("form", {
    "preventdefault:submit": "",
    ref: formRef,
    onSubmit$: inlinedQrl((event) => {
      const [formRef2, props2, state2] = useLexicalScope();
      event.preventDefault();
      submit(props2, state2, formRef2, event);
    }, "Form_component_form_onSubmit_mLmcrPc0uLA", [
      formRef,
      props,
      state
    ]),
    action: props?.action,
    method: props?.method,
    children: [
      /* @__PURE__ */ jsx(Slot, {}, "S9_0"),
      !props.hideControls ? /* @__PURE__ */ jsxs("div", {
        class: "form-controls",
        style: {
          display: "flex",
          justifyContent: "space-between"
        },
        children: [
          state.resetButton ? /* @__PURE__ */ jsx(Button, {
            get theme() {
              return state.resetButtonTheme;
            },
            get fill() {
              return state.resetButtonFill;
            },
            get radius() {
              return state.resetButtonRadius;
            },
            children: _wrapSignal(state, "resetButton"),
            [_IMMUTABLE]: {
              theme: _wrapSignal(state, "resetButtonTheme"),
              fill: _wrapSignal(state, "resetButtonFill"),
              radius: _wrapSignal(state, "resetButtonRadius")
            }
          }, "S9_1") : null,
          state.submitButton ? /* @__PURE__ */ jsx(Button, {
            get theme() {
              return state.submitButtonTheme;
            },
            get fill() {
              return state.submitButtonFill;
            },
            get radius() {
              return state.submitButtonRadius;
            },
            children: _wrapSignal(state, "submitButton"),
            [_IMMUTABLE]: {
              theme: _wrapSignal(state, "submitButtonTheme"),
              fill: _wrapSignal(state, "submitButtonFill"),
              radius: _wrapSignal(state, "submitButtonRadius")
            }
          }, "S9_2") : null
        ],
        [_IMMUTABLE]: {
          children: false
        }
      }) : null
    ],
    [_IMMUTABLE]: {
      children: false
    }
  });
}, "Form_component_xe7wWdy1GII"));
const Input = /* @__PURE__ */ componentQrl(inlinedQrl((props) => {
  useStylesScopedQrl(inlinedQrl(STYLES, "Input_component_useStylesScoped_8UvyXfp0K18"));
  const inputRef = useRef();
  useStore({
    value: props?.value
  });
  return /* @__PURE__ */ jsxs("div", {
    class: "input-wrapper",
    style: {
      display: props?.labelPosition !== "stacked" ? "flex" : "block"
    },
    children: [
      props?.label ? /* @__PURE__ */ jsx("label", {
        htmlFor: props?.for || props?.name || props?.label,
        children: _wrapSignal(props, "label")
      }) : null,
      /* @__PURE__ */ jsx("input", {
        class: "input-Input",
        id: props?.for || props?.name || props?.label,
        name: props?.name,
        accept: props?.accept,
        value: props?.value,
        checked: props?.checked,
        form: props?.form,
        formaction: props?.formaction,
        formenctype: props?.formenctype,
        formmethod: props?.formmethod,
        formnovalidate: props?.formnovalidate,
        formtarget: props?.formtarget,
        height: props?.height,
        alt: props?.alt,
        list: props?.list,
        max: props?.max,
        min: props?.min,
        maxlength: props?.maxlength,
        multiple: props?.multiple,
        pattern: props?.pattern,
        ref: inputRef,
        placeholder: props?.placeholder,
        readonly: props?.readonly,
        size: props?.size,
        src: props?.src,
        step: props?.step,
        type: props?.type || "text",
        width: props?.width
      })
    ],
    [_IMMUTABLE]: {
      children: false
    }
  });
}, "Input_component_at0piJamTdg"));
const STYLES = `
.input-Input {
  display: var(--input-display, block);
  background: var(--input-background, transparent);
  border: var(--input-border, none);
  box-shadow: var(--input-box-shadow, none);
}.input-Input:active {
  border: var(--input-active-border, var(--input-border, none));
}.input-Input:focus {
  border: var(--input-focus-border, var(--input-border, none));
  border-color: inherit;
  webkit-box-shadow: var(--input-focus-box-shadow, var(--input-box-shadow, none));
  box-shadow: var(--input-focus-box-shadow, var(--input-box-shadow, none));
  outline: var(--input-focus-outline, var(--input-border, none));
}.input-Input:hover {
  border: var(--input-hover-border, var(--input-border, none));
}`;
export {
  Button,
  Card,
  Form,
  Input
};
