import type { Place } from "@/models/place";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type PlacesState = {
  items: Place[];
};

const initialState: PlacesState = { items: [] };

const placesSlice = createSlice({
  name: "places",
  initialState,
  reducers: {
    placesLoaded: (state, action: PayloadAction<Place[]>) => {
      state.items = action.payload;
    },
    placeAdded: (state, action: PayloadAction<Place>) => {
      state.items.push(action.payload);
    },
    placeUpdated: (state, action: PayloadAction<Place>) => {
      state.items = state.items.map((place) =>
        place.id === action.payload.id ? action.payload : place
      );
    },
    placeRemoved: (state, action: PayloadAction<string>) => {
      // TODO: Usunąć dany item z items na bazie action.payload, który jest typu string (jest to id elementu, który mamy usunąć)
    },
  },
});
