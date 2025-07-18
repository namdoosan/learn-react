import Modal from "../../../../components/Modal/Modal";
import Input from "../../../../components/Input/Input";
import Button from "../../../../components/Button/Button";
import "./EditModal.css";

export default function EditContactModal({ form, onChange, onSubmit, onClose }) {
  return (
    <Modal title="Edit Contact" onClose={onClose}>
      <form onSubmit={onSubmit} className="modal-form">
        <Input
          label="Name"
          name="name"
          value={form.name}
          onChange={onChange}
          required
        />
        <Input
          label="Age"
          name="age"
          type="number"
          value={form.age}
          onChange={onChange}
          required
        />
        <div className="form-group">
          <label>Status</label>
          <select name="status" value={form.status} onChange={onChange}>
            <option value="single">Single</option>
            <option value="married">Married</option>
          </select>
        </div>
        <div className="form-group">
          <label>Address</label>
          <textarea name="address" value={form.address} onChange={onChange} />
        </div>
        <Button type="submit">Update</Button>
      </form>
    </Modal>
  );
}
