// src/components/ChangePasswordForm.js

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "tailwindcss/tailwind.css"; // Import the Tailwind CSS
import { changepass } from "../api/hooks/contact";
import { toast } from "react-toastify";

const ChangePasswordForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [validationMessage, setValidationMessage] = useState("");
  const [currentPassword, setcurrentPassword] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [confirmSuccess, setconfirmSuccess] = useState();

  const onSubmit = async (data) => {
    // Validate passwords

    if (data.newPassword !== data.confirmPassword) {
      setValidationMessage("New password and confirm password do not match.");

      return;
    } else {
      setconfirmSuccess(false);
    }

    // Perform password change logic here (e.g., make an API call)
    const res = await changepass({ currentPassword, newPassword });
    console.log(currentPassword);
    console.log(newPassword);
    console.log({ res });

    if (res === false) {
      setValidationMessage("Incorrect password.");
      console.log(res.response.status);
    } else {
      setValidationMessage("Password change successful!");
      setconfirmSuccess(true);
      toast.success("Password change successfully.");
      setcurrentPassword("");
      setnewPassword("");
      setconfirmPassword("");
    }

    // Reset validation message
  };

  return (
    <div className="flex justify-center">
      <div className=" bg-white p-8 rounded shadow-md w-96 ">
        <h2 className="text-2xl font-semibold mb-4">Change Password</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="currentPassword"
              className="block text-sm font-medium text-gray-600"
            >
              Current Password
            </label>
            <input
              type="password"
              id="currentPassword"
              {...register("currentPassword", { required: true })}
              className="mt-1 p-2 w-full border rounded"
              value={currentPassword}
              onChange={(e) => setcurrentPassword(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-gray-600"
            >
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              {...register("newPassword", { required: true })}
              className="mt-1 p-2 w-full border rounded"
              value={confirmPassword}
              onChange={(e) => setconfirmPassword(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-600"
            >
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              {...register("confirmPassword", { required: true })}
              className="mt-1 p-2 w-full border rounded"
              value={newPassword}
              onChange={(e) => setnewPassword(e.target.value)}
            />
          </div>

          {validationMessage && (
            <div
              className={`${
                !confirmSuccess ? "text-red-500" : "text-green-500"
              }  mb-4`}
            >
              {validationMessage}
            </div>
          )}

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordForm;
