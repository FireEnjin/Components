import { Component, h, Method, Prop } from "@stencil/core";
import { Field } from "../../typings";

@Component({
  tag: "fireenjin-flow",
  styleUrl: "flow.css",
})
export class flow {
  slidesEl: HTMLIonSlidesElement;

  /**
   * The name of the form used for ID and name
   */
  @Prop() name: string;
  /**
   * The data from the form being filled out
   */
  @Prop({ mutable: true }) formData: any = {};
  /**
   * What the save button says
   */
  @Prop() submitButton = "Save";
  /**
   * What color the submit button is
   */
  @Prop() submitButtonColor = "primary";
  /**
   * What fill option to use for the submit button
   */
  @Prop() submitButtonFill: "clear" | "outline" | "solid" | "default" = "solid";
  /**
   * What the reset button says
   */
  @Prop() resetButton = "Cancel";
  /**
   * What color the reset button is
   */
  @Prop() resetButtonColor = "dark";
  /**
   * What fill option to use for the reset button
   */
  @Prop() resetButtonFill: "clear" | "outline" | "solid" | "default" = "clear";
  /**
   * Should the form controls be hidden?
   */
  @Prop() hideControls = false;
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
   * Should the form disable reset
   */
  @Prop() disableReset = false;
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
   * A list of options for SwiperJS
   * @link https://swiperjs.com/swiper-api#parameters
   */
  @Prop() slidesOptions: any = { autoHeight: true };
  @Prop() pager = false;
  @Prop() scrollbar = false;
  @Prop() steps: {
    beforeHTML?: string;
    fields?: Field[];
    afterHTML?: string;
  }[] = [];
  @Prop() showControls = false;
  @Prop() googleMapsKey: string;
  @Prop() stripeKey: string;
  @Prop() stripeElements: any;

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
    return this.slidesEl.slideNext(speed, runCallbacks);
  }

  @Method()
  async slidePrev(speed?: number, runCallbacks?: boolean) {
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
          icon={field?.icon}
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
          info={field?.info}
          edit={!!field?.edit}
          min={field?.min}
          max={field?.max}
          iconLeft={field?.iconLeft}
          iconRight={field?.iconRight}
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
        />
      );
    }
  }

  render() {
    return (
      <fireenjin-form
        name={this.name}
        formData={this.formData}
        submitButton={this.submitButton}
        submitButtonColor={this.submitButtonColor}
        submitButtonFill={this.submitButtonFill}
        resetButton={this.resetButton}
        resetButtonColor={this.resetButtonColor}
        resetButtonFill={this.resetButtonFill}
        documentId={this.documentId}
        endpoint={this.endpoint}
        hideControls={!this.showControls}
        excludeData={this.excludeData}
        beforeSubmit={this.beforeSubmit}
        disableLoader={this.disableLoader}
        loading={this.loading}
        disableEnterButton={this.disableEnterButton}
        disableReset={this.disableReset}
        confirmExit={this.confirmExit}
        hasChanged={this.hasChanged}
        method={this.method}
        action={this.action}
        fetch={this.fetch}
        fetchParams={this.fetchParams}
        fetchDataMap={this.fetchDataMap}
      >
        <ion-slides
          ref={(el) => (this.slidesEl = el)}
          pager={this.pager}
          options={this.slidesOptions}
          scrollbar={this.scrollbar}
        >
          {(this.steps || []).map((step) => (
            <ion-slide>
              <div>
                {step?.beforeHTML && <div innerHTML={step.beforeHTML} />}
                {(step?.fields || []).map((field) => [
                  field?.beforeHTML && <div innerHTML={field.beforeHTML} />,
                  this.renderField(field),
                  field?.afterHTML && <div innerHTML={field.afterHTML} />,
                ])}
              </div>
              {step?.afterHTML && <div innerHTML={step.afterHTML} />}
            </ion-slide>
          ))}
        </ion-slides>
      </fireenjin-form>
    );
  }
}
