import { useState } from 'react';
import Swal from 'sweetalert2';

/**
 * Custom hook for CRUD operations on master data
 * @param {Object} service - Service object with CRUD methods
 * @param {String} entityType - Type of entity (buildings, floors, etc.)
 * @param {Function} onSuccess - Callback after successful operation
 * @param {Function} enqueueSnackbar - Notistack function to show notifications
 * @returns {Object} { create, update, remove, loading }
 */
export const useCRUD = (service, entityType, onSuccess, enqueueSnackbar) => {
  const [loading, setLoading] = useState(false);

  const create = async (data) => {
    setLoading(true);
    try {
      let response;
      
      switch (entityType) {
        case 'buildings':
          response = await service.createBuilding(data);
          break;
        case 'floors':
          response = await service.createFloor(data);
          break;
        case 'rooms':
          response = await service.createRoom(data);
          break;
        case 'categories':
          response = await service.createCategory(data);
          break;
        case 'equipment':
          response = await service.createEquipment(data);
          break;
        default:
          throw new Error('Invalid entity type');
      }

      if (onSuccess) onSuccess();
      return response;
    } catch (error) {
      console.error('Error creating data:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const update = async (id, data) => {
    setLoading(true);
    try {
      let response;
      
      switch (entityType) {
        case 'buildings':
          response = await service.updateBuilding(id, data);
          break;
        case 'floors':
          response = await service.updateFloor(id, data);
          break;
        case 'rooms':
          response = await service.updateRoom(id, data);
          break;
        case 'categories':
          response = await service.updateCategory(id, data);
          break;
        case 'equipment':
          response = await service.updateEquipment(id, data);
          break;
        default:
          throw new Error('Invalid entity type');
      }

      if (onSuccess) onSuccess();
      return response;
    } catch (error) {
      console.error('Error updating data:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id) => {
    const result = await Swal.fire({
      title: 'Konfirmasi Hapus',
      text: 'Apakah Anda yakin ingin menghapus data ini? Tindakan ini tidak dapat dibatalkan.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Ya, Hapus!',
      cancelButtonText: 'Batal'
    });

    if (!result.isConfirmed) return;

    setLoading(true);
    try {
      let response;
      
      switch (entityType) {
        case 'buildings':
          response = await service.deleteBuilding(id);
          break;
        case 'floors':
          response = await service.deleteFloor(id);
          break;
        case 'rooms':
          response = await service.deleteRoom(id);
          break;
        case 'categories':
          response = await service.deleteCategory(id);
          break;
        case 'equipment':
          response = await service.deleteEquipment(id);
          break;
        default:
          throw new Error('Invalid entity type');
      }

      if (onSuccess) onSuccess();
      return response;
    } catch (error) {
      console.error('Error deleting data:', error);
      if (enqueueSnackbar) {
        enqueueSnackbar('Gagal menghapus data', { variant: 'error' });
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { create, update, remove, loading };
};
