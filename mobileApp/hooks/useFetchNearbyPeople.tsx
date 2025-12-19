import { useState, useEffect } from 'react';
import api from '@/api/axios';
import { Person } from '@/types';

interface Coords {
  latitude: number;
  longitude: number;
}

const useFetchNearbyPeople = (location: Coords) => {
    const [nearbyPeople, setNearbyPeople] = useState<{
  nearbyUsers: Person[];
}>({ nearbyUsers: [] });
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchNearbyPeople = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await api.post('/people/find-people', {
                    latitude: location.latitude,
                    longitude: location.longitude,
                });
                setNearbyPeople(response.data);
            } catch (err: any) {
                setError(err.message || 'Failed to fetch nearby people');
            } finally {
                setLoading(false);
                console.log("Nearby people data:", nearbyPeople);
            }
        };

        if (location.latitude && location.longitude) {
            fetchNearbyPeople();
        }
    }, [location]);

    return { nearbyPeople, loading, error };
};

export default useFetchNearbyPeople;