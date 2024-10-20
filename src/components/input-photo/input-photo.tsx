import { FireEnjinSubmitEvent, FireEnjinUploadEvent } from "@fireenjin/sdk";
import { getDownloadURL } from "firebase/storage";
import {
  Component,
  ComponentInterface,
  Element,
  Event,
  EventEmitter,
  Method,
  Listen,
  Prop,
  State,
  Watch,
  h,
  Build,
} from "@stencil/core";
import resizeImage from "../../helpers/resizeImage";

@Component({
  tag: "fireenjin-input-photo",
  styleUrl: "input-photo.css",
})
export class InputPhoto implements ComponentInterface {
  @Element() photoUploaderEl: any;

  @Prop() color: string;
  /**
   * Is the uploader disabled
   */
  @Prop() disabled = false;
  /**
   * A link to the photo to display
   */
  @Prop({
    mutable: true,
  })
  value: string;
  /**
   * The storage path to upload the file to
   */
  @Prop() path: string;
  /**
   * The fallback image to use if photo isn't set
   */
  @Prop() fallback: string;
  /**
   * The name to use when emitting field change event
   */
  @Prop() name?: string;
  /**
   * The filename to use for the uploaded file
   */
  @Prop() fileName?: string;
  /**
   * Should the photo uploader show the button
   */
  @Prop() showButton = false;
  /**
   * Text to display on the photo upload button
   */
  @Prop() buttonText = "Edit Image";
  /**
   * The type of photo being uploaded
   */
  @Prop() type = "photo";
  /**
   * The ID of the document the photo is tied to
   */
  @Prop() documentId: string;
  /**
   * The endpoint to upload to
   */
  @Prop() endpoint = "upload";
  @Prop() initials: string;
  /**
   * Allow uploading multiple
   */
  @Prop() multiple = false;
  /**
   * Resize photos before uploading
   */
  @Prop() resize = false;
  /**
   * Should the uploader auto submit the photo on change
   */
  @Prop() autoSubmit = false;
  @Prop() submitEndpoint?: string;
  @Prop({ mutable: true }) loading: boolean;

  @State() photoUrl: string;

  @Event() fireenjinUpload: EventEmitter<FireEnjinUploadEvent>;
  @Event() fireenjinSubmit: EventEmitter<FireEnjinSubmitEvent>;
  @Event() ionInput: EventEmitter;
  @Event() ionChange: EventEmitter;

  @Listen("fireenjinSuccess")
  async onSuccess(event) {
    if (event.detail.name !== this.name) return false;
    this.loading = false;
    this.value = await getDownloadURL(event?.detail?.data?.ref);
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

  @Watch("value")
  onPhotoChange() {
    this.updatePhoto();
  }

  componentDidLoad() {
    if (!Build?.isBrowser) return;
    this.updatePhoto();
  }

  updatePhoto() {
    this.photoUrl = this.value
      ? this.value
      : this.fallback
      ? this.fallback
      : null;
    if (this.value) {
      this.ionInput.emit({
        name: this.name,
        value: this.value,
      });
      this.ionChange.emit({
        name: this.name,
        value: this.value,
      });
    }
  }

  @Method()
  async triggerFileInput(_event) {
    if (this.disabled) {
      return false;
    }
    const fileInputEl: any =
      this.photoUploaderEl.querySelector('input[type="file"]');
    fileInputEl.click();
  }

  selectFile(event) {
    for (const file of event?.target?.files || []) {
      this.uploadPhoto(file);
    }
  }

  uploadPhoto(file) {
    this.loading = true;
    if (!window.FileReader) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      if (event.target.readyState != 2) return;
      if (event.target.error) {
        alert("Error while reading file");
        return;
      }

      this.fireenjinUpload.emit({
        event,
        endpoint: this.endpoint,
        name: this.name,
        data: {
          id: this.documentId,
          type: this.type,
          path: this.path,
          file,
          fileName: this.fileName,
          encodedContent: this.resize
            ? resizeImage(event?.target?.result as any)
            : event?.target?.result,
        },
      });
    };

    reader.readAsDataURL(file);
  }

  onDrop(event) {
    event.preventDefault();
    this.uploadPhoto(event.dataTransfer.files[0]);
  }

  onDrag(event) {
    event.preventDefault();
  }

  onDragEnter() {
    this.showButton = true;
  }

  onDragLeave() {
    this.showButton = false;
  }

  getCssVarColor(color: string) {
    if (!Build?.isBrowser) return color;
    return getComputedStyle(document.documentElement)
      .getPropertyValue(`--ion-color-${color}`)
      .replace(" ", "");
  }

  render() {
    return (
      <div
        style={{
          "--fireenjin-photo-background":
            this.color &&
            (this.color.includes("#") ||
              this.color.includes("rgb(") ||
              this.color.includes("rgba(") ||
              this.color.includes("hsl(") ||
              this.color.includes("hsla("))
              ? this.color
              : this.color
              ? this.getCssVarColor(this.color)
              : "transparent",
        }}
      >
        <div class="upload-wrapper">
          <div
            class={this.loading ? "photo is-loading" : "photo"}
            style={{
              backgroundImage: this.photoUrl ? `url('${this.photoUrl}')` : null,
            }}
            onClick={(event) => this.triggerFileInput(event)}
            onDrop={(event) => this.onDrop(event)}
            onDragOver={(event) => this.onDrag(event)}
            onDragEnter={() => this.onDragEnter()}
            onDragLeave={() => this.onDragLeave()}
          >
            {!this.photoUrl && this.initials ? this.initials : null}
          </div>
          {this.showButton ? (
            <ion-button
              fill="clear"
              expand="block"
              size="small"
              onClick={(event) => this.triggerFileInput(event)}
            >
              {this.buttonText}
              <ion-icon name="image" slot="end" />
            </ion-button>
          ) : null}
        </div>
        <slot />
        <input
          type="file"
          onChange={(event) => this.selectFile(event)}
          accept="image/*"
          multiple={this.multiple}
        />
      </div>
    );
  }
}
