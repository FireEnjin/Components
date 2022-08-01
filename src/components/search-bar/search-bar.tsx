import { FireEnjinTriggerInput } from "@fireenjin/sdk";
import {
  Build,
  Component,
  ComponentInterface,
  Event,
  EventEmitter,
  h,
  Host,
  Listen,
  Method,
  Prop,
  State,
  Watch,
} from "@stencil/core";
import { FilterControl } from "../../typings";

@Component({
  tag: "fireenjin-search-bar",
  styleUrl: "search-bar.css",
})
export class SearchBar implements ComponentInterface {
  @Event() fireenjinTrigger: EventEmitter<FireEnjinTriggerInput>;
  @Prop({ mutable: true }) filters?: FilterControl[];
  @Prop() paginationEl: any;
  @Prop() modeToggle = false;
  @Prop({
    mutable: true,
  })
  displayMode: "list" | "grid" = "grid";
  @Prop() disabled = false;
  @Prop() beforeGetResults: any;
  @Prop({
    mutable: true,
  })
  showFilter = true;

  @State() currentFilters: {
    [filterKey: string]: FilterControl;
  } = {};

  @Watch("filters")
  onFilterChange() {
    this.updateCurrentFilters();
  }

  @Listen("fireenjinTrigger", { target: "document" })
  async onTrigger(event) {
    if (event?.detail?.name === "set" && event?.detail?.payload?.name) {
      for (const [i, control] of this.filters.entries()) {
        if (!control?.name || event?.detail?.payload?.name !== control?.name)
          continue;
        const controlData = {
          ...control,
          value: event?.detail?.payload?.value || null,
        };
        this.filters[i] = controlData;
        this.currentFilters[control.name] = controlData;
        this.filters = [...this.filters];
        if (this.paginationEl && !this.paginationEl?.disableFetch)
          this.paginationEl.fetchData = {
            ...(this.paginationEl?.fetchData || {}),
            [control.name]: event?.detail?.payload?.value,
          };
      }
      if (!this.paginationEl?.clearResults || !this.paginationEl?.getResults)
        return;
      await this.paginationEl.clearResults();
      await this.paginationEl.getResults();
    }
  }

  @Listen("ionChange")
  async onChange(event) {
    if (!this.paginationEl?.clearParamData) return;
    if (event?.target?.name === "orderBy") {
      this.paginationEl.orderBy = event.detail.value;
    }
    if (event?.target?.tagName === "ION-SEARCHBAR") {
      await this.paginationEl.clearParamData("next");
      await this.paginationEl.clearParamData("back");
      await this.paginationEl.clearParamData("page");
      this.paginationEl.query = event.detail.value || "";
    }
  }

  @Method()
  async togglePaginationDisplay() {
    this.displayMode = this.displayMode === "grid" ? "list" : "grid";
    this.paginationEl.display = this.displayMode;
  }

  @Method()
  async clearFilter(event, clearingControl: FilterControl) {
    event.preventDefault();
    event.stopPropagation();
    const fetchData = this.paginationEl?.fetchData || {};
    for (const [i, control] of this.filters.entries()) {
      if (
        !control.name ||
        !control.value ||
        control.name !== clearingControl.name
      )
        continue;
      this.filters[i] = {
        ...control,
        value: null,
      };
      delete this.currentFilters[clearingControl.name];
      if (fetchData[control.name]) delete fetchData[control.name];
      this.filters = [...this.filters];
      if (!this.paginationEl?.clearParamData) continue;
      await this.paginationEl.clearParamData(control.name);
    }
    const paramData = {};
    for (const filter of Object.values(this.currentFilters)) {
      paramData[filter.name] = filter.value;
    }
    this.fireenjinTrigger.emit({
      event,
      name: "set",
      payload: {
        name: clearingControl.name,
        value: null,
      },
    });
    let options = { paramData };
    if (this.beforeGetResults && typeof this.beforeGetResults === "function")
      options = await this.beforeGetResults(options);
    if (this.paginationEl && !this.paginationEl?.disableFetch)
      this.paginationEl.fetchData = fetchData;
    if (this.paginationEl?.clearResults) await this.paginationEl.clearResults();
    if (this.paginationEl?.getResults)
      await this.paginationEl.getResults(options);
  }

  @Method()
  async updateCurrentFilters() {
    if (!this.filters) return;
    for (const control of this.filters) {
      if (!control?.value || this.currentFilters[control.name]) continue;
      this.currentFilters[control.name] = control;
      this.currentFilters = { ...this.currentFilters };
    }
  }

  getLabelForValue(control: FilterControl, value: any) {
    for (const option of control?.options || []) {
      if (option?.value !== value) continue;
      return option?.label ? option.label : option.value;
    }
  }

  getControlLabel(control: FilterControl) {
    const value = control?.value ? control.value : null;
    let label = value
      ? Array.isArray(value)
        ? value.map((val) => this.getLabelForValue(control, val)).join(", ")
        : this.getLabelForValue(control, value)
      : control.label;

    return label;
  }

  componentDidLoad() {
    if (!Build?.isBrowser) return;
    this.updateCurrentFilters();
  }

  render() {
    return (
      <Host>
        <div class="search-bar-wrapper">
          <ion-searchbar disabled={this.disabled} />
          <div class="chip-bowl">
            {this.showFilter &&
              this.filters?.length &&
              this.filters.map((control) => (
                <ion-chip
                  outline={!this.currentFilters?.[control?.name]?.value}
                  onClick={(event) =>
                    this.fireenjinTrigger.emit({
                      event,
                      name: "filter",
                      payload: {
                        control,
                      },
                    })
                  }
                >
                  {control?.icon && <ion-icon name={control.icon}></ion-icon>}
                  {control?.label && (
                    <ion-label>{this.getControlLabel(control)}</ion-label>
                  )}
                  {this.currentFilters?.[control?.name]?.value && (
                    <ion-icon
                      name="close-circle"
                      onClick={(event) => this.clearFilter(event, control)}
                    />
                  )}
                </ion-chip>
              ))}
          </div>
        </div>
        {this.filters?.length && (
          <ion-button
            onClick={() => (this.showFilter = !this.showFilter)}
            class="filter-button"
            size="small"
            fill="clear"
            shape="round"
            style={{ color: "var(--ion-text-color)" }}
          >
            <ion-icon name="funnel" slot="icon-only" />
            {Object.keys(this.currentFilters)?.length && (
              <ion-badge slot="end">
                {this.currentFilters
                  ? Object.keys(this.currentFilters).length
                  : 0}
              </ion-badge>
            )}
          </ion-button>
        )}
      </Host>
    );
  }
}
