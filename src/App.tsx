import { Route, Routes } from "react-router";
import { ASpinner } from "@/components/atoms/ASpinner/ASpinner";
import { TAppLayout } from "@/components/templates/TAppLayout/TAppLayout";
import { VPlaces } from "@/components/views/VPlaces/VPlaces";
import { VPlaceDetails } from "@/components/views/VPlaceDetails/VPlaceDetails";
import { usePlacesInitialization } from "@/hooks/usePlacesInitialization";

export const App = () => {
  const initialization = usePlacesInitialization();

  return (
    <TAppLayout>
      {initialization.status === "loading" && (
        <section
          className="space-y-4 py-4"
          aria-busy="true"
        >
          <ASpinner />
          <h1 className="text-3xl font-semibold tracking-tight">Opening your little collection…</h1>
          <p
            role="status"
            className="text-muted"
          >
            Loading your saved places.
          </p>
        </section>
      )}
      {initialization.status === "error" && (
        <section className="space-y-4 py-4">
          <h1 className="text-3xl font-semibold tracking-tight">
            Your collection could not be loaded.
          </h1>
          <p
            role="alert"
            className="text-muted"
          >
            {initialization.message}
          </p>
        </section>
      )}
      {initialization.status === "ready" && (
        <Routes>
          <Route
            path="/"
            element={<VPlaces />}
          />
          <Route
            path="/places/:placeId"
            element={<VPlaceDetails />}
          />
        </Routes>
      )}
    </TAppLayout>
  );
};
