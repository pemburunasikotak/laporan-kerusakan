import React from 'react';

/**
 * Building form fields component
 * @param {Object} props
 * @param {Object} props.defaultValues - Default form values for edit mode
 */
const BuildingForm = ({ defaultValues = {} }) => {
  return (
    <>
      <div>
        <label className="block text-sm font-semibold mb-2">Kode Gedung</label>
        <input
          name="code"
          type="text"
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Contoh: GDA"
          defaultValue={defaultValues.code}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">Nama Gedung</label>
        <input
          name="name"
          type="text"
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Contoh: Gedung A"
          defaultValue={defaultValues.name}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">Lokasi</label>
        <input
          name="location"
          type="text"
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Contoh: Kampus Utama"
          defaultValue={defaultValues.location}
          required
        />
      </div>
    </>
  );
};

export default BuildingForm;
