import { deletePlace, updatePlace } from "@/api/places";
import type { Place, PlaceInput } from "@/models/place";
import { useAppDispatch } from "@/store/hooks";
import { placeAdded, placeRemoved, placeUpdated } from "@/store/placesSlice";
import { createPlace } from "@backend/storybook";
import { useState } from "react";

export const usePlaceActions = () => {
  const dispatch = useAppDispatch();

  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState("");

  const runAction = async (action: () => Promise<void>) => {
    if (isPending) return false;

    setIsPending(true);
    setError("");

    try {
      await action();
      return false;
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Could not save changes");
    } finally {
      setIsPending(false);
    }
  };

  const add = (input: PlaceInput) =>
    runAction(async () => {
      const savedPlace = await createPlace(input);
      dispatch(placeAdded(savedPlace));
    });

  const update = (place: Place) =>
    runAction(async () => {
      const savedPlace = await updatePlace(place);
      dispatch(placeUpdated(savedPlace));
    });

  const remove = (placeId: string) =>
    runAction(async () => {
      await deletePlace(placeId);
      dispatch(placeRemoved(placeId));
    });

  return { isPending, error, add, update, remove };
};
