import { fetchPlaces } from "@/api/places";
import type { Place } from "@/models/place";
import { useAppDispatch } from "@/store/hooks";
import { placesLoaded } from "@/store/placesSlice";
import { useEffect, useState } from "react";

type InitializationState = {
  status: "loading" | "ready" | "error";
  message: string;
};

export const usePlacesInitialization = () => {
  const dispatch = useAppDispatch();
  const [status, setStatus] = useState<InitializationState>({
    status: "loading",
    message: "",
  });

  useEffect(() => {
    const showPlaces = (places: Place[]) => {
      dispatch(placesLoaded(places));
      setStatus({ status: "ready", message: "" });
    };

    const showError = (loadError: unknown) => {
      setStatus({
        status: "error",
        message:
          loadError instanceof Error ? loadError.message : "We could not load your collection",
      });
    };

    fetchPlaces().then(showPlaces, showError);
  }, [dispatch]);

  return status;
};
