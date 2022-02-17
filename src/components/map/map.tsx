import { Loader, LoaderOptions, google } from "google-maps";
import { Geolocation } from "@ionic-native/geolocation";
import {
  Component,
  ComponentInterface,
  Element,
  Event,
  EventEmitter,
  Host,
  State,
  Prop,
  Method,
  h,
  Build,
  Watch,
} from "@stencil/core";

@Component({
  tag: "fireenjin-map",
  styleUrl: "map.css",
})
export class Map implements ComponentInterface {
  google: google;
  /**
   * The Google Maps instance
   */
  map: google.maps.Map;
  /**
   * The current list of map markers
   */
  mapMarkers: google.maps.Marker[] = [];

  @Element() mapEl: HTMLElement;
  /**
   * When a marker on the map is clicked
   */
  @Event() fireenjinTrigger: EventEmitter<{
    name: string;
    payload: {
      marker: google.maps.Marker;
      location: {
        position: {
          lat: number;
          lng: number;
        };
        name: string;
        icon: string;
        payload?: any;
      };
    };
  }>;

  /**
   * The Google Maps API Key
   */
  @Prop() apiKey: string;
  /**
   * Google Maps options
   */
  @Prop() options: any = {};
  /**
   * Should the map be visible?
   */
  @Prop() visible = true;
  /**
   * A list of markers to put onto the map
   */
  @Prop({
    mutable: true,
  })
  markers: {
    position: {
      lat: number;
      lng: number;
    };
    name: string;
    icon: string;
    payload?: any;
  }[] = [];

  /**
   * The approximate lat and lng of the current device
   */
  @State()
  position: any;
  /**
   * Is the map currently visible?
   */
  @State()
  isVisible = true;

  /**
   * Add a marker to the map
   * @param location The location information for the marker on the map
   */
  @Method()
  async addMarker(location: {
    position: {
      lat: number;
      lng: number;
    };
    name: string;
    icon: string;
    payload?: any;
  }) {
    if (!this.google)
      this.google = window?.google?.maps
        ? window.google
        : await this.loadGoogleMaps();
    const marker =
      typeof location === "string" ? JSON.parse(location) : location;
    const mapMarker = new this.google.maps.Marker({
      position: marker.position,
      map: this.map,
      title: marker?.name || "",
      icon: marker?.icon
        ? {
            url: marker.icon,
            origin: new this.google.maps.Point(0, 0),
            anchor: new this.google.maps.Point(15, 15),
            scaledSize: new this.google.maps.Size(34, 34),
            shape: { coords: [17, 17, 18], type: "circle" },
            optimized: false,
          }
        : (null as any),
    });
    mapMarker.addListener("click", () => {
      this.onMarkerClick(mapMarker, marker);
    });
    this.mapMarkers.push(mapMarker);

    return mapMarker;
  }

  @Watch("markers")
  async updateMarkers() {
    await this.clearMarkers();
    if (this.markers.length >= 1) {
      this.markers.map(this.addMarker.bind(this));
    }
    return this.markers;
  }

  /**
   * Set the list of map markers
   * @param markers A list of map markers
   */
  @Method()
  async setMarkers(
    markers: {
      position: {
        lat: number;
        lng: number;
      };
      name: string;
      icon: string;
      payload?: any;
    }[] = []
  ) {
    this.markers = markers;
    await this.clearMarkers();
    if (this.markers.length >= 1) {
      this.markers.map(this.addMarker.bind(this));
    }
    return this.markers;
  }

  @Method()
  async setZoom(level: number) {
    return this.map.setZoom(level);
  }

  @Method()
  async setCenter(latLng: google.maps.LatLng | google.maps.LatLngLiteral) {
    return this.map.setCenter(latLng);
  }

  /**
   * Clear the markers off of the map
   */
  @Method()
  async clearMarkers() {
    for (let i = 0; i < this.mapMarkers.length; i++) {
      if (!this.mapMarkers[i]?.setMap) continue;
      this.mapMarkers[i].setMap(null);
    }
    this.mapMarkers = [];

    return true;
  }

  /**
   * When a marker is clicked set the zoom level,
   * animate to center, and emit an event
   * @param marker The map marker that has been clicked
   * @param location The location information tied to the map marker
   */
  onMarkerClick(
    marker: google.maps.Marker,
    location: {
      position: {
        lat: number;
        lng: number;
      };
      name: string;
      icon: string;
      payload?: any;
    }
  ) {
    this.map.setZoom(12);
    this.map.setCenter(marker.getPosition());
    this.fireenjinTrigger.emit({
      name: "markerClick",
      payload: {
        marker,
        location,
      },
    });
  }

  /**
   * Get a device's location via Geolocation api and
   * fallback to location based on IP
   * @param callback The function to run when the location is determined
   */
  getLocationCoords(
    callback: (coords: { latitude: number; longitude: number } | false) => any
  ) {
    try {
      Geolocation.getCurrentPosition()
        .then((position) => {
          if (callback && typeof callback === "function") {
            callback(position.coords);
          }
        })
        .catch(async (_error) => {
          fetch("http://ip-api.com/json").then(async (response) => {
            const ISPInfo = await response.json();
            callback({
              latitude: ISPInfo.lat,
              longitude: ISPInfo.lon,
            });
          });
          if (callback && typeof callback === "function") {
            callback(false);
          }
        });
    } catch (error) {
      callback(false);
    }
  }

  /**
   * Create the instance of Google Maps
   * @param position The latitude and longitude to center the map on
   */
  async createMap(position: { latitude: number; longitude: number }) {
    if (!this.google)
      this.google = window?.google?.maps
        ? window.google
        : await this.loadGoogleMaps();
    this.map = new this.google.maps.Map(this.mapEl.querySelector("#map"), {
      zoom: 9,
      center: {
        lat: position.latitude,
        lng: position.longitude,
      },
    });
  }

  async loadGoogleMaps(options?: LoaderOptions) {
    const loader = new Loader(this.apiKey, options || {});
    return loader.load();
  }

  async componentDidLoad() {
    if (!Build?.isBrowser) return;

    if (Build.isBrowser) {
      this.isVisible = this.visible;
      this.google = window?.google?.maps
        ? window.google
        : await this.loadGoogleMaps();
      this.getLocationCoords(async (coords) => {
        this.position = coords
          ? coords
          : { latitude: 38.6270025, longitude: -90.19940419999999 };

        this.createMap(this.position);
        await this.setMarkers(this.markers);
      });
    }
  }

  render() {
    return (
      <Host class={{ "map-is-visible": this.isVisible }}>
        <div id="map" />
      </Host>
    );
  }
}
