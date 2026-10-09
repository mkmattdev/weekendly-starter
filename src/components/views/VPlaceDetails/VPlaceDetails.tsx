import { OPlaceDetails } from "@/components/organisms/OPlaceDetails/OPlaceDetails";
import { useParams } from "react-router";

export const VPlaceDetails = () => {
  const { placeId } = useParams();

  return <OPlaceDetails placeId={placeId} />;
};
