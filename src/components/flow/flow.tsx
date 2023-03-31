import { Color } from "@ionic/core";
import {
  Component,
  Element,
  h,
  Listen,
  Method,
  Prop,
  State,
} from "@stencil/core";
import { Field, Step } from "../../typings";

@Component({
  tag: "fireenjin-flow",
  styleUrl: "flow.css",
})
export class Flow {
  slidesEl: any;
  formEl: HTMLFireenjinFormElement;
  currentStep: Step;
  currentIndex = 0;
  @Element() flowEl: HTMLFireenjinFlowElement;
  /**
   * The name of the form used for ID and name
   */
  @Prop() name: string;
  /**
   * The data from the form being filled out
   */
  @Prop({ mutable: true }) formData: any = {};
  /**
   * The next button for the slider
   */
  @Prop() nextButton: {
    expand?: "block" | "full";
    label?: string;
    color?: Color;
    fill?: "clear" | "outline" | "solid" | "default";
    icon?: string;
    iconSlot?: string;
    onClick?: (event) => void;
    disabled?: boolean;
    shape?: "round";
    size?: "default" | "small" | "large";
  } = {
    label: "Next",
    color: "primary",
    fill: "clear",
    icon: "chevron-forward-circle-outline",
  };
  /**
   * The prev button for the slider
   */
  @Prop() prevButton: {
    expand?: "block" | "full";
    label?: string;
    color?: Color;
    fill?: "clear" | "outline" | "solid" | "default";
    icon?: string;
    iconSlot?: string;
    onClick?: (event) => void;
    disabled?: boolean;
    shape?: "round";
    size?: "default" | "small" | "large";
  } = {
    label: "Back",
    color: "medium",
    fill: "clear",
    icon: "chevron-back-circle-outline",
  };
  /**
   * The save button for the flow
   */
  @Prop() saveButton: {
    expand?: "block" | "full";
    label?: string;
    color?: Color;
    fill?: "clear" | "outline" | "solid" | "default";
    icon?: string;
    iconSlot?: string;
    onClick?: (event) => void;
    disabled?: boolean;
    shape?: "round";
    size?: "default" | "small" | "large";
  } = {
    label: "Save",
    fill: "solid",
    color: "primary",
  };
  /**
   * Should the form controls be hidden?
   */
  @Prop({ mutable: true }) hideControls = false;
  /**
   * The endpoint that form submission should link to
   */
  @Prop() endpoint: string;
  /**
   * The id of the document being edited
   */
  @Prop() documentId: string;
  /**
   * The data to exclude from the form submit event
   */
  @Prop() excludeData: string[] = [];
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
  @Prop() method: string = "post";
  /**
   * The action to use for the form
   */
  @Prop() action: string;
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
  @Prop() filterData?: any;
  /**
   * A list of options for SwiperJS
   * @link https://swiperjs.com/swiper-api#parameters
   */
  @Prop() slidesOptions: any = { autoHeight: true, allowTouchMove: false };
  @Prop() pager = false;
  @Prop() scrollbar = false;
  @Prop() steps: Step[] = [];
  @Prop() googleMapsKey: string;
  @Prop() stripeKey: string;
  @Prop() stripeElements: any;
  @Prop() disableRequiredCheck = false;
  @Prop() cacheKey: string;

  @State() showSuccess = false;
  @State() showSave = false;

  @Listen("keydown")
  async onKeydown(event) {
    if (event?.key !== "Enter" || this.disableEnterButton) return;
    this.slideNext();
  }

  @Listen("ionSlideDidChange")
  async onSlideChange() {
    this.currentIndex = await this.getActiveIndex();
    this.currentStep = this.steps[this.currentIndex];
    if (this.currentIndex === this.steps.length - 1) {
      this.hideControls = true;
      this.showSave = true;
    } else {
      this.hideControls = false;
      this.showSave = false;
    }
    if (this.currentIndex === 0 && this.prevButton) {
      this.prevButton = { ...this.prevButton, disabled: true };
    } else {
      this.prevButton = { ...this.prevButton, disabled: false };
    }
  }

  @Listen("fireenjinSubmit")
  onSubmit(event) {
    if (event?.detail?.endpoint !== this.endpoint) return;
    this.showSuccess = false;
  }

  @Listen("fireenjinSuccess")
  onSuccess(event) {
    if (event?.detail?.endpoint !== this.endpoint) return;
    this.showSuccess = true;
  }

  @Method()
  async getActiveIndex() {
    return this.slidesEl.getActiveIndex();
  }

  @Method()
  async getSwiper() {
    return this.slidesEl.getSwiper();
  }

  @Method()
  async isBeginning() {
    return this.slidesEl.isBeginning();
  }

  @Method()
  async isEnd() {
    return this.slidesEl.isEnd();
  }

  @Method()
  async length() {
    return this.slidesEl.length();
  }

  @Method()
  async lockSwipeToNext(lock: boolean) {
    return this.slidesEl.lockSwipeToNext(lock);
  }

  @Method()
  async lockSwipeToPrev(lock: boolean) {
    return this.slidesEl.lockSwipeToPrev(lock);
  }

  @Method()
  async lockSwipes(lock: boolean) {
    return this.slidesEl.lockSwipes(lock);
  }

  @Method()
  async slideNext(speed?: number, runCallbacks?: boolean) {
    console.log(await this.checkStepValidity());
    if (!this.disableRequiredCheck && !(await this.checkStepValidity())) return;
    return this.slidesEl.slideNext(speed, runCallbacks);
  }

  @Method()
  async slidePrev(speed?: number, runCallbacks?: boolean) {
    if (this.hideControls) this.hideControls = false;
    return this.slidesEl.slidePrev(speed, runCallbacks);
  }

  @Method()
  async slideTo(index: number, speed?: number, runCallbacks?: boolean) {
    return this.slidesEl.slideTo(index, speed, runCallbacks);
  }

  @Method()
  async startAutoplay() {
    return this.slidesEl.startAutoplay();
  }

  @Method()
  async stopAutoplay() {
    return this.slidesEl.stopAutoplay();
  }

  @Method()
  async update() {
    return this.slidesEl.update();
  }

  @Method()
  async updateAutoHeight(speed?: number) {
    return this.slidesEl.updateAutoHeight(speed);
  }

  @Method()
  async reportFormValidity() {
    this.formEl.reportFormValidity();
  }

  @Method()
  async setFormData(data: any) {
    this.formEl.setFormData(data);
  }

  @Method()
  async checkFormValidity(reportValidity: boolean) {
    this.formEl.checkFormValidity(reportValidity);
  }

  @Method()
  async reset(event?: any) {
    this.formEl.reset(event);
    if (this.prevButton) this.prevButton.disabled = true;
  }

  @Method()
  async submit(event?: any, options?: any) {
    this.formEl.submit(event, options);
  }

  @Method()
  async checkStepValidity() {
    let response = true;
    await new Promise((resolve, reject) => {
      try {
        const requiredEls = this.flowEl.querySelectorAll(
          `ion-slide:nth-of-type(${this.currentIndex + 1}) [required]`
        );
        if (!requiredEls.length) resolve(true);
        (requiredEls || []).forEach((el: any, index) => {
          if (
            (typeof el?.reportValidity === "function" &&
              !el?.reportValidity()) ||
            (typeof el?.checkValidity === "function" && !el?.checkValidity()) ||
            el.value === null ||
            el.value === undefined ||
            (typeof el.value === "string" && el.value?.length <= 0)
          )
            response = false;
          if (index === requiredEls.length - 1) resolve(response);
        });
      } catch (e) {
        console.log(e);
        reject();
      }
    });

    return response;
  }

  componentWillLoad() {
    if (this.prevButton) this.prevButton.disabled = true;
  }

  renderField(field?: Field) {
    if (field?.type === "file") {
      return (
        <fireenjin-input-file
          path={field?.path}
          icon={field?.icon}
          label={field?.label}
          fileName={field?.fileName}
          name={field?.name}
          accept={field?.accept}
          defaultValue={field?.defaultValue}
          value={field?.value}
          documentId={field?.documentId}
          endpoint={field?.endpoint}
          uploadData={field?.uploadData}
          disabled={!!field?.disabled}
          innerHTML={field.innerHTML}
        />
      );
    } else if (field?.type === "photo") {
      return (
        <fireenjin-input-photo
          path={field?.path}
          fileName={field?.fileName}
          name={field?.name}
          value={field?.value}
          documentId={field?.documentId}
          endpoint={field?.endpoint}
          disabled={!!field?.disabled}
          fallback={field?.fallback}
          showButton={!!field?.showButton}
          buttonText={field?.buttonText}
          initials={field?.initials}
          multiple={!!field?.multiple}
          resize={!!field?.resize}
          loading={!!field?.loading}
          innerHTML={field.innerHTML}
        />
      );
    } else if (field?.type === "address") {
      return (
        <fireenjin-input-address
          googleMapsKey={field?.googleMapsKey || this.googleMapsKey}
          placeholder={field?.placeholder}
          value={field?.value}
          label={field?.label}
          required={!!field?.required}
          name={field?.name}
          lines={field?.lines}
          labelPosition={field?.labelPosition}
          innerHTML={field.innerHTML}
        />
      );
    } else if (field?.type === "select") {
      return (
        <fireenjin-select
          disabled={!!field?.disabled}
          cancelText={field?.cancelText}
          okText={field?.okText}
          placeholder={field?.placeholder}
          name={field?.name}
          selectedText={field?.selectedText}
          multiple={!!field?.multiple}
          interface={field?.interface}
          interfaceOptions={field?.interfaceOptions}
          compareWith={field?.compareWith}
          value={field?.value}
          endpoint={field?.endpoint}
          header={field?.header}
          subHeader={field?.subHeader}
          message={field?.message}
          orderBy={field?.orderBy}
          dataPropsMap={field?.dataPropsMap}
          optionEl={field?.optionEl}
          limit={field?.limit}
          params={field?.params}
          query={field?.query}
          label={field?.label}
          options={field?.options}
          required={!!field?.required}
          resultsKey={field?.resultsKey}
          labelPosition={field?.labelPosition}
          lines={field?.lines}
          innerHTML={field.innerHTML}
        />
      );
    } else if (field?.type === "radios") {
      return (
        <fireenjin-radios
          disabled={!!field?.disabled}
          name={field?.name}
          value={field?.value}
          endpoint={field?.endpoint}
          orderBy={field?.orderBy}
          dataPropsMap={field?.dataPropsMap}
          optionEl={field?.optionEl}
          limit={field?.limit}
          params={field?.params}
          query={field?.query}
          label={field?.label}
          options={field?.options}
          required={!!field?.required}
          resultsKey={field?.resultsKey}
          labelPosition={field?.labelPosition}
          lines={field?.lines}
          innerHTML={field.innerHTML}
        />
      );
    } else if (field?.type === "search") {
      return (
        <fireenjin-input-search
          name={field?.name}
          label={field?.label}
          placeholder={field?.placeholder}
          value={field?.value}
          required={!!field?.required}
          autofocus={!!field?.autofocus}
          disabled={!!field?.disabled}
          endpoint={field?.endpoint}
          dataPropsMap={field?.dataPropsMap}
          template={field?.template}
          searchParams={field?.searchParams}
          iconEnd={field?.iconRight}
          iconStart={field?.iconLeft}
          results={field?.results}
          resultsKey={field?.resultsKey}
          lines={field?.lines}
          labelPosition={field?.labelPosition}
          innerHTML={field.innerHTML}
        />
      );
    } else if (field?.type === "checklist") {
      return (
        <fireenjin-checklist
          name={field?.name}
          value={field?.value}
          options={field?.options || []}
          disabled={field?.disabled}
          innerHTML={field.innerHTML}
        />
      );
    } else {
      return (
        <fireenjin-input
          type={field?.type || "text"}
          stripeKey={field?.stripeKey || this.stripeKey}
          placeholder={field?.placeholder}
          label={field?.label}
          value={field?.value}
          required={!!field?.required}
          name={field?.name}
          autocomplete={field?.autocomplete}
          autocapitalize={field?.autocapitalize}
          autocorrect={field?.autocorrect}
          autofocus={field?.autofocus}
          minlength={field?.minlength}
          maxlength={field?.maxlength}
          disabled={!!field?.disabled}
          helperText={field?.helperText}
          errorText={field?.errorText}
          counter={!!field?.counter}
          counterFormatter={field?.counterFormatter}
          edit={!!field?.edit}
          min={field?.min}
          max={field?.max}
          silence={field?.silence}
          step={field?.step}
          actionOptions={field?.actionOptions}
          pattern={field?.pattern}
          clearInput={field?.clearInput}
          multiple={!!field?.multiple}
          readOnly={!!field?.readOnly}
          spellCheck={!!field?.spellCheck}
          inputMode={field?.inputMode}
          stripeElements={field?.stripeElements || this.stripeElements}
          lines={field?.lines}
          labelPosition={field?.labelPosition}
          innerHTML={field.innerHTML}
        />
      );
    }
  }

  render() {
    return (
      <fireenjin-form
        ref={(el) => (this.formEl = el)}
        name={this.name}
        formData={this.formData}
        submitButton={null}
        resetButton={null}
        documentId={this.documentId}
        endpoint={this.endpoint}
        hideControls={this.hideControls}
        filterData={this.filterData}
        beforeSubmit={this.beforeSubmit}
        disableLoader={this.disableLoader}
        loading={this.loading}
        disableEnterButton={true}
        confirmExit={this.confirmExit}
        hasChanged={this.hasChanged}
        method={this.method}
        action={this.action}
        fetch={this.fetch}
        fetchParams={this.fetchParams}
        fetchDataMap={this.fetchDataMap}
        fetchKey={this.fetchKey}
        cacheKey={this.cacheKey}
      >
        <ion-slides
          ref={(el) => (this.slidesEl = el)}
          pager={this.pager}
          options={this.slidesOptions}
          scrollbar={this.scrollbar}
          style={{
            transition: "all ease 0.5s",
            height: !this.showSuccess ? "auto" : "0",
            opacity: !this.showSuccess ? "1" : "0",
          }}
        >
          {(this.steps || []).map((step) => {
            const StepComponent = step?.component || null;
            return (
              <ion-slide>
                <div
                  style={{
                    width: "100%",
                  }}
                >
                  {step?.beforeHTML && <div innerHTML={step.beforeHTML} />}
                  {StepComponent && (
                    <StepComponent {...(step?.componentProps || {})} />
                  )}
                  {step?.innerHTML && <div innerHTML={step?.innerHTML} />}
                  {(step?.fields || []).map((field) => [
                    field?.beforeHTML && <div innerHTML={field.beforeHTML} />,
                    this.renderField(field),
                    field?.afterHTML && <div innerHTML={field.afterHTML} />,
                  ])}
                </div>
                {step?.afterHTML && <div innerHTML={step.afterHTML} />}
              </ion-slide>
            );
          })}
        </ion-slides>
        <div
          class="flow-controls control-pager"
          style={{
            display: this.hideControls ? "none" : "flex",
          }}
        >
          <ion-button
            style={
              !this.prevButton && {
                opacity: "0",
                pointerEvents: "none",
              }
            }
            expand={this.prevButton?.expand}
            shape={this.prevButton?.shape}
            disabled={!!this.prevButton?.disabled}
            color={this.prevButton?.color}
            fill={this.prevButton?.fill}
            size={this.prevButton?.size}
            onClick={(event) =>
              typeof this.prevButton?.onClick === "function"
                ? this.prevButton.onClick(event)
                : this.slidePrev()
            }
          >
            {this.prevButton?.icon && (
              <ion-icon
                slot={this.prevButton?.iconSlot || "start"}
                name={this.prevButton.icon}
              />
            )}
            {this.prevButton?.label && (
              <ion-label>{this.prevButton.label}</ion-label>
            )}
          </ion-button>
          <ion-button
            style={
              !this.nextButton && {
                opacity: "0",
                pointerEvents: "none",
              }
            }
            expand={this.nextButton?.expand}
            disabled={!!this.nextButton?.disabled}
            color={this.nextButton?.color}
            fill={this.nextButton?.fill}
            size={this.nextButton?.size}
            shape={this.nextButton?.shape}
            onClick={(event) =>
              typeof this.nextButton?.onClick === "function"
                ? this.nextButton.onClick(event)
                : this.slideNext()
            }
          >
            {this.nextButton?.icon && (
              <ion-icon
                slot={this.nextButton?.iconSlot || "end"}
                name={this.nextButton.icon}
              />
            )}
            {this.nextButton?.label && (
              <ion-label>{this.nextButton.label}</ion-label>
            )}
          </ion-button>
        </div>
        <div
          class="flow-controls control-confirmation"
          style={{
            display: this.showSave && !this.showSuccess ? "flex" : "none",
          }}
        >
          <ion-button
            style={
              !this.prevButton && {
                opacity: "0",
                pointerEvents: "none",
              }
            }
            expand={this.prevButton?.expand}
            disabled={!!this.prevButton?.disabled}
            color={this.prevButton?.color}
            fill={this.prevButton?.fill}
            size={this.prevButton?.size}
            shape={this.prevButton?.shape}
            onClick={(event) =>
              typeof this.prevButton?.onClick === "function"
                ? this.prevButton.onClick(event)
                : this.slidePrev()
            }
          >
            {this.prevButton?.icon && (
              <ion-icon
                slot={this.prevButton?.iconSlot || "start"}
                name={this.prevButton.icon}
              />
            )}
            {this.prevButton?.label && (
              <ion-label>{this.prevButton.label}</ion-label>
            )}
          </ion-button>
          <ion-button
            style={
              !this.saveButton && {
                opacity: "0",
                pointerEvents: "none",
              }
            }
            expand={this.saveButton?.expand || this.nextButton?.expand}
            disabled={!!this.saveButton?.disabled}
            color={this.saveButton?.color || this.nextButton?.color}
            fill={this.saveButton?.fill || this.nextButton?.fill}
            shape={this.nextButton?.shape ?? this.nextButton?.shape}
            type="submit"
            size={this.saveButton?.size || this.nextButton?.size}
            onClick={(event) =>
              typeof this.saveButton?.onClick === "function"
                ? this.saveButton.onClick(event)
                : null
            }
          >
            {this.saveButton?.icon && (
              <ion-icon
                slot={this.saveButton?.iconSlot || "end"}
                name={this.saveButton.icon}
              />
            )}
            {this.saveButton?.label && (
              <ion-label>{this.saveButton.label}</ion-label>
            )}
          </ion-button>
        </div>
        <div
          class="flow-success"
          style={{
            transition: "all ease 0.5s",
            height: this.showSuccess ? "auto" : "0",
            opacity: this.showSuccess ? "1" : "0",
          }}
        >
          <slot />
        </div>
      </fireenjin-form>
    );
  }
}
