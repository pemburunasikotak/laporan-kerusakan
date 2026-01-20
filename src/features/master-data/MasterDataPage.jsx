import React, { useState } from 'react';
import TabNavigation from './components/shared/TabNavigation';
import FormModal from './components/shared/FormModal';
import { useMasterData } from './hooks/useMasterData';
import { useCRUD } from './hooks/useCRUD';
import { masterDataService } from '../../services/masterDataService';
import { MASTER_DATA_TABS } from './constants/masterDataConfig';

const MasterDataPage = () => {
  const [activeTab, setActiveTab] = useState('buildings');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('add');
  const [modalData, setModalData] = useState({});

  // Get current tab configuration
  const currentConfig = MASTER_DATA_TABS.find((t) => t.id === activeTab);
  const { TableComponent, FormComponent } = currentConfig;

  // Fetch data for active tab
  const { data, loading, refetch } = useMasterData(activeTab, masterDataService);

  // CRUD operations
  const { create, update, remove, loading: submitting } = useCRUD(
    masterDataService,
    activeTab,
    () => {
      refetch();
      setShowModal(false);
      alert(`Data berhasil ${modalType === 'add' ? 'ditambahkan' : 'diupdate'}!`);
    }
  );

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    // Convert numeric fields
    const numericFields = ['building_id', 'floor_number', 'floor', 'rooms', 'capacity', 'total', 'broken'];
    numericFields.forEach((field) => {
      if (data[field]) data[field] = Number(data[field]);
    });

    try {
      if (modalType === 'add') {
        await create(data);
      } else {
        await update(modalData.id, data);
      }
    } catch (error) {
      alert('Gagal menyimpan data');
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
        <FormComponent defaultValues={modalData} buildings={buildings} />
      </FormModal>
    </div>
  );
};

export default MasterDataPage;
