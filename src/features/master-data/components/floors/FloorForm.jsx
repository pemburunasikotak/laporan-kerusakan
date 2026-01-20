import React from 'react';

const FloorForm = ({ defaultValues = {}, buildings = [] }) => {
  return (
    <>
      <div>
        <label className="block text-sm font-semibold mb-2">Gedung</label>
        <select
          name="building_id"
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          defaultValue={defaultValues.building_id}
          required
        >
          <option value="">Pilih Gedung</option>
          {buildings.map((b) => (
            <option key={b.id} value={b.id}>
              {b.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">Nomor Lantai</label>
        <input
          name="floor_number"
          type="number"
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Contoh: 1"
          defaultValue={defaultValues.floor_number}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">Nama Lantai</label>
        <input
          name="name"
          type="text"
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Contoh: Lantai 1"
          defaultValue={defaultValues.name}
        />
      </div>
    </>
  );
};

export default FloorForm;
