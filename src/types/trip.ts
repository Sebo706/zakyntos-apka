export type PlaceStatus = 'main' | 'optional' | 'done' | 'skipped';
export type PlaceCategory = 'beach' | 'viewpoint' | 'village' | 'town' | 'food' | 'boat' | 'hotel' | 'farm' | 'airport';

export interface Place {
  id: string;
  name: string;
  dayId: string;
  category: PlaceCategory;
  priority: number;
  coordinates: [number, number];
  shortNote: string;
  crowdWarning?: string;
  recommendedTime: string;
  googleMapsUrl: string;
  status: PlaceStatus;
}

export interface DayPlan {
  id: string;
  title: string;
  type: string;
  route: string;
  recommendedDeparture: string;
  summaryNote: string;
  mealTimes: {
    breakfast: string;
    lunch: string;
    hotelReturn: string;
    dinner: string;
  };
  program: string[];
  planB: string;
  safetyNotes: string[];
}

export interface TripState {
  currentDayId: string;
  placeStatuses: Record<string, PlaceStatus>;
  dayNotes: Record<string, string>;
  placeNotes: Record<string, string>;
  mealTimes: Record<string, DayPlan['mealTimes']>;
  dayPlaceOrder: Record<string, string[]>;
  packingChecked: Record<string, boolean>;
}
