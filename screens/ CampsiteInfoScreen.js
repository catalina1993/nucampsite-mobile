import React from "react";
import RenderCampsite from "../features/nucampsite/RenderCampsite";

const CampsiteInfoScreen = ({ route }) => {
  const { campsite } = route.params;
  return <RenderCampsite campsite={campsite} />;
};

export default CampsiteInfoScreen;
