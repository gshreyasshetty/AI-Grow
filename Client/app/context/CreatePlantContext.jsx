import React, { createContext, useState } from 'react';

export const CreatePlantContext = createContext(null);

export const CreatePlantProvider = ({ children }) => {
  const [plantData, setPlantData] = useState({
    placeName: '',
    placeAddress: '',
    coordinates: { latitude: null, longitude: null },
    
    farmSize: '',
    unit: '', 
    soilType: '',
    waterAvailability: '', 
    marketFocus: '',
    fertilizerUsage: '', 
    harvestMethod: '', 
    
    // Garden Preferences
    gardenSize: '',
    plantPreferences: [], 
    sunlightExposure: '',
    wateringFrequency: '', 
    windExposure: '', 
  });

  return (
    <CreatePlantContext.Provider value={{ plantData, setPlantData }}>
      {children}
    </CreatePlantContext.Provider>
  );
};
