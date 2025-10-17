 const logoutDoctor = async (): Promise<boolean> => {
  try {
    const res = await fetch("http://localhost:5000/api/doctor/logout", {
      method: "GET",
      credentials: "include", // important to send cookies
    });

    return res.ok;
  } catch (err) {
    console.error("Logout failed:", err);
    return false;
  }
};

export default logoutDoctor;

