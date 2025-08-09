export interface LocationMap {
  lat: number;
  lng: number;
  address: string;
  displayName?: string;
}

export interface NominatimResult {
  place_id: string;
  licence: string;
  osm_type: string;
  osm_id: string;
  boundingbox: string[];
  lat: string;
  lon: string;
  display_name: string;
  class: string;
  type: string;
  importance: number;
}

export interface EmergencyFormData {
  pickupAddress: string;
  dropOffAddress: string;
  scheduledDate: string;
  emergencyType: string;
  notes: string;
  pickupLocation?: LocationMap;
  dropoffLocation?: LocationMap;
  Price: number;
}