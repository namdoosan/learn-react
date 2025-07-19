// src/api/userAPI.js
import { BASE_URL } from "./baseURL";

export const fetchUsers = async () => {
  const response = await fetch(`${BASE_URL}/users`);
  if (!response.ok) {
    throw new Error(`Failed to fetch users: ${response.status}`);
  }

  const result = await response.json();
  return result.users.map((user) => ({
    id: user.id, 
    fullname: `${user.firstName} ${user.lastName}`, 
    email: user.email,
    phone: user.phone,
    image: user.image, 
  }));
};

