import React, { useState } from "react";
import toast from "react-hot-toast";
 
interface Password {
  newPassword: string;
  confirmPassword: string;
}

function PasswordChange() {
  const [form, setForm] = useState<Password>({
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Frontend validation
    if (!form.newPassword || !form.confirmPassword) {
      toast.error("Please fill in all fields.",{
        duration:3000
      });
      return;
    }

    if (form.newPassword !== form.confirmPassword) {
      toast.error("Passwords do not match!",{
        duration:3000
      });
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/doctor/changePassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // if using cookies/session auth
        body: JSON.stringify({
          newPassword: form.newPassword,
          confirmPassword:form.confirmPassword,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to change password");
      }

      toast.success("Password changed successfully!",{
        duration:3000
      });
      setForm({
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error: any) {
      console.error("Error changing password:", error);
      alert("Error: " + error.message);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="bg-gray-200 p-6 rounded shadow">
        <div className="flex flex-col mb-4">
          <label className="mb-1 font-medium">New Password</label>
          <input
            type="password"
            name="newPassword"
            value={form.newPassword}
            onChange={handleChange}
            className="p-2 border rounded"
            required
          />
        </div>

        <div className="flex flex-col mb-6">
          <label className="mb-1 font-medium">Confirm New Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            className="p-2 border rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full p-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-semibold"
        >
          Change Password
        </button>
      </form>
    </div>
  );
}

export default PasswordChange;
