import React, { useState, useEffect } from 'react';
import { masterDataService } from '../services';

/**
 * Example Component: Building Floor Viewer
 * 
 * Demonstrates the use of relational endpoints:
 * - GET /buildings to list all buildings
 * - GET /buildings/{id}/floors to get floors in a building
 * - GET /floors/{id}/rooms to get rooms on a floor
 */
const BuildingFloorViewer = () => {
  const [buildings, setBuildings] = useState([]);
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [floors, setFloors] = useState([]);
  const [selectedFloor, setSelectedFloor] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load all buildings on mount
  useEffect(() => {
    loadBuildings();
  }, []);

  const loadBuildings = async () => {
    try {
      setLoading(true);
      const response = await masterDataService.getBuildings();
      setBuildings(response?.data?.data || []);
    } catch (error) {
      console.error('Error loading buildings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBuildingSelect = async (building) => {
    setSelectedBuilding(building);
    setSelectedFloor(null);
    setRooms([]);
    
    try {
      setLoading(true);
      const response = await masterDataService.getBuildingFloors(building.id);
      setFloors(response?.data?.data || []);
    } catch (error) {
      console.error('Error loading floors:', error);
      setFloors([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFloorSelect = async (floor) => {
    setSelectedFloor(floor);
    
    try {
      setLoading(true);
      const response = await masterDataService.getFloorRooms(floor.id);
      setRooms(response?.data?.data || []);
    } catch (error) {
      console.error('Error loading rooms:', error);
      setRooms([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Building Floor Viewer Example</h1>
      
      <div className="grid grid-cols-3 gap-4">
        {/* Buildings List */}
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-4">Buildings</h2>
          {loading && !selectedBuilding ? (
            <div className="text-gray-500">Loading...</div>
          ) : (
            <div className="space-y-2">
              {buildings.map(building => (
                <button
                  key={building.id}
                  onClick={() => handleBuildingSelect(building)}
                  className={`w-full text-left px-3 py-2 rounded transition ${
                    selectedBuilding?.id === building.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  <div className="font-semibold">{building.name}</div>
                  <div className="text-xs opacity-75">{building.code}</div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Floors List */}
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-4">
            Floors {selectedBuilding && `in ${selectedBuilding.name}`}
          </h2>
          {!selectedBuilding ? (
            <div className="text-gray-400 text-sm">Select a building first</div>
          ) : loading && selectedBuilding && !selectedFloor ? (
            <div className="text-gray-500">Loading...</div>
          ) : floors.length === 0 ? (
            <div className="text-gray-400 text-sm">No floors found</div>
          ) : (
            <div className="space-y-2">
              {floors.map(floor => (
                <button
                  key={floor.id}
                  onClick={() => handleFloorSelect(floor)}
                  className={`w-full text-left px-3 py-2 rounded transition ${
                    selectedFloor?.id === floor.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  <div className="font-semibold">
                    {floor.name || `Lantai ${floor.floor_number}`}
                  </div>
                  <div className="text-xs opacity-75">Level {floor.floor_number}</div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Rooms List */}
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-4">
            Rooms {selectedFloor && `on ${selectedFloor.name || 'Floor ' + selectedFloor.floor_number}`}
          </h2>
          {!selectedFloor ? (
            <div className="text-gray-400 text-sm">Select a floor first</div>
          ) : loading && selectedFloor ? (
            <div className="text-gray-500">Loading...</div>
          ) : rooms.length === 0 ? (
            <div className="text-gray-400 text-sm">No rooms found</div>
          ) : (
            <div className="space-y-2">
              {rooms.map(room => (
                <div
                  key={room.id}
                  className="px-3 py-2 bg-gray-100 rounded"
                >
                  <div className="font-semibold">{room.name}</div>
                  <div className="text-xs text-gray-600">
                    Room {room.room_number} • Capacity: {room.capacity}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Type: {room.type}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Info Box */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="font-semibold text-blue-900 mb-2">API Calls Demonstrated:</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>✅ <code className="bg-blue-100 px-1 rounded">GET /buildings</code> - Load all buildings</li>
          {selectedBuilding && (
            <li>✅ <code className="bg-blue-100 px-1 rounded">GET /buildings/{selectedBuilding.id}/floors</code> - Get floors in building</li>
          )}
          {selectedFloor && (
            <li>✅ <code className="bg-blue-100 px-1 rounded">GET /floors/{selectedFloor.id}/rooms</code> - Get rooms on floor</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default BuildingFloorViewer;
