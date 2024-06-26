import { FireEnjinFetchEvent, FireEnjinSubmitEvent } from "@fireenjin/sdk";
import {
  Component,
  ComponentInterface,
  Element,
  Event,
  EventEmitter,
  Listen,
  Method,
  Prop,
  h,
  Build,
  Watch,
} from "@stencil/core";
import localforage from "localforage";

@Component({
  tag: "fireenjin-form",
  styleUrl: "form.css",
})
export class Form implements ComponentInterface {
  formEl: HTMLFormElement;
  submitButtonEl: HTMLIonButtonElement;
  resetButtonEl: HTMLIonButtonElement;
  componentIsLoaded = false;

  @Element() fireenjinFormEl;

  /**
   * The name of the form used for ID and name
   */
  @Prop() name: string;
  /**
   * The data from the form being filled out
   */
  @Prop({ mutable: true }) formData: any = {};
  /**
   * What the save button says
   */
  @Prop() submitButton = "Save";
  /**
   * What size is the reset button
   */
  @Prop() submitButtonSize: "default" | "large" | "small";
  /**
   * What color the submit button is
   */
  @Prop() submitButtonColor = "primary";
  /**
   * What fill option to use for the submit button
   */
  @Prop() submitButtonFill: "clear" | "outline" | "solid" | "default" = "solid";
  /**
   * What shape is the submit button
   */
  @Prop() submitButtonShape?: "round";
  /**
   * What the reset button says
   */
  @Prop() resetButton = "Cancel";
  /**
   * What size is the reset button
   */
  @Prop() resetButtonSize: "default" | "large" | "small";
  /**
   * What color the reset button is
   */
  @Prop() resetButtonColor = "dark";
  /**
   * What fill option to use for the reset button
   */
  @Prop() resetButtonFill: "clear" | "outline" | "solid" | "default" = "clear";
  /**
   * What shape is the reset button
   */
  @Prop() resetButtonShape?: "round";
  /**
   * Should the form controls be hidden?
   */
  @Prop() hideControls = false;
  /**
   * The endpoint that form submission should link to
   */
  @Prop() endpoint: string;
  /**
   * The id of the document being edited
   */
  @Prop() documentId: string;
  /**
   * A method that runs before form submission to allow editing of formData
   */
  @Prop() beforeSubmit: (data: any, options?: any) => Promise<any>;
  /**
   * Should the form disable the loader on submit
   */
  @Prop() disableLoader = false;
  /**
   * Is the component currently loading
   */
  @Prop({ mutable: true }) loading = false;
  /**
   * Should the enter button binding be disabled
   */
  @Prop() disableEnterButton = false;
  /**
   * Should the form disable reset
   */
  @Prop() disableReset = false;
  /**
   * Confirm leaving the page when the form is filled
   */
  @Prop() confirmExit = false;
  /**
   * Has the form fields been changed
   */
  @Prop({
    mutable: true,
  })
  hasChanged = false;
  /**
   * The HTTP method to use when submitting the form
   */
  @Prop() method: string;
  /**
   * The action to use for the form
   */
  @Prop() action: string;
  /**
   * The collection to use for cache and firestore
   */
  @Prop() collection: string;
  /**
   * Emit the fetch event emitted when component loads
   */
  @Prop() fetch: string | boolean;
  /**
   * The fetch params
   */
  @Prop() fetchParams: any;
  /**
   * The map to bind data from fetch response to form data
   */
  @Prop() fetchDataMap: any;
  /**
   * The result key to use for formData
   */
  @Prop() fetchKey?: string;
  /**
   * A comma separated list or array of items to filter out for submission
   */
  // @Prop() filterData?: (string | ((value: any) => Promise<any> | any))[];
  @Prop() filterData?: any;
  /**
   * The localforage key name to store as
   */
  @Prop() cacheKey: string;
  /**
   * The Stencil Store to bind to
   */
  @Prop() store: { state: any; key: string };

  /**
   * Emitted on load with endpoint
   */
  @Event() fireenjinFetch: EventEmitter<FireEnjinFetchEvent>;
  /**
   * Emitted when the user resets the form
   */
  @Event() fireenjinReset: EventEmitter<{
    event;
    id: string;
    endpoint: string;
    data: any;
    name: string;
  }>;
  /**
   * Emitted when the user submits the form
   */
  @Event() fireenjinSubmit: EventEmitter<FireEnjinSubmitEvent>;
  /**
   * Emitted when a filed checks validation
   */
  @Event() fireenjinValidation: EventEmitter<{
    event;
    isValid: boolean;
    name: string;
  }>;

  @Watch("formData")
  onFormDataChange(newValue, oldValue) {
    if (
      JSON.stringify(this.orderObjectKeys(newValue)) ===
      JSON.stringify(this.orderObjectKeys(oldValue))
    )
      return;
    if (this.store?.state && this.store?.key)
      this.formData = { ...this.getByPath(this.store.state, this.store.key) };
    if (this.formData) this.setFormData(this.formData);
  }

  @Listen("keydown")
  handleKeyDown(ev: KeyboardEvent) {
    if (ev.key === "Enter" && this.disableEnterButton) {
      ev.preventDefault();
    }
  }

  @Listen("fireenjinCodeChange")
  @Listen("ionInput")
  @Listen("ionChange")
  @Listen("ionSelect")
  @Listen("input")
  @Listen("change")
  async onInput(event) {
    const name = event?.detail?.name || event?.target?.name;
    if (!name || name.startsWith("ion-")) return;
    const value =
      typeof event?.detail?.checked === "boolean"
        ? event.detail.checked
        : event?.detail?.value || event?.target?.value;
    this.setByPath(
      this.formData,
      name,
      this.filterData?.length
        ? await this.setFilteredValue(name, value)
        : value,
    );
    if (this.cacheKey) this.saveCache();
    if (this.componentIsLoaded && !this.hasChanged) this.hasChanged = true;
  }

  @Listen("fireenjinSuccess")
  async onSuccess(event) {
    if (
      this.fetch &&
      [this.endpoint, this.fetch].includes(event?.detail?.endpoint) &&
      event?.detail?.event?.type === "fireenjinFetch"
    ) {
      await this.setFormData(
        this.fetchKey
          ? this.fetchKey.split(".").reduce((o, i) => o[i], event.detail.data)
          : event?.detail?.data,
      );
      if (this.cacheKey || this.collection) this.restoreCache();
      this.loading = false;
    } else if ([this.endpoint, this.fetch].includes(event?.detail?.endpoint)) {
      this.loading = false;
    }
  }

  @Listen("fireenjinError")
  async onError(event) {
    if ([this.endpoint, this.fetch].includes(event?.detail?.endpoint)) {
      this.loading = false;
    }
  }

  /**
   * Clear the cache for the saved form
   */
  @Method()
  async clearCache() {
    return localforage.removeItem(this.cacheKey || this.collection);
  }

  /**
   * Save the formData to the local cache
   */
  @Method()
  async saveCache() {
    const data =
      this.collection && this.documentId
        ? {
            ...(((await localforage?.getItem?.(this.collection)) as any) || {}),
            [this.documentId]: this.formData,
          }
        : this.formData;
    return localforage.setItem(this.cacheKey || this.collection, data);
  }

  /**
   * Restore the formData from the local cache
   */
  @Method()
  async restoreCache() {
    const cacheData = await localforage.getItem(
      this.cacheKey || this.collection,
    );
    return this.setFormData(
      this.cacheKey ? cacheData : cacheData?.[this.documentId],
    );
  }

  /**
   * Emit fireenjinSubmit event with form data
   * @param event The form submit event
   */
  @Method()
  async submit(
    event?,
    options = {
      manual: false,
    },
  ) {
    if (event && !this.action && !this.method) event.preventDefault();
    await this.checkFormValidity();
    this.loading = !this.disableLoader;
    const data =
      this.beforeSubmit && typeof this.beforeSubmit === "function"
        ? await this.beforeSubmit(this.formData, options)
        : this.formData;
    if (this.store?.state && this.store?.key)
      this.setByPath(this.store.state, this.store.key, this.formData);
    this.fireenjinSubmit.emit({
      event,
      id: this.documentId,
      collection: this.collection,
      endpoint: this.endpoint,
      data: this.filterData?.length ? await this.filterFormData(data) : data,
      name: this.name,
    });
    this.hasChanged = false;
  }

  /**
   * Emit fireenjinReset event with form data
   * @param event The form reset event
   */
  @Method()
  async reset(event?) {
    if (!event) {
      this.formEl.reset();
      return false;
    }
    if (this.disableReset) {
      event.preventDefault();
    } else {
      this.formData = {};
      this.hasChanged = false;
    }
    this.fireenjinReset.emit({
      event,
      id: this.documentId,
      endpoint: this.endpoint,
      data: this.formData,
      name: this.name,
    });
  }

  @Method()
  async checkFormValidity(reportValidity = true) {
    let isValid = true;
    const inputEls = [].slice.call(this.formEl.querySelectorAll("[required]"));
    for (const inputEl of inputEls) {
      try {
        if (
          !(await inputEl.checkValidity(
            !reportValidity
              ? {
                  validationClassOptions: {
                    ignoreInvalid: true,
                  },
                }
              : null,
          ))
        ) {
          if (isValid && reportValidity) {
            await inputEl.reportValidity();
          }
          isValid = false;
        }
      } catch (error) {
        console.log(`${inputEl?.name} input not able to be validated!`, error);
      }
    }

    return isValid;
  }

  @Method()
  async reportFormValidity() {
    const isValid = await this.checkFormValidity(false);
    this.fireenjinValidation.emit({
      event,
      isValid,
      name: this.name,
    });

    if (this.submitButtonEl) {
      this.submitButtonEl.disabled = !isValid;
    }
  }

  @Method()
  async setFormData(data: any) {
    const fields = this.formEl.querySelectorAll("[data-fill]");
    fields.forEach((field: HTMLInputElement) => {
      const dataKey =
        field.dataset?.fill?.length > 0 ? field.dataset.fill : field.name;
      field.value = this.getByPath(data, dataKey);
    });
    this.formData = await this.mapFormData(this.fetchDataMap, data || {});
  }

  @Method()
  async fetchData() {
    this.fireenjinFetch.emit({
      endpoint: typeof this.fetch === "string" ? this.fetch : this.endpoint,
      name: this.name || null,
      collection: this.collection || null,
      dataPropsMap: this.fetchDataMap || null,
      method: "get",
      id: this.documentId,
      params: {
        ...(this.fetchParams ? this.fetchParams : {}),
        id: this.documentId,
      },
    });
  }

  orderObjectKeys(unordered: any) {
    return Object.keys(unordered)
      .sort()
      .reduce((obj, key) => {
        obj[key] = unordered[key];
        return obj;
      }, {});
  }

  async setFilteredValue(key: string, value: any) {
    let newValue = value;
    for (const filter of typeof this.filterData === "string"
      ? this.filterData.split(",")
      : this.filterData) {
      if (typeof filter !== "function") continue;
      const filterName = Object.getOwnPropertyDescriptors(filter)?.name?.value;
      if (!filterName || filterName !== key) continue;
      newValue = await filter(value);
    }
    return newValue;
  }

  async mapFormData(dataMap, data) {
    let newData = (typeof data === "string" && JSON.parse(data)) || data || {};
    if (dataMap) {
      const dataKeys = Object.keys(dataMap);
      for (const key of dataKeys) {
        if (dataMap[key]) {
          newData[dataMap[key]] = data[key];
        } else {
          newData = { ...newData, ...data[key] };
        }
      }
    }

    return newData;
  }

  async filterFormData(data?: any) {
    let filteredData = {};
    for (const filter of typeof this.filterData === "string"
      ? this.filterData.split(",")
      : this.filterData) {
      if (typeof filter === "string") {
        filteredData[filter] = data[filter];
      } else if (typeof filter === "function") {
        const key = Object.getOwnPropertyDescriptors(filter)?.name?.value;
        filteredData[key] = await filter(data[key]);
      }
    }

    return filteredData;
  }

  pick(sourceObject: any, keys: string[]) {
    const newObject = {};
    for (const key of keys) {
      if (!sourceObject?.[key]) continue;
      newObject[key] = sourceObject[key];
    }

    return newObject;
  }

  getByPath(o, s) {
    s = s.replace(/\[(\w+)\]/g, ".$1"); // convert indexes to properties
    s = s.replace(/^\./, ""); // strip a leading dot
    var a = s.split(".");
    for (var i = 0, n = a.length; i < n; ++i) {
      var k = a[i];
      if (k in o) {
        o = o[k];
      } else {
        return;
      }
    }
    return o;
  }

  isNumeric(value) {
    return /^-?\d+$/.test(value);
  }

  setByPath(obj, path, value) {
    const pList = path.split(".");
    const len = pList.length;
    for (let i = 0; i < len - 1; i++) {
      const nextElemIsArray = this.isNumeric(pList[i + 1]);
      const elem = pList[i];
      if (!obj[elem]) obj[elem] = nextElemIsArray ? [] : {};
      obj = obj[elem];
    }

    obj[pList[len - 1]] = value;
    return obj;
  }

  componentDidLoad() {
    if (!Build?.isBrowser) return;
    if (this.fetch) {
      this.fetchData();
      if (!this.disableLoader) this.loading = true;
    }
    if (this.store?.state && this.store?.key)
      this.formData = { ...this.getByPath(this.store.state, this.store.key) };
    if (this.cacheKey || this.collection) this.restoreCache();
    if (this.formData) this.setFormData(this.formData);
    this.componentIsLoaded = true;
  }

  render() {
    return (
      <form
        ref={(el) => (this.formEl = el as HTMLFormElement)}
        name={this.name}
        id={this.name}
        action={this.action ? this.action : `/${this.endpoint}`}
        method={this.method}
        onReset={(event) => this.reset(event)}
        onSubmit={(event) => this.submit(event)}
        class={{ "is-loading": this.loading }}
      >
        <slot />
        {!this.hideControls && (
          <ion-grid class="form-controls">
            <ion-row>
              <ion-col>
                {this.resetButton ? (
                  <ion-button
                    ref={(el) => (this.resetButtonEl = el)}
                    type="reset"
                    fill={this.resetButtonFill}
                    color={this.resetButtonColor}
                    innerHTML={this.resetButton}
                    shape={this.resetButtonShape}
                    size={this.resetButtonSize}
                  ></ion-button>
                ) : null}
              </ion-col>
              <ion-col>
                {this.submitButton ? (
                  <ion-button
                    ref={(el) => (this.submitButtonEl = el)}
                    type="submit"
                    color={this.submitButtonColor}
                    fill={this.submitButtonFill}
                    size={this.submitButtonSize}
                    innerHTML={this.submitButton}
                    shape={this.submitButtonShape}
                  />
                ) : null}
              </ion-col>
            </ion-row>
          </ion-grid>
        )}
      </form>
    );
  }
}
