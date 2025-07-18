import Modal from "@/components/Modal/Modal";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";

export default function AddContactModal({ form, onChange, onSubmit, onClose }) {
  return (
    <Modal title="Add Contact" onClose={onClose}>
      <form onSubmit={onSubmit} className="flex flex-col gap-6 text-blue-700">
        <Input
          label="Name"
          name="name"
          value={form.name}
          onChange={onChange}
          required
          className="border border-blue-300 focus:border-blue-600 focus:ring focus:ring-blue-200 rounded-md px-3 py-2 transition duration-200"
        />
        <Input
          label="Age"
          name="age"
          type="number"
          value={form.age}
          onChange={onChange}
          required
          className="border border-blue-300 focus:border-blue-600 focus:ring focus:ring-blue-200 rounded-md px-3 py-2 transition duration-200"
        />
        
        {/* STATUS */}
        <div className="flex flex-col">
          <label htmlFor="status" className="mb-1 font-medium text-blue-700">Status</label>
          <select
            id="status"
            name="status"
            value={form.status}
            onChange={onChange}
            className="border border-blue-300 text-blue-700 rounded-md px-3 py-5 focus:border-blue-600 focus:ring focus:ring-blue-200 transition duration-200"
          >
            <option value="single">Single</option>
            <option value="married">Married</option>
          </select>
        </div>

        {/* ADDRESS */}
        <div className="flex flex-col">
          <label htmlFor="address" className="mb-1 font-medium text-blue-700">Address</label>
          <textarea
            id="address"
            name="address"
            value={form.address}
            onChange={onChange}
            className="border border-blue-300 rounded-md px-3 py-2 focus:border-blue-600 focus:ring focus:ring-blue-200 transition duration-200"
            rows="4"
          />
        </div>

        <Button 
          type="submit" 
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition duration-200 self-end text-center items-center"
        >
          Save
        </Button>
      </form>
    </Modal>
  );
}
