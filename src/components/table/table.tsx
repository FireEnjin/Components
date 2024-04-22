import {
  Component,
  Event,
  EventEmitter,
  Listen,
  Method,
  Prop,
  State,
  h,
} from "@stencil/core";
import pathToValue from "../../helpers/pathToValue";
import { FireEnjinFetchEvent, FireEnjinSubmitEvent } from "@fireenjin/sdk";
import valueToPath from "../../helpers/valueToPath";
import { debounce } from "typescript-debounce-decorator";

@Component({
  tag: "fireenjin-table",
  styleUrl: "table.css",
  shadow: true,
})
export class Table {
  @Prop() rows: any[];
  @Prop() columns: {
    label?: string;
    name?: string;
    key?: string;
    placeholder?: string;
    disabled?: boolean;
    type?:
      | "file"
      | "string"
      | "boolean"
      | "number"
      | "phone"
      | "tel"
      | "select"
      | "photo";
    options?: any;
  }[];
  @Prop() fetch?: boolean | string;
  @Prop() fetchParams?: any;
  @Prop() edit? = false;
  @Prop() showDelete? = false;
  @Prop() deleteEndpoint?: string;
  @Prop() deleteButtonAttrs: any = {
    fill: "clear",
    color: "danger",
    size: "small",
  };
  @Prop() resultsKey?: string;
  @Prop() endpoint?: string;
  @Prop() editEndpoint?: string;
  @Prop() rowId = "id";
  @Prop({ mutable: true }) loading = false;

  @State() error: string;

  @Event() fireenjinFetch: EventEmitter<FireEnjinFetchEvent>;
  @Event() fireenjinSubmit: EventEmitter<FireEnjinSubmitEvent>;

  @Listen("fireenjinError")
  onError(event) {
    if (
      this.fetch &&
      [this.fetch, this.endpoint].includes(event?.detail?.endpoint)
    ) {
      this.loading = false;
      this.error = event?.detail?.error?.message;
    }
  }

  @Listen("fireenjinSuccess")
  onSuccess(event) {
    if ([this.fetch, this.endpoint].includes(event?.detail?.endpoint)) {
      this.rows = pathToValue(event?.detail?.data || {}, this.resultsKey);
      this.loading = false;
    }
  }

  @Listen("ionChange")
  @debounce(1000)
  onChange(event) {
    const closestTrEl = event.target.closest("tr");
    if (this.endpoint && closestTrEl?.dataset?.id) {
      const data = {};
      valueToPath(event.target.name, event.target.value, data);
      this.fireenjinSubmit.emit({
        endpoint: this.editEndpoint || this.endpoint,
        id: closestTrEl?.dataset?.id,
        data,
      });
    }
  }

  @Method()
  async fetchData({
    endpoint,
    params,
  }: { endpoint?: string; params?: any } = {}) {
    this.loading = true;
    this.fireenjinFetch.emit({
      endpoint:
        endpoint ||
        (typeof this.fetch === "string" ? this.fetch : this.endpoint),
      params: params || this.fetchParams,
    });
  }

  deleteRow(event: Event, row: any) {
    event.preventDefault();
    event.stopPropagation();
    if (!confirm("Are you sure you want to delete?"))
      this.fireenjinSubmit.emit({
        endpoint: this.deleteEndpoint || this.endpoint,
        id: row?.[this.rowId],
      });
  }

  componentDidLoad() {
    if (this.fetch) this.fetchData();
  }

  render() {
    return (
      <div class="table-responsive">
        {this.error && <ion-text color="danger">{this.error}</ion-text>}
        <table class="table">
          <thead>
            <tr>
              {(this.columns || []).map((column) => (
                <td>{column?.label}</td>
              ))}
            </tr>
          </thead>
          <tbody
            class={{
              "is-loading": this.loading,
            }}
          >
            {(this.rows || []).map((row) => (
              <tr data-id={row?.[this.rowId]}>
                {(this.columns || []).map((column) => (
                  <td style={{ padding: this.edit ? "0" : null }}>
                    {this.edit ? (
                      column?.type === "select" ? (
                        <fireenjin-select
                          lines="none"
                          name={column?.name || column?.key}
                          placeholder={column?.placeholder}
                          disabled={column?.disabled}
                          value={pathToValue(row, column?.key)}
                          options={column?.options}
                        />
                      ) : column?.type === "boolean" ? (
                        <fireenjin-toggle
                          name={column?.name || column?.key}
                          lines="none"
                          value={pathToValue(row, column?.key)}
                        />
                      ) : column?.type === "photo" ? (
                        <fireenjin-input-photo
                          name={column?.name || column?.key}
                          disabled={column?.disabled}
                          value={pathToValue(row, column?.key)}
                        />
                      ) : column?.type === "file" ? (
                        <fireenjin-input-file
                          label={column?.label}
                          defaultValue={column?.placeholder}
                          name={column?.name || column?.key}
                          disabled={column?.disabled}
                          value={pathToValue(row, column?.key)}
                        />
                      ) : (
                        <fireenjin-input
                          lines="none"
                          name={column?.name || column?.key}
                          placeholder={column?.placeholder}
                          disabled={column?.disabled}
                          type={column?.type}
                          value={pathToValue(row, column?.key)}
                        />
                      )
                    ) : (
                      pathToValue(row, column?.key)
                    )}
                  </td>
                ))}
                {this.showDelete && (
                  <td>
                    <ion-button
                      onClick={(event) => this.deleteRow(event, row)}
                      {...this.deleteButtonAttrs}
                    >
                      <ion-icon
                        color={this.deleteButtonAttrs?.color}
                        slot="icon-only"
                        name={this.deleteButtonAttrs?.icon || "trash"}
                      />
                    </ion-button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
