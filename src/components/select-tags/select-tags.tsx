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
  h,
  Build,
} from "@stencil/core";

@Component({
  tag: "fireenjin-select-tags",
  styleUrl: "select-tags.css",
})
export class SelectTags implements ComponentInterface {
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
  @Prop({ mutable: true }) query?: string;
  @Prop() lines: "full" | "inset" | "none";
  @Prop() labelPosition?: "stacked" | "fixed" | "floating" = "stacked";
  @Prop() addPrompt: string;
  @Prop() addIcon = "add-circle";

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

  @Listen("keydown")
  async onKeyDown(event: any) {
    if (
      event.key === "Enter" &&
      this.allowAdding &&
      event.target?.value?.length >= 1
    ) {
      const value = event.target.value.toLocaleLowerCase();
      this.addTag(value, event);
    }
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
  async addTag(tag: string, event?: any) {
    if (!tag?.length) return;
    const value = tag.toLocaleLowerCase();
    if (!value.length) return;
    this.fireenjinTrigger.emit({
      name: "newTag",
      payload: {
        value,
      },
    });
    if (!(this.value || []).includes(value)) {
      const option = {
        label: value,
        value,
        selected: true,
      };
      this.options = [...(this.options ? this.options : []), option];
    }
    this.addValue(value, event);
    this.query = null;
    if (this.inputEl) this.inputEl.value = null;
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

  @Method()
  async addValue(value, event?: any) {
    this.value = [...new Set([...(this.value ? this.value : []), value])];
    this.ionChange.emit({
      event,
      name: this.name,
      value: this.value,
    });
  }

  @Method()
  async removeValue(value, event?: any) {
    this.value = (this.value || []).filter((val) => val !== value);
    this.ionChange.emit({
      event,
      name: this.name,
      value: this.value,
    });
  }

  @Method()
  async updateOptionsForValue() {
    const optionValues = (this.options || []).map((option) => option?.value);
    for (const value of this.value) {
      if (!optionValues.includes(value)) {
        this.options.push({
          label: value,
          value,
        });
      }
    }
    this.options = [...this.options];
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
    if (this.value?.length) {
      this.updateOptionsForValue();
    }
  }

  render() {
    return (
      <ion-item ref={(el) => (this.itemEl = el)} lines={this.lines}>
        {this.label && (
          <ion-label position={this.labelPosition}>{this.label}</ion-label>
        )}
        {this.allowAdding && (
          <ion-input ref={(el) => (this.inputEl = el)} value={this.query} />
        )}
        <div class="options-wrapper">
          <fireenjin-chip-bar>
            {this.allowAdding && (
              <ion-chip
                class="add-tag"
                onClick={(event) =>
                  this.addTag(this.inputEl?.value as string, event)
                }
              >
                Add
                <ion-icon name={this.addIcon} />
              </ion-chip>
            )}
            {(this.options || []).map((option) => (
              <ion-chip
                outline={!(this.value || []).includes(option?.value)}
                onClick={(event) =>
                  (this.value || []).includes(option?.value)
                    ? this.removeValue(option?.value, event)
                    : this.addValue(option?.value, event)
                }
              >
                {option?.label || ""}
                {(this.value || []).includes(option?.value) && (
                  <ion-icon name="close-circle" />
                )}
              </ion-chip>
            ))}
          </fireenjin-chip-bar>
        </div>
      </ion-item>
    );
  }
}
