import {
  Component,
  h,
  Listen,
  Method,
  Prop,
  State,
  Watch,
} from "@stencil/core";
import { debounce } from "typescript-debounce-decorator";
import { Control } from "../../typings";

@Component({
  tag: "fireenjin-input-logic",
})
export class InputLogic {
  selectEl: HTMLIonSelectElement;
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
  @Prop({ mutable: true }) joinBy?: "and" | "or" = null;
  @Prop({ mutable: true }) value: any;
  @Prop({ mutable: true }) selectedOperator: string = "==";
  @Prop() selectedType?: "string" | "number" | "variable";
  @Prop() variables: {
    [key: string]: Partial<Control>;
  } = {};
  @Prop({ mutable: true }) showCode = false;
  @Prop() allowAdding = false;
  @Prop() placeholder = "No statements added yet";
  @Prop() outputObject = false;

  @State() selectedOperation: any = this.operations[this.selectedOperator];
  @State() statements: any[] = [];
  @State() manualEdit = true;
  @State() showAddForm = false;

  @Listen("fireenjinCodeBlur")
  async onCodeBlur(event) {
    if (event?.target?.name !== this.name || !this.value) return;
    const value = event?.detail?.value;
    this.statements = this.getStatementsFromValue(value);
    this.value = typeof value === "string" ? JSON.parse(value) : value;
  }

  @Watch("value")
  onValueChange(value) {
    const statements = this.getStatementsFromValue(
      typeof value === "string" ? JSON.parse(value) : value
    );
    if (this.value === value && this.statements === statements) return;
    this.statements = statements;
  }

  @Method()
  async addStatment(statement: any) {
    this.statements = [
      ...this.statements,
      typeof statement === "string" ? JSON.parse(statement) : statement,
    ];
    this.value = this.constructStatmentChain();
  }

  @Method()
  async removeStatement(index: number) {
    this.statements = this.statements.filter((_statement, i) => i !== index);
    this.value = this.constructStatmentChain();
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

  getStatementsFromValue(value: any) {
    let statements = value || [];
    if (this.joinBy === "and") {
      statements = value?.if?.[0]?.and || [];
    } else if (this.joinBy === "or") {
      statements = value?.if?.[0]?.or || [];
    }

    return statements;
  }

  constructStatmentChain() {
    let statement = { ...this.operations?.if };
    if (this.joinBy === "and") {
      const and = { ...this.operations?.and };
      and.and = this.statements;
      statement.if[0] = and;
    } else if (this.joinBy === "or") {
      const or = { ...this.operations?.or };
      or.or = this.statements;
      statement.if[0] = or;
    } else {
      statement = this.statements;
    }
    return statement;
  }

  componentDidLoad() {
    if (typeof this.value === "string") this.value = JSON.parse(this.value);
    if (!this.value) this.value = this.constructStatmentChain();
    setTimeout(() => {
      if (this.value?.if?.[0]?.and) this.joinBy = "and";
      if (this.value?.if?.[0]?.or) this.joinBy = "or";
      if (this.value) this.onValueChange(this.value);
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
        outputObject={this.outputObject}
        value={
          typeof this.value === "string"
            ? this.value
            : JSON.stringify(this.value, null, 4)
        }
        language="json"
        name={this.name}
      />,
      <ion-item-divider>
        <ion-buttons style={{ marginRight: "0.3rem" }} slot="start">
          <ion-button
            shape="round"
            fill="outline"
            onClick={() => (this.showCode = !this.showCode)}
          >
            <ion-icon slot="icon-only" name="code" />
          </ion-button>
        </ion-buttons>
        <ion-label>{this.label}</ion-label>
        <span slot="end" style={{ display: "flex", alignItems: "center" }}>
          <ion-label>Join by:</ion-label>
          <ion-chip class="join-select" onClick={() => this.selectEl.click()}>
            <ion-select
              ref={(el) => (this.selectEl = el)}
              style={{ paddingLeft: "4px", pointerEvents: "none" }}
              name="join"
              interface="popover"
              value={this.joinBy}
              onIonChange={(event: any) => {
                this.joinBy = event.target.value;
                this.value = this.constructStatmentChain();
              }}
            >
              <ion-select-option value="and">And</ion-select-option>
              <ion-select-option value="or">Or</ion-select-option>
              <ion-select-option value={null}>None</ion-select-option>
            </ion-select>
          </ion-chip>
        </span>
      </ion-item-divider>,
      <ion-item>
        <fireenjin-chip-bar style={{ display: "flex", alignItems: "center" }}>
          {(this.statements || [])?.map?.((statement, index) => (
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
        </fireenjin-chip-bar>
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
                <fireenjin-select
                  lines="none"
                  interface="custom"
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
                  options={Object.entries(this.variables || {}).map(
                    ([key, control]) => ({
                      ...control,
                      label: control?.label || key,
                      value: control?.value || `{"var":"${key}"}`,
                    })
                  )}
                  optionEl={(option: Partial<Control>) => (
                    <ion-item
                      data-value={option?.value}
                      detail
                      style={{ cursor: "pointer" }}
                    >
                      <ion-label>
                        <h2>{option.label}</h2>
                        {option?.description ? (
                          <small>{option.description}</small>
                        ) : null}
                      </ion-label>
                    </ion-item>
                  )}
                />
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
              <ion-col style={{ maxWidth: "50px" }}>
                <ion-button
                  fill="clear"
                  onClick={() => this.toggleManualEdit()}
                >
                  <ion-icon slot="icon-only" name="create" />
                </ion-button>
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
