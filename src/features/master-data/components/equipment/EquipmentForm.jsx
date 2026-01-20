import React from 'react';

const EquipmentForm = ({ defaultValues = {} }) => {
  return (
    <>
      <div>
        <label className="block text-sm font-semibold mb-2">Nama Peralatan</label>
        <input
          name="name"
          type="text"
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Contoh: AC"
          defaultValue={defaultValues.name}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">Kategori</label>
        <select
          name="category"
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          defaultValue={defaultValues.category}
          required
        >
          <option value="">Pilih Kategori</option>
          <option value="Elektronik">Elektronik</option>
          <option value="IT">IT</option>
          <option value="Furniture">Furniture</option>
          <option value="Pendidikan">Pendidikan</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">Total Unit</label>
        <input
          name="total"
          type="number"
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Contoh: 85"
          defaultValue={defaultValues.total}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">Unit Rusak</label>
        <input
          name="broken"
          type="number"
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Contoh: 5"
          defaultValue={defaultValues.broken}
          required
        />
      </div>
    </>
  );
};

export default EquipmentForm;
