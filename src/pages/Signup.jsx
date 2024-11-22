import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";  // For navigation
import { showToast } from "../stores/toastSlice";  // Assuming the toast store is in this path
import { http } from "../api";
import { toast } from "react-toastify";

const SignupPage = () => {  // Using the toast store to show toast notifications
  const [form, setForm] = useState({ email: "", name: "", password1: "", password2: "" });
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]); // Clear previous errors

    // Validate the form
    if (form.email === "") {
      setErrors((prevErrors) => [...prevErrors, "Your e-mail is missing"]);
    }

    if (form.name === "") {
      setErrors((prevErrors) => [...prevErrors, "Your name is missing"]);
    }

    if (form.password1 === "") {
      setErrors((prevErrors) => [...prevErrors, "Your password is missing"]);
    }

    if (form.password1 !== form.password2) {
      setErrors((prevErrors) => [...prevErrors, "The password does not match"]);
    }

    if (errors.length === 0) {
      try {
        // Sending signup request
        const response = await axios.post("/api/signup/", form);
        
        if (response.data.message === "success") {
          toast.success( "User registered successfully.", {
            position: "bottom-right"
          });

          navigate("/login");
          // Clear form after successful signup
          setForm({ email: "", name: "", password1: "", password2: "" });
        } else {
          const data = JSON.parse(response.data.message);
          for (const key in data) {
            setErrors((prevErrors) => [...prevErrors, data[key][0].message]);
          }

          toast.error(
            "Something went wrong. Please try again",
          );
        }
      } catch (error) {
        console.error("Error during signup", error);
        setErrors((prevErrors) => [
          ...prevErrors,
          "Something went wrong. Please try again later."
        ]);
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-2 gap-4">
      {/* Left section */}
      <div className="main-left">
        <div className="p-12 bg-white border border-gray-200 rounded-lg">
          <h1 className="mb-6 text-2xl">Sign up</h1>
          <p className="mb-6 text-gray-500">
            Lorem ipsum dolor sit mate. Lorem ipsum dolor sit mate. Lorem ipsum dolor sit mate.
          </p>
          <p className="font-bold">
            Already have an account?{" "}
            <a href="/login" className="underline">
              Click here
            </a>{" "}
            to log in!
          </p>
        </div>
      </div>

      {/* Right section */}
      <div className="main-right">
        <div className="p-12 bg-white border border-gray-200 rounded-lg">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label>Name</label><br />
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Your full name"
                className="w-full mt-2 py-4 px-6 border border-gray-200 rounded-lg"
              />
            </div>

            <div>
              <label>E-mail</label><br />
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="Your e-mail address"
                className="w-full mt-2 py-4 px-6 border border-gray-200 rounded-lg"
              />
            </div>

            <div>
              <label>Password</label><br />
              <input
                type="password"
                value={form.password1}
                onChange={(e) => setForm({ ...form, password1: e.target.value })}
                placeholder="Your password"
                className="w-full mt-2 py-4 px-6 border border-gray-200 rounded-lg"
              />
            </div>

            <div>
              <label>Repeat password</label><br />
              <input
                type="password"
                value={form.password2}
                onChange={(e) => setForm({ ...form, password2: e.target.value })}
                placeholder="Repeat your password"
                className="w-full mt-2 py-4 px-6 border border-gray-200 rounded-lg"
              />
            </div>

            {errors.length > 0 && (
              <div className="bg-red-300 text-white rounded-lg p-6">
                {errors.map((error, index) => (
                  <p key={index}>{error}</p>
                ))}
              </div>
            )}

            <div>
              <button type="submit" className="py-4 px-6 bg-theme text-white rounded-lg">
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
