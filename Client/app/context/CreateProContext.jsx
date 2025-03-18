import React, { createContext, useState } from 'react';

export const CreateProContext = createContext(null);

export const CreateProProvider = ({ children }) => {
  const [plant1Data, setPlant1Data] = useState({
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
    <CreateProContext.Provider value={{ plant1Data, setPlant1Data }}>
      {children}
    </CreateProContext.Provider>
  );
};

