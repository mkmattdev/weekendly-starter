import type { Place, PlaceInput } from "@/models/place";

// The places API is ours, so the app trusts the shape of what it returns.
const requestPlaces = async (path: string, options?: RequestInit) => {
  const response = await fetch(`/api/places${path}`, options);

  if (response.status === 404) throw new Error("This place no longer exists.");
  if (!response.ok) throw new Error("The places request failed. Please try again.");
  return response.json();
};

export const fetchPlaces = (): Promise<Place[]> => requestPlaces("");

// The API assigns the id, so the saved place comes back from the response.
export const createPlace = (input: PlaceInput): Promise<Place> =>
  requestPlaces("", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...input, isVisited: false }),
  });

export const updatePlace = (place: Place): Promise<Place> =>
  requestPlaces(`/${encodeURIComponent(place.id)}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(place),
  });

export const deletePlace = async (placeId: string) => {
  await requestPlaces(`/${encodeURIComponent(placeId)}`, { method: "DELETE" });
};
