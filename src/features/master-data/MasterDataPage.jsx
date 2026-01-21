import React, { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import TabNavigation from './components/shared/TabNavigation';
import FormModal from './components/shared/FormModal';
import { useMasterData } from './hooks/useMasterData';
import { useCRUD } from './hooks/useCRUD';
import { masterDataService } from '../../services/masterDataService';
import { MASTER_DATA_TABS } from './constants/masterDataConfig';

const MasterDataPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [activeTab, setActiveTab] = useState('buildings');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('add');
  const [modalData, setModalData] = useState({});
  const [rooms, setRooms] = useState([]);
  const [categories, setCategories] = useState([]);
  const currentConfig = MASTER_DATA_TABS.find((t) => t.id === activeTab);
  const { TableComponent, FormComponent } = currentConfig;
  const { data, loading, refetch } = useMasterData(activeTab, masterDataService);

  const { create, update, remove, loading: submitting } = useCRUD(
    masterDataService,
    activeTab,
    () => {
      refetch();
      setShowModal(false);
      enqueueSnackbar(`Data berhasil ${modalType === 'add' ? 'ditambahkan' : 'diupdate'}!`, { variant: 'success' });
    },
    enqueueSnackbar
  );
  useEffect(() => {
    const fetchDropdownData = async () => {
      if (activeTab === 'equipment') {
        try {
          const [roomsData, categoriesData] = await Promise.all([
            masterDataService.getRooms(),
            masterDataService.getCategories()
          ]);
          setRooms(roomsData.data || roomsData);
          setCategories(categoriesData.data || categoriesData);
        } catch (error) {
          console.error('Error fetching dropdown data:', error);
        }
      }
    };
    fetchDropdownData();
  }, [activeTab]);

  // Handlers
  const handleAdd = () => {
    setModalType('add');
    setModalData({});
    setShowModal(true);
  };

  const handleEdit = (rowData) => {
    setModalType('edit');
    setModalData(rowData);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    await remove(id);
    refetch();
  };

  const generateCode = () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    return code;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    const numericFields = ['building_id', 'floor_number', 'floor', 'rooms', 'capacity', 'total', 'broken', 'room_id', 'category_id', 'procurement_year'];
    numericFields.forEach((field) => {
      if (data[field]) data[field] = Number(data[field]);
    });

    try {
      if (modalType === 'add') {
        if (activeTab === 'categories') {
          await create({...data, code: generateCode()});
        }else {
          await create(data);
        }
      } else {
        await update(modalData.id, data);
      }
    } catch (error) {
      enqueueSnackbar(`Gagal menyimpan data ${modalType === 'add' ? 'ditambahkan' : 'diupdate'}!`, { variant: 'error' });
    }
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  // Get buildings for dropdown (needed by floors and rooms forms)
  const buildings = activeTab === 'floors' || activeTab === 'rooms' 
    ? data
    : [];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Data Master</h1>

      {/* Tab Navigation */}
      <TabNavigation
        tabs={MASTER_DATA_TABS}
        activeTab={activeTab}
        onChange={handleTabChange}
      />

      {/* Dynamic Table Component */}
      <TableComponent
        data={data}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onAdd={handleAdd}
      />

      {/* Dynamic Form Modal */}
      <FormModal
        isOpen={showModal}
        title={`${modalType === 'add' ? 'Tambah' : 'Edit'} ${currentConfig.name}`}
        onClose={() => setShowModal(false)}
        onSubmit={handleSubmit}
        submitting={submitting}
      >
        <FormComponent 
          defaultValues={modalData} 
          buildings={buildings}
          rooms={rooms}
          categories={categories}
        />
      </FormModal>
    </div>
  );
};

export default MasterDataPage;
