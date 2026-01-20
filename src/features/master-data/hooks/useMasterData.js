import { useState, useEffect } from 'react';

/**
 * Custom hook for managing master data fetching and state
 * @param {String} activeTab - Current active tab/data type
 * @param {Object} service - Service object with get methods
 * @returns {Object} { data, loading, error, refetch }
 */
export const useMasterData = (activeTab, service) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    if (!activeTab || !service) return;

    setLoading(true);
    setError(null);

    try {
      let response;
      
      switch (activeTab) {
        case 'buildings':
          response = await service.getBuildings();
          break;
        case 'floors':
          response = await service.getFloors();
          break;
        case 'rooms':
          response = await service.getRooms();
          break;
        case 'categories':
          response = await service.getCategories();
          break;
        case 'equipment':
          response = await service.getEquipment();
          break;
        default:
          response = null;
      }

      if (response) {
        setData(response?.data?.data || []);
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      setError(err.message || 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  return { data, loading, error, refetch: fetchData };
};
