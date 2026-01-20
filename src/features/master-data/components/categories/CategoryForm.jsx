import React from 'react';

const CategoryForm = ({ defaultValues = {} }) => {
  return (
    <>
      <div>
        <label className="block text-sm font-semibold mb-2">Nama Kategori</label>
        <input
          name="name"
          type="text"
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Contoh: Elektronik"
          defaultValue={defaultValues.name}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">Deskripsi</label>
        <textarea
          name="description"
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="3"
          placeholder="Deskripsi kategori..."
          defaultValue={defaultValues.description}
        ></textarea>
      </div>
    </>
  );
};

export default CategoryForm;
