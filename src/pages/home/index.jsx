import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./HomePage.css";

import ActionButton from "../../components/ActionButton/ActionButton";
import Table from "../../components/Table/Table";
import AddContactModal from "./Modal/add";
import EditContactModal from "./Modal/edit";

import editIcon from "../../assets/edit.png";
import deleteIcon from "../../assets/delete.png";

export default function HomePage() {
  const [contacts, setContacts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [form, setForm] = useState({
    name: "",
    age: "",
    status: "single",
    address: "",
  });

  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.username) {
      setUsername(location.state.username);
    }
  }, [location.state]);

  const handleLogout = () => navigate("/");

  const handleAddContact = () => {
    setForm({ name: "", age: "", status: "single", address: "" });
    setIsEdit(false);
    setShowModal(true);
  };

  const handleEdit = (index) => {
    setForm(contacts[index]);
    setEditIndex(index);
    setIsEdit(true);
    setShowModal(true);
  };

  const handleDelete = (index) => {
    if (window.confirm("Apakah yakin ingin menghapus contact ini?")) {
      setContacts((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    const { name, age } = form;
    if (!name.trim() || !age.trim()) {
      alert("Name dan Age wajib diisi!");
      return;
    }

    if (isEdit) {
      setContacts((prev) => prev.map((c, i) => (i === editIndex ? form : c)));
    } else {
      setContacts((prev) => [...prev, form]);
    }

    setForm({ name: "", age: "", status: "single", address: "" });
    setEditIndex(null);
    setShowModal(false);
  };

  return (
    <div className="home-container">
      <h1>Selamat datang di Home, {username}!</h1>
      <button onClick={handleLogout}>Logout</button>
      <button className="add-btn" onClick={handleAddContact}>
        Add Contact
      </button>

      {showModal && !isEdit && (
        <AddContactModal
          form={form}
          onChange={handleChange}
          onSubmit={handleSave}
          onClose={() => setShowModal(false)}
        />
      )}

      {showModal && isEdit && (
        <EditContactModal
          form={form}
          onChange={handleChange}
          onSubmit={handleSave}
          onClose={() => setShowModal(false)}
        />
      )}

      <Table
        columns={["No", "Name", "Age", "Status", "Address", "Action"]}
        data={contacts}
        renderActions={(i) => (
          <div className="action-buttons">
            <ActionButton
              icon={editIcon}
              alt="Edit"
              title="Edit"
              onClick={() => handleEdit(i)}
            />
            <ActionButton
              icon={deleteIcon}
              alt="Delete"
              title="Delete"
              onClick={() => handleDelete(i)}
            />
          </div>
        )}
      />
    </div>
  );
}
