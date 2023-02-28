import { Color } from "@ionic/core";
import { getDownloadURL } from "firebase/storage";
import {
  Component,
  Event,
  EventEmitter,
  Host,
  Listen,
  Method,
  Prop,
  State,
  h,
} from "@stencil/core";
import openFileSelect from "../../helpers/openFileSelect";
import { FireEnjinUploadEvent, FireEnjinSubmitEvent } from "@fireenjin/sdk";

@Component({
  tag: "fireenjin-upload-button",
  styleUrl: "upload-button.css",
})
export class UploadButton {
  buttonEl: HTMLIonButtonElement;
  @Event() fireenjinUpload: EventEmitter<FireEnjinUploadEvent>;
  @Event() fireenjinSubmit: EventEmitter<FireEnjinSubmitEvent>;
  @Event() ionChange: EventEmitter;

  @Prop() path: string;
  @Prop() fileName: string;
  @Prop() color: Color = "primary";
  @Prop() placeholder: string;
  @Prop() iconEnd = "cloud-upload";
  @Prop() iconStart: string;
  @Prop() fill = "outline";
  @Prop() expand = "block";
  @Prop() shape: "round" = "round";
  @Prop() multiple = false;
  @Prop() endpoint = "upload";
  @Prop() name = "file";
  @Prop() disabled = false;
  @Prop({ mutable: true }) value: any;
  @Prop({ mutable: true }) label: string;
  @Prop() showLink = false;
  @Prop() showClear = false;
  @Prop() accept: string;
  @Prop() required = false;
  @Prop() autoSubmit = false;
  @Prop() submitEndpoint?: string;
  @Prop() documentId?: string;

  @State() uploading = false;
  @State() complete = false;

  @Listen("fireenjinSuccess")
  async onSuccess(event) {
    if (event?.detail?.name?.includes?.("autosubmit-")) return;
    this.uploading = false;
    this.clearProgressBar();
    this.value = await getDownloadURL(event?.detail?.data?.ref);
    this.label = event?.detail?.data?.metadata?.name;
    this.ionChange.emit({
      name: this.name,
      value: this.value,
      event,
    });
    if (this.autoSubmit)
      this.fireenjinSubmit.emit({
        event,
        endpoint: this.submitEndpoint || this.endpoint,
        name: `autosubmit-${this.name}`,
        id: this.documentId,
        data: {
          [this.name]: this.value,
        },
      });
  }

  @Listen("fireenjinError")
  onError(event) {
    console.log(event);
    this.uploading = false;
    this.clearProgressBar();
  }

  @Listen("fireenjinProgress")
  onProgress({ detail: { progress } }) {
    if (progress) this.setProgressBarColor(progress);
  }

  @Method()
  async clear() {
    this.clearProgressBar();
    this.value = null;
    this.ionChange.emit({
      name: this.name,
      value: this.value,
    });
  }

  clearProgressBar() {
    this.label = null;
    this.buttonEl.style.background = "transparent";
  }

  setProgressBarColor(progress) {
    const colorStop1 = `rgba(var(--ion-color-${
      this.color || "primary"
    }-rgb), 0.1)`;
    const colorStop2 = `rgba(var(--ion-color-${
      this.color || "primary"
    }-rgb), 0.3)`;
    const colorStop3 = `rgba(var(--ion-color-${
      this.color || "primary"
    }-rgb), 0)`;

    const colorStops = `${colorStop1} 0%, ${colorStop2} ${
      progress * 100
    }%, ${colorStop3} ${progress * 100}%`;
    this.buttonEl.style.background = `linear-gradient(to right, ${colorStops})`;
  }

  async uploadFiles(event) {
    const files = await openFileSelect({
      multiple: this.multiple,
      accept: this.accept,
      required: this.required,
    });
    if (!files?.length) return;
    this.uploading = true;
    for (const file of files || []) {
      this.fireenjinUpload.emit({
        event,
        endpoint: this.endpoint,
        name: this.name,
        data: {
          file,
          path: this.path,
          fileName: this.fileName,
        },
      });
    }
  }

  render() {
    return (
      <Host
        class={{
          "upload-complete": this.complete,
          "upload-running": this.uploading,
        }}
      >
        <ion-button
          class="upload-button"
          ref={(el) => (this.buttonEl = el)}
          fill={this.fill}
          expand={this.expand}
          shape={this.shape}
          color={this.color}
          onClick={(event) => this.uploadFiles(event)}
          style={{
            "border-radius": "var(--border-radius)",
            overflow: "hidden",
            transition: "all ease 0.1s",
          }}
          disabled={this.disabled}
        >
          {this.iconStart && <ion-icon slot="start" name={this.iconStart} />}
          {this.uploading ? (
            <ion-font>Uploading</ion-font>
          ) : (
            <ion-label
              style={{
                maxWidth: "90%",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {this.label || this.placeholder || ""}
              <slot />
            </ion-label>
          )}
          {this.iconEnd && !this.uploading && (
            <ion-icon slot="end" name={this.iconEnd} />
          )}
          {this.uploading && (
            <ion-spinner
              slot="end"
              name="crescent"
              style={{ height: "20px", width: "20px", marginLeft: "0.5rem" }}
            />
          )}
        </ion-button>
        {this.value && (this.showLink || this.showClear) && (
          <ion-buttons
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            {this.showLink && (
              <ion-button
                class="open-file"
                target="_blank"
                href={this.value}
                size="small"
                fill="clear"
                expand="full"
                color="medium"
              >
                Open File
                <ion-icon name="open" slot="end" />
              </ion-button>
            )}
            {this.showClear && (
              <ion-button
                onClick={() => this.clear()}
                href="#"
                class="clear-file"
                size="small"
                fill="clear"
                expand="full"
                color="medium"
              >
                Clear
                <ion-icon name="close-circle" slot="end" />
              </ion-button>
            )}
          </ion-buttons>
        )}
      </Host>
    );
  }
}
