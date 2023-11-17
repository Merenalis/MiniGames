import React, {createContext, useEffect, useState} from 'react';
import axios from "axios";

export const LocationContext = createContext(undefined)
const LocationProvider = ({ children }) => {
    const [location, setLocation] = useState(null)
    const [pending, setPending] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://ipapi.co/json/');
                const data = response.data;
                setLocation({
                    city: data.city,
                    region: data.region,
                    country: data.country_name,
                    latitude: data.latitude,
                    longitude: data.longitude,
                });
                setPending(false)
            } catch (error) {
                console.error('Error fetching location:', error);
            }
        };

        fetchData();
    }, []);

    if(pending){
        return <>Loading...</>
    }

    return (
        <LocationContext.Provider value={location}>
            {children}
        </LocationContext.Provider>
    );
};

export default LocationProvider;