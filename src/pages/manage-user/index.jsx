import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import cloudBg from "@/assets/cloud.jpg";
import ActionButton from "@/components/ActionButton/ActionButton";
import Table from "@/components/Table/Table";
import AddContactModal from "./Modal/add";
import EditContactModal from "./Modal/edit";
import Sidebar from "@/components/Sidebar/Sidebar";
import Navbar from "@/components/Navbar/Navbar";

import editIcon from "@/assets/edit.png";
import deleteIcon from "@/assets/delete.png";

export default function ManageUserPage() {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    gender: "male",
    age: "",
    ip: "",
  });

  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.username) {
      setUsername(location.state.username);
    }
  }, [location.state]);

  useEffect(() => {
    const result = contacts.filter((c) =>
      c.fullname.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredContacts(result);
  }, [search, contacts]);

  const handleAddContact = () => {
    setForm({
      fullname: "",
      email: "",
      gender: "male",
      age: "",
      ip: "",
    });
    setIsEdit(false);
    setShowModal(true);
  };

  const handleEdit = (index) => {
    setForm(filteredContacts[index]);
    setEditIndex(index);
    setIsEdit(true);
    setShowModal(true);
  };

  const handleDelete = (index) => {
    const contactToDelete = filteredContacts[index];
    if (window.confirm("Apakah yakin ingin menghapus user ini?")) {
      setContacts((prev) => prev.filter((c) => c !== contactToDelete));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    const { fullname, email, gender, age, ip } = form;
    if (!fullname || !email || !age || !ip) {
      alert("Semua field wajib diisi!");
      return;
    }

    if (isEdit) {
      const updated = contacts.map((c) =>
        c === filteredContacts[editIndex] ? form : c
      );
      setContacts(updated);
    } else {
      setContacts((prev) => [...prev, form]);
    }

    setShowModal(false);
    setEditIndex(null);
  };

  return (
    <div className="flex min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${cloudBg})` }}>
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? "ml-66" : "ml-0"}`}>

        <Navbar username={username} toggleSidebar={toggleSidebar} />

        <main className="p-6">
          <div className="bg-white/60 backdrop-blur-md rounded-2xl shadow-xl p-8">
            <h1 className="text-3xl font-bold mb-6 text-center text-blue-900">
              Manage User
            </h1>

            <div className="mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
              {/* <button
                onClick={handleAddContact}
                className="px-5 py-3 bg-sky-600 text-white font-semibold rounded-2xl shadow-md hover:bg-sky-700 transition duration-200"
              >
                Add Contact
              </button> */}
              <input
                type="text"
                placeholder="Search user..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="px-4 py-2 border rounded-xl w-40 md:w-1/3"
              />
            </div>

            {/* Modal */}
            {showModal &&
              (isEdit ? (
                <EditContactModal
                  form={form}
                  onChange={handleChange}
                  onSubmit={handleSave}
                  onClose={() => setShowModal(false)}
                />
              ) : (
                <AddContactModal
                  form={form}
                  onChange={handleChange}
                  onSubmit={handleSave}
                  onClose={() => setShowModal(false)}
                />
              ))}

            {/* Table */}
            <div className="bg-white/70 rounded-2xl backdrop-blur-md p-4 shadow-lg">
              <Table
                columns={[
                  "No",
                  "Fullname",
                  "Email",
                  "Gender",
                  "Age",
                  "IP",
                  "Action",
                ]}
                data={filteredContacts}
                renderRow={(row, i) => [
                  i + 1,
                  row.fullname,
                  row.email,
                  row.gender,
                  row.age,
                  row.ip,
                  <div className="flex gap-2">
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
                  </div>,
                ]}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
