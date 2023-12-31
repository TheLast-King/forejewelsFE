import React, { useEffect, useState } from 'react';
import API_URLS from '../../config/config';

const LocationIP = () => {
    const baseurl = API_URLS.baseurl;
    const location = API_URLS.location;
    const [userCountry, setUserCountry] = useState('');

    useEffect(() => {
        async function fetchUserCountry() {
            try {
                const response = await fetch(`${baseurl}/${location}`);
                const data = await response.json();
                console.log("Data: ",data);
                setUserCountry(data.country); // or use data.country_name for the country name
            } catch (error) {
                console.error('Error fetching user country:', error);
            }
        }

        fetchUserCountry();
    }, []);

    return (
        <div>
            <h1>Welcome!</h1>
            <p>Your country: {userCountry}</p>
         
        </div>
    );
};

export default LocationIP;
