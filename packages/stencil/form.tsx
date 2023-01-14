
> @fireenjin/components@2.0.0 compile:stencil
> mitosis compile -t stencil "./src/components/form/form.lite.tsx"

import { Component, Prop, h, State, Fragment } from "@stencil/core";

@Component({
  tag: "fireenjin-form",
})
export default class Form {
  @Prop() cacheKey: any;
  @Prop() children: any;
  @Prop() formData: any;
  @Prop() eventListeners: any;

  @State() formData = {};
  @State() hasChanged = false;
  @State() eventListeners = [
    "ionInput",
    "ionChange",
    "ionSelect",
    "input",
    "change",
    "fireenjinCodeChange",
  ];

  onInput(event) {
    void (async function () {
      const saveCache = async function () {
        localStorage.setItem(this.cacheKey, JSON.stringify(this.formData));
      };
      const setFilteredValue = async function (key, value) {
        let newValue = value;
        for (const filter of typeof this.filterData === "string"
          ? this.filterData.split(",")
          : this.filterData) {
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
          this.formData || {},
          event?.target?.name,
          this.filterData?.length
            ? await setFilteredValue(event?.target?.name, value)
            : value
        );
        if (this.cacheKey) await saveCache();
        if (!this.hasChanged) {
          this.hasChanged = true;
        }
      }
    })();
  }
  submit(event) {
    (event?.target || document).dispatchEvent(
      new CustomEvent("fireenjinSubmit", {
        bubbles: true,
        detail: {
          event,
          endpoint: this.action,
          data: this.formData || null,
        },
      })
    );
  }

  componentDidLoad() {
    if (this.formData) this.formData = this.formData;
    if (this.eventListeners) this.eventListeners = this.eventListeners;
    const ref =
      (formRef?.addEventListener && formRef) ||
      (formRef?.current?.addEventListener && formRef.current);
    if (ref?.addEventListener)
      this.eventListeners.map((eventName) =>
        ref.addEventListener(eventName, this.onInput.bind(this))
      );
  }
  disconnectedCallback() {
    const ref =
      (formRef?.addEventListener && formRef) ||
      (formRef?.current?.addEventListener && formRef.current);
    (this.eventListeners || []).map((eventName) =>
      ref.removeEventListener(eventName, this.onInput.bind(this))
    );
  }

  render() {
    return (
      <form
        ref={(el) => (this.formRef = el)}
        onSubmit={(event) => {
          event.preventDefault();
          this.submit(event);
        }}
        action={this.action}
        method={this.method}
      >
        {this.children}

        <button type="submit">Save</button>
      </form>
    );
  }
}

