import { FireEnjinFetchEvent, FireEnjinTriggerInput } from "@fireenjin/sdk";
import {
  Component,
  ComponentInterface,
  Event,
  EventEmitter,
  Listen,
  Method,
  Prop,
  State,
  Watch,
  h,
  Build,
} from "@stencil/core";

@Component({
  tag: "fireenjin-select-tags",
  styleUrl: "select-tags.css",
})
export class SelectTags implements ComponentInterface {
  choicesEl: any;
  itemEl: HTMLIonItemElement;
  inputEl: HTMLIonInputElement;

  @Event() ionChange: EventEmitter<{
    event;
    name: string;
    value: any;
  }>;
  @Event() fireenjinFetch: EventEmitter<FireEnjinFetchEvent>;
  @Event() fireenjinTrigger: EventEmitter<FireEnjinTriggerInput>;

  @Prop() disableFetch = false;
  @Prop() name = "tags";
  @Prop() label;
  @Prop() placeholder = "Select Tags";
  @Prop({ mutable: true }) value: any;
  @Prop({ mutable: true }) options: { label: string; value: any }[] = [];
  @Prop() required = false;
  @Prop() multiple: boolean;
  @Prop() duplicates = false;
  @Prop() disabled = false;
  @Prop() allowAdding: boolean | "custom" = false;
  @Prop() endpoint: string;
  @Prop() resultsKey: string;
  @Prop() limit = 15;
  @Prop() orderBy?: string;
  @Prop() orderDirection?: string;
  @Prop() dataPropsMap: any;
  @Prop({ mutable: true }) page? = 0;
  @Prop({ mutable: true }) results: any[] = [];
  @Prop() fetchData?: any;
  @Prop() query?: string;
  @Prop() lines: "full" | "inset" | "none";
  @Prop() labelPosition?: "stacked" | "fixed" | "floating" = "stacked";
  @Prop() addPrompt: string;
  @Prop() addIcon = "add-circle";

  @State() choices: any;
  @State() hasValue = false;
  @State() paramData: {
    query?: string;
    limit?: number;
    orderBy?: string;
    orderDirection?: "asc" | "desc";
    whereEqual?: string;
    whereLessThan?: string;
    whereLessThanOrEqual?: string;
    whereGreaterThan?: string;
    whereGreaterThanOrEqual?: string;
    whereArrayContains?: string;
    whereArrayContainsAny?: string;
    whereIn?: string;
    next?: string;
    back?: string;
  } = {};

  @Listen("fireenjinSuccess", { target: "body" })
  async onSuccess(event) {
    if (event.detail.name === "selectTags") {
      try {
        if (this.page === 0) {
          this.results = [];
        }
        this.page = event.detail?.data?.results?.page
          ? event.detail.data.results.page
          : this.page + 1;
        await this.addResults(event.detail.data.results);
      } catch (err) {
        console.log("Error updating results!");
      }
    }
  }

  @Listen("change")
  async onChange(event) {
    if (
      !event ||
      !event.detail ||
      !event.detail.value ||
      !this.options.length
    ) {
      return false;
    }

    if (this.multiple) {
      try {
        this.value = this.choices
          .getValue()
          .map(
            (choice) =>
              this.options.find((option) => option.value === choice.value).value
          );

        this.ionChange.emit({
          event,
          name: this.name,
          value: this.value,
        });
      } catch (error) {
        console.log("Error setting value");
      }
    } else {
      this.value = event.detail.value;
      this.ionChange.emit({
        event,
        name: this.name,
        value: this.value,
      });
    }
  }

  @Listen("keydown")
  async onKeyDown(event: any) {
    if (
      event.key === "Enter" &&
      this.allowAdding &&
      event.target?.value?.length >= 1
    ) {
      const value = event.target.value.toLocaleLowerCase();
      this.value = [...(this.value ? this.value : []), value];
      const option = {
        label: event.target.value,
        value,
        selected: true,
      };
      this.options.push(option);
      this.choices.setChoices([option]);
      this.choices.clearInput();
      this.ionChange.emit({
        event,
        name: this.name,
        value: this.value,
      });
    }
  }

  toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  @Method()
  async setValue(value) {
    try {
      this.choices.setChoiceByValue(value);
    } catch (error) {
      console.log("Error setting value...");
    }
  }

  @Method()
  async getChoices() {
    return this.choices;
  }

  @Watch("value")
  async onValueChange(newValue, oldValue) {
    if (!this.value || newValue === oldValue || !this.choices) return false;
    await this.setValue(this.value);
  }

  @Watch("options")
  async onOptionsChange(newValue, oldValue) {
    if (newValue === oldValue || !this.choices) return false;
    await this.choices.setChoices(newValue, this.value, this.label, true);
  }

  @Method()
  async clearParamData(key?: string) {
    if (key && this.paramData[key]) {
      const paramData = this.paramData;
      delete paramData[key];
      this.paramData = paramData;
    } else if (!key) {
      this.paramData = {};
    }

    return this.paramData;
  }

  @Method()
  async addResults(results: any[] = []) {
    this.results = [...this.results, ...results];
    this.options = this.results.map((result) => ({
      label: result.label
        ? result.label
        : result.name
        ? result.name
        : result.id
        ? result.id
        : null,
      value: result.value ? result.value : result.id ? result.id : null,
    }));
  }

  @Method()
  async clearResults() {
    this.page = 0;
    this.results = [];
  }

  @Method()
  async addTag() {
    this.fireenjinTrigger.emit({
      name: "newTag",
      payload: {},
    });
    if (window?.prompt && this.allowAdding !== "custom") {
      const value = prompt(
        this.addPrompt ||
          `What ${this.label || this.name} would you like to add?`
      );
      this.options = [
        ...this.options,
        { label: this.toTitleCase(value), value },
      ];
    }
  }

  @Method()
  async getResults(
    options: {
      page?: number;
      next?: boolean;
      limit?: number;
      paramData?: any;
    } = {}
  ) {
    this.paramData = {
      ...this.paramData,
      limit: options.limit ? options.limit : this.limit,
      orderBy: this.orderBy,
      orderDirection: this.orderDirection,
      ...(options?.paramData ? options.paramData : {}),
    };

    if (options.page) {
      this.page = options.page;
    }

    if (this.query?.length > 1) {
      this.paramData.query = this.query;
    }

    if (this.results?.length && this.results[this.results.length - 1]?.id) {
      this.paramData.next = this.results[this.results.length - 1].id;
    }

    this.fireenjinFetch.emit({
      name: "selectTags",
      endpoint: this.endpoint,
      dataPropsMap: this.dataPropsMap
        ? this.dataPropsMap
        : this.resultsKey
        ? { [this.resultsKey]: "results" }
        : null,
      disableFetch: this.disableFetch,
      params: {
        data: this.fetchData ? this.fetchData : this.paramData,
      },
    });
  }

  componentDidLoad() {
    if (!Build?.isBrowser) return;

    if (this.endpoint) {
      this.getResults();
    }

    if (!this.itemEl || !this.itemEl.shadowRoot) {
      return false;
    }
    (
      this.itemEl.shadowRoot.querySelector(".input-wrapper") as HTMLElement
    ).style.overflow = "visible";
  }

  render() {
    const OptionEl: any = "option";
    return (
      <ion-item ref={(el) => (this.itemEl = el)} lines={this.lines}>
        {this.label && (
          <ion-label position={this.labelPosition}>{this.label}</ion-label>
        )}
        <ion-select
          title={this.placeholder || this.name}
          disabled={this.disabled}
          multiple={this.multiple}
          name={this.name}
          value={this.value}
          ref={(el) => (this.choicesEl = el)}
        >
          <slot />
          {!this.multiple && this.placeholder ? (
            <OptionEl placeholder>{this.placeholder}</OptionEl>
          ) : null}
          {this.options.map((option) => (
            <ion-select-option value={option.value}>
              {option.label}
            </ion-select-option>
          ))}
        </ion-select>
        {this.allowAdding && (
          <ion-button
            slot="end"
            size="large"
            fill="clear"
            shape="round"
            onClick={() => this.addTag()}
          >
            <ion-icon slot="icon-only" name={this.addIcon} />
          </ion-button>
        )}
      </ion-item>
    );
  }
}
