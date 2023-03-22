"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const qwik = require("@builder.io/qwik");
const jsxRuntime = require("@builder.io/qwik/jsx-runtime");
const pollen = "";
const global = "";
const Button = /* @__PURE__ */ qwik.componentQrl(qwik.inlinedQrl((props) => {
  const state = qwik.useStore({
    fill: "solid",
    radius: "md",
    theme: "blue"
  });
  qwik.useClientEffectQrl(qwik.inlinedQrl(() => {
    const [props2, state2] = qwik.useLexicalScope();
    state2.theme = props2.theme || "blue";
    state2.fill = props2.fill || "solid";
    state2.radius = props2.radius || "md";
  }, "Button_component_useClientEffect_eGSH29J1J2g", [
    props,
    state
  ]));
  return /* @__PURE__ */ jsxRuntime.jsxs("span", {
    children: [
      props.type ? /* @__PURE__ */ jsxRuntime.jsx("button", {
        get title() {
          return props.title;
        },
        get type() {
          return props.type;
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
        children: /* @__PURE__ */ jsxRuntime.jsx(qwik.Slot, {}, "4e_0"),
        [qwik._IMMUTABLE]: {
          title: qwik._wrapSignal(props, "title"),
          type: qwik._wrapSignal(props, "type")
        }
      }) : null,
      !props.type ? /* @__PURE__ */ jsxRuntime.jsx("a", {
        get href() {
          return props.href;
        },
        get target() {
          return props.target;
        },
        get title() {
          return props.title;
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
        children: /* @__PURE__ */ jsxRuntime.jsx(qwik.Slot, {}, "4e_1"),
        [qwik._IMMUTABLE]: {
          href: qwik._wrapSignal(props, "href"),
          target: qwik._wrapSignal(props, "target"),
          title: qwik._wrapSignal(props, "title")
        }
      }) : null
    ],
    [qwik._IMMUTABLE]: {
      children: false
    }
  });
}, "Button_component_jwTrOIKffNo"));
const Card = /* @__PURE__ */ qwik.componentQrl(qwik.inlinedQrl((props) => {
  const state = qwik.useStore({
    fill: "solid",
    radius: "md",
    theme: "#ffffff"
  });
  qwik.useClientEffectQrl(qwik.inlinedQrl(() => {
    const [props2, state2] = qwik.useLexicalScope();
    state2.theme = props2.theme || "#ffffff";
    state2.fill = props2.fill || "solid";
    state2.radius = props2.radius || "md";
  }, "Card_component_useClientEffect_bzglMgs8FMU", [
    props,
    state
  ]));
  return /* @__PURE__ */ jsxRuntime.jsx("div", {
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
    children: /* @__PURE__ */ jsxRuntime.jsx(qwik.Slot, {}, "1Z_0")
  });
}, "Card_component_fcVV86NUvws"));
const onInput = function onInput2(props, state, formRef, event) {
  (async function() {
    const saveCache = async function() {
      localStorage.setItem(props?.cacheKey, JSON.stringify(props?.formData));
    };
    const setFilteredValue = async function(key, value) {
      let newValue = value;
      const filters = (typeof props?.filterData === "string" ? props?.filterData?.split?.(",") : props?.filterData) || [];
      for (const filter of filters) {
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
    if (event?.target?.name?.length && !event?.target?.name?.startsWith?.("ion-")) {
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
const Form = /* @__PURE__ */ qwik.componentQrl(qwik.inlinedQrl((props) => {
  const formRef = qwik.useRef();
  const state = qwik.useStore({
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
  qwik.useClientEffectQrl(qwik.inlinedQrl(() => {
    const [formRef2, props2, state2] = qwik.useLexicalScope();
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
    const ref = formRef2?.current;
    if (ref?.addEventListener)
      state2.eventListeners.map((eventName) => ref.addEventListener(eventName, onInput.bind(null, props2, state2, formRef2).bind(void 0)));
  }, "Form_component_useClientEffect_ovQspWult0Q", [
    formRef,
    props,
    state
  ]));
  qwik.useCleanupQrl(qwik.inlinedQrl(() => {
    const [formRef2, props2, state2] = qwik.useLexicalScope();
    const ref = formRef2?.current;
    if (ref)
      (props2?.eventListeners || []).map((eventName) => ref.removeEventListener(eventName, onInput.bind(null, props2, state2, formRef2).bind(void 0)));
  }, "Form_component_useCleanup_2kQsJPLKJU4", [
    formRef,
    props,
    state
  ]));
  return /* @__PURE__ */ jsxRuntime.jsxs("form", {
    "preventdefault:submit": true,
    ref: formRef,
    onSubmit$: qwik.inlinedQrl((event) => {
      const [formRef2, props2, state2] = qwik.useLexicalScope();
      submit(props2, state2, formRef2, event);
    }, "Form_component_form_onSubmit_k2bBtMKRO4w", [
      formRef,
      props,
      state
    ]),
    action: props?.action,
    method: props?.method,
    children: [
      /* @__PURE__ */ jsxRuntime.jsx(qwik.Slot, {}, "bB_0"),
      !props.hideControls ? /* @__PURE__ */ jsxRuntime.jsxs("div", {
        class: "form-controls",
        style: {
          display: "flex",
          justifyContent: "space-between"
        },
        children: [
          state.resetButton ? /* @__PURE__ */ jsxRuntime.jsx(Button, {
            type: "reset",
            get theme() {
              return state.resetButtonTheme;
            },
            get fill() {
              return state.resetButtonFill;
            },
            get radius() {
              return state.resetButtonRadius;
            },
            children: qwik._wrapSignal(state, "resetButton"),
            [qwik._IMMUTABLE]: {
              type: qwik._IMMUTABLE,
              theme: qwik._wrapSignal(state, "resetButtonTheme"),
              fill: qwik._wrapSignal(state, "resetButtonFill"),
              radius: qwik._wrapSignal(state, "resetButtonRadius")
            }
          }, "bB_1") : null,
          state.submitButton ? /* @__PURE__ */ jsxRuntime.jsx(Button, {
            type: "submit",
            get theme() {
              return state.submitButtonTheme;
            },
            get fill() {
              return state.submitButtonFill;
            },
            get radius() {
              return state.submitButtonRadius;
            },
            children: qwik._wrapSignal(state, "submitButton"),
            [qwik._IMMUTABLE]: {
              type: qwik._IMMUTABLE,
              theme: qwik._wrapSignal(state, "submitButtonTheme"),
              fill: qwik._wrapSignal(state, "submitButtonFill"),
              radius: qwik._wrapSignal(state, "submitButtonRadius")
            }
          }, "bB_2") : null
        ],
        [qwik._IMMUTABLE]: {
          children: false
        }
      }) : null
    ],
    [qwik._IMMUTABLE]: {
      children: false
    }
  });
}, "Form_component_CwLNmA5ArhY"));
const Input = /* @__PURE__ */ qwik.componentQrl(qwik.inlinedQrl((props) => {
  qwik.useStylesScopedQrl(qwik.inlinedQrl(STYLES, "Input_component_useStylesScoped_jMAqgF0O2b0"));
  const inputRef = qwik.useRef();
  qwik.useStore({
    value: props?.value
  });
  return /* @__PURE__ */ jsxRuntime.jsxs("div", {
    class: "input-wrapper",
    style: {
      display: props?.labelPosition !== "stacked" ? "flex" : "block"
    },
    children: [
      props?.label ? /* @__PURE__ */ jsxRuntime.jsx("label", {
        "data-for": props?.for || props?.name || props?.label,
        children: qwik._wrapSignal(props, "label")
      }) : null,
      /* @__PURE__ */ jsxRuntime.jsx("input", {
        class: "input-Input",
        id: props?.for || props?.name || props?.label,
        name: props?.name,
        accept: props?.accept,
        value: props?.value,
        checked: props?.checked,
        form: props?.form,
        formAction: props?.formaction,
        formEncType: props?.formenctype,
        formMethod: props?.formmethod,
        formNoValidate: props?.formnovalidate,
        formTarget: props?.formtarget,
        height: props?.height,
        alt: props?.alt,
        list: props?.list,
        max: props?.max,
        min: props?.min,
        maxLength: props?.maxlength,
        multiple: props?.multiple,
        pattern: props?.pattern,
        ref: inputRef,
        placeholder: props?.placeholder,
        readOnly: props?.readonly,
        size: props?.size,
        src: props?.src,
        step: props?.step,
        type: props?.type || "text",
        width: props?.width
      })
    ],
    [qwik._IMMUTABLE]: {
      children: false
    }
  });
}, "Input_component_rRnC5C5yQfA"));
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
const Item = /* @__PURE__ */ qwik.componentQrl(qwik.inlinedQrl((props) => {
  qwik.useClientEffectQrl(qwik.inlinedQrl(() => {
  }, "Item_component_useClientEffect_CuVdIvRb5BE"));
  return /* @__PURE__ */ jsxRuntime.jsx("li", {
    class: "item-wrapper",
    children: /* @__PURE__ */ jsxRuntime.jsx(qwik.Slot, {}, "bk_0")
  });
}, "Item_component_rPrm2UPpz18"));
const List = /* @__PURE__ */ qwik.componentQrl(qwik.inlinedQrl((props) => {
  return /* @__PURE__ */ jsxRuntime.jsxs("span", {
    children: [
      props.ordered ? /* @__PURE__ */ jsxRuntime.jsx("ol", {
        style: {
          "list-style-type": `${props.listType ? props.listType : "decimal"}`
        },
        children: /* @__PURE__ */ jsxRuntime.jsx(Item, {
          children: /* @__PURE__ */ jsxRuntime.jsx(qwik.Slot, {}, "mt_0")
        }, "mt_1")
      }) : null,
      !props.ordered ? /* @__PURE__ */ jsxRuntime.jsx("ul", {
        style: {
          "list-style-type": `${props.listType ? props.listType : "none"}`
        },
        children: /* @__PURE__ */ jsxRuntime.jsx(Item, {
          children: /* @__PURE__ */ jsxRuntime.jsx(qwik.Slot, {}, "mt_2")
        }, "mt_3")
      }) : null
    ],
    [qwik._IMMUTABLE]: {
      children: false
    }
  });
}, "List_component_wBF3tdF4TP8"));
const Checkbox = /* @__PURE__ */ qwik.componentQrl(qwik.inlinedQrl((props) => {
  qwik.useClientEffectQrl(qwik.inlinedQrl(() => {
  }, "Checkbox_component_useClientEffect_KYg64ip0DDY"));
  return /* @__PURE__ */ jsxRuntime.jsxs(Item, {
    children: [
      /* @__PURE__ */ jsxRuntime.jsx("input", {
        type: "checkbox"
      }),
      /* @__PURE__ */ jsxRuntime.jsx("label", {
        children: qwik._wrapSignal(props, "label")
      }),
      /* @__PURE__ */ jsxRuntime.jsx(qwik.Slot, {}, "Je_0")
    ]
  }, "Je_1");
}, "Checkbox_component_oMcBk8lYh3c"));
const Checklist = /* @__PURE__ */ qwik.componentQrl(qwik.inlinedQrl((props) => {
  const state = qwik.useStore({
    theme: `blue`
  });
  qwik.useClientEffectQrl(qwik.inlinedQrl(() => {
    const [props2, state2] = qwik.useLexicalScope();
    state2.theme = props2.theme || `blue`;
  }, "Checklist_component_useClientEffect_x77026zjhQM", [
    props,
    state
  ]));
  return /* @__PURE__ */ jsxRuntime.jsx(Checkbox, {
    get label() {
      return props.label;
    },
    [qwik._IMMUTABLE]: {
      label: qwik._wrapSignal(props, "label")
    }
  }, "tS_0");
}, "Checklist_component_LqOpoSjwNPE"));
exports.Button = Button;
exports.Card = Card;
exports.Checkbox = Checkbox;
exports.Checklist = Checklist;
exports.Form = Form;
exports.Input = Input;
exports.List = List;
