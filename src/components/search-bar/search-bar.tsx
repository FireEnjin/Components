import { FireEnjinTriggerInput } from "@fireenjin/sdk";
import {
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
  filterNameToIndex: { [name: string]: number } = {};

  @Event() fireenjinTrigger: EventEmitter<FireEnjinTriggerInput>;
  @Prop({ mutable: true }) filters?: FilterControl[];
  @Prop() paginationEl: any;
  @Prop() modeToggle = false;
  @Prop() disabled = false;
  @Prop() beforeGetResults: any;
  @Prop({
    mutable: true,
  })
  showFilter = true;

  @State() fetchData: any;

  @Watch("filters")
  onFiltersChange() {
    for (const [index, filter] of (this.filters || []).entries()) {
      this.filterNameToIndex[filter?.name] = index;
    }
  }

  @Listen("fireenjinTrigger")
  async onTrigger(event) {
    if (
      event?.detail?.name === "set" &&
      event?.detail?.payload?.name &&
      !event?.detail?.payload?.clear
    ) {
      const fetchData = this.paginationEl.fetchData || {};
      const filters = this.filters || [];
      filters[this.filterNameToIndex[event?.detail?.payload?.name]].value =
        event?.detail?.payload?.value || null;
      fetchData[event?.detail?.payload?.name] =
        event?.detail?.payload?.value || null;
      this.filters = filters;
      this.fetchData = fetchData;
      if (this.paginationEl) this.paginationEl.fetchData = fetchData;
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
  async clearFilter(event, clearingControl: FilterControl) {
    event.preventDefault();
    event.stopPropagation();
    if (this.paginationEl?.clearParamData)
      await this.paginationEl.clearParamData(clearingControl?.name);
    const fetchData = this.paginationEl?.fetchData || {};
    if (fetchData[clearingControl?.name])
      delete fetchData[clearingControl.name];
    const filters = this.filters || [];
    filters[this.filterNameToIndex[clearingControl?.name]].value = null;
    this.filters = filters;
    this.fetchData = fetchData;
    this.fireenjinTrigger.emit({
      event,
      name: "set",
      payload: {
        clear: true,
        name: clearingControl.name,
        value: null,
      },
    });
    let fetchOptions = {
      fetchData,
    };
    if (this.beforeGetResults && typeof this.beforeGetResults === "function")
      fetchOptions = await this.beforeGetResults(fetchOptions);
    if (this.paginationEl && !this.paginationEl?.disableFetch)
      this.paginationEl.fetchData = fetchData;
    if (this.paginationEl?.clearResults) await this.paginationEl.clearResults();
    if (this.paginationEl?.getResults)
      await this.paginationEl.getResults(fetchOptions);
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
                  outline={!this.filters?.[control?.name]?.value}
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
                  {control?.value && (
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
            {this.filters?.length && (
              <ion-badge slot="end">{this.filters?.length || 0}</ion-badge>
            )}
          </ion-button>
        )}
      </Host>
    );
  }
}
