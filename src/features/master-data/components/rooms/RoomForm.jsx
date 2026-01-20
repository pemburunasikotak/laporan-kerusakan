import React from 'react';

const RoomForm = ({ defaultValues = {}, buildings = [] }) => {
  return (
    <>
      <div>
        <label className="block text-sm font-semibold mb-2">Gedung</label>
        <select
          name="building"
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          defaultValue={defaultValues.building}
          required
        >
          <option value="">Pilih Gedung</option>
          {buildings.map((b) => (
            <option key={b.id} value={b.name}>
              {b.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">Lantai</label>
        <input
          name="floor"
          type="number"
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Contoh: 1"
          defaultValue={defaultValues.floor}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">Nomor Ruangan</label>
        <input
          name="room_number"
          type="text"
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Contoh: 101"
          defaultValue={defaultValues.room_number}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">Nama Ruangan</label>
        <input
          name="name"
          type="text"
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Contoh: Ruang Kelas 1A"
          defaultValue={defaultValues.name}
          required
        />
      </div>
    </>
  );
};

export default RoomForm;
