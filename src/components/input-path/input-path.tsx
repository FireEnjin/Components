import { Color } from "@ionic/core";
import { Component, h, Method, Prop, State } from "@stencil/core";

@Component({
  tag: "fireenjin-input-path",
})
export class InputPath {
  selectEl: HTMLFireenjinSelectElement;

  @Prop() name = "path";
  @Prop({ mutable: true }) value: any;
  @Prop() label: string;
  @Prop() labelPosition?: "stacked" | "fixed" | "floating";
  @Prop() disabled = false;
  @Prop() typeOptions: any[];
  @Prop() partOptions: any[];
  @Prop() addIcon = "add-circle";
  @Prop() addColor: Color = "primary";
  @Prop() deleteColor: Color = "danger";
  @Prop() deleteIcon = "close-circle";

  @State() manualEdit = false;
  @State() pathType: string;
  @State() pathPart: string | number;
  @State() pathChips: { type?: string; part?: string | number }[] = [];

  @Method()
  async toggleManualEdit() {
    this.manualEdit = !this.manualEdit;
  }

  @Method()
  async addPathChunk() {
    if (!this.pathChips?.length) this.pathChips = [];
    this.pathChips.push({
      type: this.pathType,
      part: this.pathPart,
    });
    this.value = this.pathChips
      .map(({ type, part }) => `${type}/${part}`)
      .join("/");
    return this.value;
  }

  @Method()
  async deletePathChunk(index: number) {
    this.pathChips.splice(index, 1);
    this.value = this.pathChips
      .map(({ type, part }) => `${type}/${part}`)
      .join("/");
    return this.value;
  }

  componentDidLoad() {
    // On Load
  }

  render() {
    return [
      (this.manualEdit && (
        <ion-item>
          {this.label && [
            <ion-label position={this.labelPosition}>
              <h2>{this.label}</h2>
            </ion-label>,
            <ion-input
              name={this.name}
              value={this.value}
              disabled={this.disabled}
            />,
          ]}
        </ion-item>
      )) || (
        <fireenjin-chip-bar>
          {this.pathChips?.map?.(({ type, part }, index) => (
            <ion-chip style={{ paddingRight: "0" }}>
              <ion-label>
                {type}/{part}
              </ion-label>
              <ion-button
                onClick={() => this.deletePathChunk(index)}
                color={this.deleteColor}
                fill="clear"
                shape="round"
                size="small"
              >
                <ion-icon name={this.deleteIcon} slot="icon-only" />
              </ion-button>
            </ion-chip>
          ))}
          <ion-chip
            style={{ display: "inline-flex", gap: "0.3rem", paddingRight: "0" }}
          >
            <fireenjin-select
              ref={(el) => (this.selectEl = el)}
              style={{ width: "0px", overflow: "hidden", opacity: "0" }}
              label="Path Type"
              options={this.typeOptions}
              onIonChange={(event) =>
                (this.pathType = event?.detail?.value || null)
              }
            />
            <span
              style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}
              onClick={() =>
                this.selectEl?.querySelector?.("ion-select")?.click?.()
              }
            >
              {this.pathType ? this.pathType : "Select Type"}
              <ion-icon name="chevron-down-circle" />
            </span>
            /
            <ion-input
              onIonInput={(event) =>
                (this.pathPart = event?.target?.value || null)
              }
              style={{ maxWidth: "100px" }}
            />
            <ion-button
              onClick={() => this.addPathChunk()}
              color={this.addColor}
              fill="clear"
              shape="round"
              size="small"
            >
              <ion-icon name={this.addIcon} slot="icon-only" />
            </ion-button>
          </ion-chip>
        </fireenjin-chip-bar>
      ),
    ];
  }
}
