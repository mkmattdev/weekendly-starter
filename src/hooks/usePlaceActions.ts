import type { PlaceInput } from "@/models/place";
import { useAppDispatch } from "@/store/hooks";
import { placeAdded } from "@/store/placesSlice";
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
};
