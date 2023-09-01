import { Component, h, Method, Prop, State, Watch } from "@stencil/core";
import { debounce } from "typescript-debounce-decorator";
import { Control } from "../../typings";

@Component({
  tag: "fireenjin-input-logic",
})
export class InputLogic {
  popoverEl: any;
  leftInputEl: any;
  rightInputEl: any;
  leftSide: any = null;
  rightSide: any = null;
  comparableOperations: string[] = [
    "==",
    "===",
    "!=",
    "!==",
    "!",
    "!==",
    "!",
    "!!",
    ">",
    ">=",
    ">=",
    "<",
    "<=",
    "+",
    "-",
    "*",
    "/",
    "%",
  ];
  @Prop() name = "logic";
  @Prop() label = "Statements";
  @Prop()
  operations?: { [key: string]: any } = {
    var: { var: "" },
    missing: { missing: ["", ""] },
    missing_some: { missing_some: ["", [""]] },
    if: { if: ["", true, false] },
    "==": { "==": ["", ""] },
    "===": { "===": ["", ""] },
    "!=": { "!=": ["", ""] },
    "!==": { "!==": ["", ""] },
    "!": { "!": ["", ""] },
    "!!": { "!!": ["", ""] },
    or: { or: [] },
    and: { and: [] },
    ">": { ">": [1, 0] },
    ">=": { ">=": [1, 0] },
    "<": { "<": [0, 1] },
    "<=": { "<=": [0, 1] },
    min: { min: [0, 1] },
    max: { max: [0, 1] },
    "+": { "+": [0, 1] },
    "-": { "-": [0, 1] },
    "*": { "*": [0, 1] },
    "/": { "/": [0, 1] },
    "%": { "%": [0, 1] },
    map: { map: [{ var: "" }, {}] },
    filter: { filter: [{ var: "" }, {}] },
    reduce: {
      reduce: [
        { var: "" },
        { "+": [{ var: "current" }, { var: "accumulator" }] },
        0,
      ],
    },
    all: { all: [[1, 2, 3], { ">": [{ var: "" }, 0] }] },
    some: { some: [[-1, 0, 1], { ">": [{ var: "" }, 0] }] },
    none: { none: [[-3, -2, -1], { ">": [{ var: "" }, 0] }] },
    merge: {
      merge: [
        [1, 2],
        [3, 4],
      ],
    },
    in: { in: ["", [""]] },
    cat: { cat: ["", ""] },
    substr: { substr: ["", 0] },
    log: { log: "" },
  };
  @Prop({ mutable: true }) joinBy: "and" | "or" = "and";
  @Prop({ mutable: true }) value: any =
    this.joinBy === "and" ? this.operations.and : this.operations.or;
  @Prop({ mutable: true }) selectedOperator: string = "==";
  @Prop() selectedType?: "string" | "number" | "variable";
  @Prop() variables: {
    [key: string]: Partial<Control>;
  } = {};
  @Prop({ mutable: true }) showCode = false;
  @Prop() allowAdding = false;
  @Prop() placeholder = "No statements added yet";

  @State() selectedOperation: any = this.operations[this.selectedOperator];
  @State() statements: any[] = [];
  @State() manualEdit = true;
  @State() showAddForm = false;

  @Watch("value")
  onValueChange() {
    this.statements = this.value[this.joinBy] || [];
  }

  @Method()
  async addStatment(statement: any) {
    this.statements = [...this.statements, statement];
    this.value = {
      [this.joinBy]: this.statements,
    };
  }

  @Method()
  async removeStatement(index: number) {
    this.statements = this.statements.filter((_statement, i) => i !== index);
    this.value = {
      [this.joinBy]: this.statements,
    };
  }

  @Method()
  async toggleManualEdit() {
    this.manualEdit = !this.manualEdit;
  }

  async updateSelectedOperation() {
    const [operationKey] = Object.keys(this.selectedOperation);
    this.selectedOperation = {
      ...this.selectedOperation,
      [operationKey]: [this.leftSide, this.rightSide],
    };
  }

  @debounce(2000)
  async leftAndRightFromSelectedOperation() {
    const [operationKey] = Object.keys(this.selectedOperation);
    const leftHandValue = this.selectedOperation[operationKey][0];
    this.leftSide =
      typeof leftHandValue === "string" &&
      (!leftHandValue.includes("{") || !leftHandValue.includes("["))
        ? leftHandValue
        : JSON.stringify(leftHandValue);
    this.leftInputEl.value = this.leftSide;
    const rightHandValue = this.selectedOperation[operationKey][1];
    this.rightSide =
      typeof rightHandValue === "string" &&
      (!rightHandValue.includes("{") || !rightHandValue.includes("["))
        ? rightHandValue
        : JSON.stringify(rightHandValue);
    this.rightInputEl.value = this.rightSide;
  }

  componentDidLoad() {
    setTimeout(() => {
      this.onValueChange();
      this.manualEdit = false;
    }, 1000);
  }

  render() {
    const selectedOperationJSON = JSON.stringify(
      this.selectedOperation,
      null,
      4
    );
    return [
      <fireenjin-code-editor
        style={{
          opacity: this.showCode ? "1" : "0",
          height: this.showCode ? "auto" : "0",
          minHeight: this.showCode ? "50px" : "0",
        }}
        autoExpand
        value={JSON.stringify(this.value, null, 4)}
        language="json"
        name={this.name}
      />,
      <ion-item-divider>
        <ion-buttons style={{ marginRight: "0.3rem" }} slot="start">
          <ion-button onClick={() => (this.showCode = !this.showCode)}>
            <ion-icon slot="icon-only" name="code" />
          </ion-button>
        </ion-buttons>
        <ion-label>{this.label}</ion-label>
        <ion-select
          slot="end"
          name="join"
          interface="popover"
          value={this.joinBy}
          onIonChange={(event: any) => {
            this.joinBy = event.target.value;
            this.value = {
              [this.joinBy]: this.statements,
            };
          }}
        >
          <ion-select-option>and</ion-select-option>
          <ion-select-option>or</ion-select-option>
        </ion-select>
      </ion-item-divider>,
      <ion-item>
        <div>
          {(this.statements || []).map((statement, index) => (
            <ion-chip>
              <ion-label innerHTML={JSON.stringify(statement)} />
              <ion-icon
                name="close-circle"
                onClick={() => this.removeStatement(index)}
              />
            </ion-chip>
          ))}
          {!this.statements?.length && (
            <ion-label>{this.placeholder}</ion-label>
          )}
        </div>
        <ion-chip
          slot="end"
          class="add-button"
          color="primary"
          onClick={async () => {
            if (!this.showAddForm) {
              this.showAddForm = true;
            } else {
              await this.updateSelectedOperation();
              this.addStatment(this.selectedOperation);
              this.showAddForm = false;
            }
          }}
        >
          <ion-label>Add</ion-label>
          <ion-icon name="add-circle" />
        </ion-chip>
      </ion-item>,
      this.showAddForm && (
        <ion-item>
          <ion-grid>
            <ion-row>
              <ion-col
                style={{
                  maxWidth: "50px",
                }}
              >
                <ion-button fill="clear" id="select-type">
                  <ion-icon
                    slot="icon-only"
                    name={
                      this.selectedType === "number"
                        ? "calculator"
                        : this.selectedType === "string"
                        ? "pencil"
                        : this.selectedType === "variable"
                        ? "list-circle"
                        : "color-wand"
                    }
                  />
                </ion-button>
                <ion-popover
                  keep-contents-mounted="true"
                  trigger="select-type"
                  dismissOnSelect
                >
                  <ion-content>
                    <ion-list>
                      <ion-item
                        href="#"
                        detail
                        onClick={() => (this.selectedType = null)}
                      >
                        Auto
                      </ion-item>
                      <ion-item
                        href="#"
                        detail
                        onClick={() => (this.selectedType = "string")}
                      >
                        String
                      </ion-item>
                      <ion-item
                        href="#"
                        detail
                        onClick={() => (this.selectedType = "number")}
                      >
                        Number
                      </ion-item>
                      <ion-item
                        href="#"
                        detail
                        onClick={() => (this.selectedType = "variable")}
                      >
                        Variable
                      </ion-item>
                    </ion-list>
                  </ion-content>
                </ion-popover>
              </ion-col>
              <ion-col>
                <ion-input
                  ref={(el) => (this.leftInputEl = el)}
                  style={{
                    minWidth: "200px",
                    display:
                      this.selectedType === "variable" ? "none" : "block",
                  }}
                  placeholder="Left Value"
                  onIonChange={async (event: any) => {
                    try {
                      this.leftSide =
                        typeof event?.target?.value !== "undefined"
                          ? JSON.parse(event.target.value)
                          : null;
                    } catch (e) {
                      console.log("Error parsing as JSON: ", e);
                      this.leftSide = event?.target?.value || null;
                    }
                    await this.updateSelectedOperation();
                  }}
                />
                <ion-select
                  interface="action-sheet"
                  interfaceOptions={{
                    header: "Select Variable",
                  }}
                  onIonChange={(event: any) => {
                    try {
                      this.leftSide =
                        typeof event?.target?.value !== "undefined"
                          ? JSON.parse(event.target.value)
                          : null;
                    } catch (e) {
                      console.log("Error parsing as JSON: ", e);
                      this.leftSide = event?.target?.value || null;
                    }
                  }}
                  style={{
                    minWidth: "200px",
                    display: this.selectedType === "variable" ? "flex" : "none",
                  }}
                  placeholder="Select Variable"
                >
                  {Object.entries(this.variables || {}).map(
                    ([key, control]) => (
                      <ion-select-option value={`{"var":"${key}"}`}>
                        {control?.label || key}
                      </ion-select-option>
                    )
                  )}
                </ion-select>
              </ion-col>
              <ion-col style={{ minWidth: "160px" }}>
                <ion-select
                  name="operator"
                  interface="popover"
                  value={this.selectedOperator}
                  onIonChange={(event: any) => {
                    this.selectedOperator = event.target.value;
                    this.selectedOperation =
                      this.operations[this.selectedOperator];
                  }}
                >
                  {Object.keys(this.operations || {})
                    .filter((value) =>
                      this.comparableOperations.includes(value)
                    )
                    .map((value) => (
                      <ion-select-option value={value}>
                        {value}
                      </ion-select-option>
                    ))}
                </ion-select>
              </ion-col>
              <ion-col>
                <ion-input
                  type={this.selectedType === "number" ? "number" : "text"}
                  ref={(el) => (this.rightInputEl = el)}
                  onIonChange={async (event: any) => {
                    try {
                      this.rightSide =
                        typeof event?.target?.value !== "undefined"
                          ? JSON.parse(event.target.value)
                          : null;
                    } catch (e) {
                      console.log("Error parsing as JSON: ", e);
                      this.rightSide = event?.target?.value || null;
                    }
                    await this.updateSelectedOperation();
                  }}
                  placeholder="Right Value"
                />
              </ion-col>
            </ion-row>
            <ion-row
              style={{
                opacity: this.manualEdit ? "1" : "0",
                height: this.manualEdit ? "auto" : "0",
              }}
            >
              <ion-col>
                <fireenjin-code-editor
                  onFireenjinCodeChange={(event) => {
                    if (
                      !this.manualEdit ||
                      event?.detail?.value === selectedOperationJSON
                    )
                      return;
                    try {
                      this.selectedOperation = JSON.parse(event.detail.value);
                      this.leftAndRightFromSelectedOperation();
                    } catch (e) {
                      console.log(
                        "Error parsing selected operation as JSON: ",
                        e
                      );
                    }
                  }}
                  autoExpand
                  value={selectedOperationJSON}
                  language="json"
                />
              </ion-col>
            </ion-row>
          </ion-grid>
        </ion-item>
      ),
    ];
  }
}
