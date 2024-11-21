import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";  // For navigation
import {setToken, setUserInfo} from "../stores/userSlice";  // Assuming the user store is in this path
import { useDispatch } from "react-redux";

const LoginPage = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();    // For navigation after successful login
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]); // Clear previous errors

    // Validate the form
    if (form.email === "") {
      setErrors((prevErrors) => [...prevErrors, "Your e-mail is missing"]);
    }

    if (form.password === "") {
      setErrors((prevErrors) => [...prevErrors, "Your password is missing"]);
    }

    if (errors.length === 0) {
      try {
        // Sending login request
        const response = await axios.post("/api/login/", form);
        console.log("login", response)
        dispatch(setToken(response.data));  // Save the token to the store

        // Set the authorization header

        localStorage.setItem("token", response.data.access)
        axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.access;

        // Fetch user details
        const userResponse = await axios.get("/api/me/");

        console.log("login1", userResponse)
        dispatch(setUserInfo(userResponse.data));

        // Navigate to the feed page
        navigate("/feed");
      } catch (error) {
        console.error("Error during login", error);
        setErrors((prevErrors) => [
          ...prevErrors,
          "The email or password is incorrect! Or the user is not activated!",
        ]);
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-2 gap-4">
      {/* Left section */}
      <div className="main-left">
        <div className="p-12 bg-white border border-gray-200 rounded-lg">
          <h1 className="mb-6 text-2xl">Log in</h1>
          <p className="mb-6 text-gray-500">
            Lorem ipsum dolor sit mate. Lorem ipsum dolor sit mate. Lorem ipsum dolor sit mate.
          </p>
          <p className="font-bold">
            Don't have an account?{" "}
            <a href="/signup" className="underline">
              Click here
            </a>{" "}
            to create one!
          </p>
        </div>
      </div>

      {/* Right section */}
      <div className="main-right">
        <div className="p-12 bg-white border border-gray-200 rounded-lg">
          <form className="space-y-6" onSubmit={handleSubmit}>
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
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="Your password"
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
              <button type="submit" className="py-4 px-6 bg-purple-600 text-white rounded-lg">
                Log in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
