import { OPlacesCollection } from "@/components/organisms/OPlacesCollection/OPlacesCollection";

export const VPlaces = () => (
  <>
    <h1
      id="collection-heading"
      className="text-3xl font-semibold"
    >
      Your next weekend starts here.
    </h1>
    <p className="mt-1 mb-8 text-muted">Save places worth exploring</p>
    <OPlacesCollection />
  </>
);
