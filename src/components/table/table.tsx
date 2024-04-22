import { Component, Event, EventEmitter, Listen, Prop, h } from "@stencil/core";
import pathToValue from "../../helpers/pathToValue";
import { FireEnjinSubmitEvent } from "@fireenjin/sdk";
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
  @Prop() edit = false;
  @Prop() showDelete = false;
  @Prop() deleteEndpoint: string;
  @Prop() deleteButtonAttrs: any = {
    fill: "clear",
    color: "danger",
    size: "small",
  };
  @Prop() endpoint?: string;
  @Prop() editEndpoint?: string;
  @Prop() rowId = "id";

  @Event() fireenjinSubmit: EventEmitter<FireEnjinSubmitEvent>;

  @Listen("ionChange")
  @debounce(1000)
  onChange(event) {
    console.log(event);
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

  deleteRow(event: Event, row: any) {
    event.preventDefault();
    event.stopPropagation();
    if (!confirm("Are you sure you want to delete?"))
      this.fireenjinSubmit.emit({
        endpoint: this.deleteEndpoint || this.endpoint,
        id: row?.[this.rowId],
      });
  }

  render() {
    return (
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              {(this.columns || []).map((column) => (
                <td>{column?.label}</td>
              ))}
            </tr>
          </thead>
          <tbody>
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
