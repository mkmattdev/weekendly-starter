import { configureStore } from "@reduxjs/toolkit";
import { placesReducer } from "./placesSlice";
import type { Place } from "@/models/place";

export const createAppStore = (initialPlaces: Place[] = []) =>
  configureStore({
    reducer: { places: placesReducer },
    preloadedState: { places: { items: initialPlaces } },
  });

export type AppStore = ReturnType<typeof createAppStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
