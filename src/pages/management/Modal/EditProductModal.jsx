export default function EditProductModal({ form, onChange, onSubmit, onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <form onSubmit={onSubmit} className="bg-white p-6 rounded-xl w-96">
        <h2 className="text-xl font-bold mb-4">Edit Produk</h2>
        <input name="name" value={form.name} onChange={onChange} placeholder="Name" className="w-full mb-2 p-2 border rounded" />
        <input name="rating" value={form.rating} onChange={onChange} placeholder="Rating" className="w-full mb-2 p-2 border rounded" />
        <input name="price" value={form.price} onChange={onChange} placeholder="Price" className="w-full mb-2 p-2 border rounded" />
        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Batal</button>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Simpan</button>
        </div>
      </form>
    </div>
  );
}
