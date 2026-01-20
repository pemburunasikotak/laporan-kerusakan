import { Building, Layers, Home, Box, Tag } from 'lucide-react';
import BuildingTable from '../components/buildings/BuildingTable';
import BuildingForm from '../components/buildings/BuildingForm';
import FloorTable from '../components/floors/FloorTable';
import FloorForm from '../components/floors/FloorForm';
import RoomTable from '../components/rooms/RoomTable';
import RoomForm from '../components/rooms/RoomForm';
import CategoryTable from '../components/categories/CategoryTable';
import CategoryForm from '../components/categories/CategoryForm';
import EquipmentTable from '../components/equipment/EquipmentTable';
import EquipmentForm from '../components/equipment/EquipmentForm';

export const MASTER_DATA_TABS = [
  {
    id: 'buildings',
    name: 'Gedung',
    icon: Building,
    TableComponent: BuildingTable,
    FormComponent: BuildingForm
  },
  {
    id: 'floors',
    name: 'Lantai',
    icon: Layers,
    TableComponent: FloorTable,
    FormComponent: FloorForm
  },
  {
    id: 'rooms',
    name: 'Ruangan',
    icon: Home,
    TableComponent: RoomTable,
    FormComponent: RoomForm
  },
  {
    id: 'equipment',
    name: 'Jenis Peralatan',
    icon: Box,
    TableComponent: EquipmentTable,
    FormComponent: EquipmentForm
  },
  {
    id: 'categories',
    name: 'Kategori',
    icon: Tag,
    TableComponent: CategoryTable,
    FormComponent: CategoryForm
  }
];
