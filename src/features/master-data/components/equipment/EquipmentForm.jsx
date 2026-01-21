import React from 'react';

const EquipmentForm = ({ defaultValues = {}, rooms = [], categories = [] }) => {
  return (
    <>
      <div>
        <label className="block text-sm font-semibold mb-2">Ruangan</label>
        <select
          name="room_id"
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          defaultValue={defaultValues.room_id}
          required
        >
          <option value="">Pilih Ruangan</option>
          {rooms?.data?.map((room) => (
            <option key={room?.id} value={room?.id}>
              {room?.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">Kategori</label>
        <select
          name="category_id"
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          defaultValue={defaultValues?.category_id}
          required
        >
          <option value="">Pilih Kategori</option>
          {categories?.data?.map((category) => (
            <option key={category?.id} value={category?.id}>
              {category?.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">Kode</label>
        <input
          name="code"
          type="text"
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Contoh: COMP001"
          defaultValue={defaultValues?.code}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">Nama Peralatan</label>
        <input
          name="name"
          type="text"
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Contoh: Smoke Detector"
          defaultValue={defaultValues?.name}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">Brand</label>
        <input
          name="brand"
          type="text"
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Contoh: SafetyTech"
          defaultValue={defaultValues?.brand}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">Spesifikasi</label>
        <textarea
          name="specification"
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Contoh: Ionization Fire Detector"
          defaultValue={defaultValues?.specification}
          rows="3"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">Tahun Pengadaan</label>
        <input
          name="procurement_year"
          type="number"
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Contoh: 2023"
          defaultValue={defaultValues?.procurement_year}
          required
        />
      </div>
    </>
  );
};

export default EquipmentForm;
