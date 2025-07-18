export const fetchUsers = async () => {
  try {
    const response = await fetch("https://dummyjson.com/users");
    const result = await response.json();
    // mapping supaya sesuai fieldnya dengan fullname, email, dll
    return result.users.map((user) => ({
      fullname: `${user.firstName} ${user.lastName}`,
      email: user.email,
      gender: user.gender,
      age: user.age,
      ip: user.ip || "127.0.0.1", // dummy IP karena API gak punya IP
    }));
  } catch (error) {
    console.error("Gagal fetch users:", error);
    return [];
  }
};
