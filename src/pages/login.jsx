import { useTheme } from "../contexts/LoginProvider.jsx";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";

export default function Login() {
  const { toggleUser, isLogged, toggleIsLogged } = useTheme();
  const [error, setError] = useState("");
  const goTo = useNavigate();

  useEffect(() => {
    if (isLogged) {
      setError("Vous êtes déjà connecté.e");
    } else {
      setError("");
    }
  }, [isLogged]);

  async function Login(formData) {
    setError("");

    const rawLoginData = Object.fromEntries(formData.entries());
    const loginData = Object.fromEntries(
      Object.entries(rawLoginData).map(([key, value]) => [key, value.trim()])
    );

    if (!loginData.username || !loginData.password) {
      setError("Please fill in all the fields.");
      return;
    }

    try {
      const response = await fetch("https://dummyjson.com/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: loginData.username,
          password: loginData.password,
        }),
      });

      const res = await response.json();

      if (response.ok && res.accessToken) {
        toggleIsLogged();
        toggleUser(res);
        goTo("/");
      } else {
        setError("Username or password incorrect.");
      }
    } catch (err) {
      setError("An error occurred during the login process. Please try again.");
    }
  }

  return (
    <section className="container mx-auto flex flex-col max-w-sm gap-6">
      <h2 className="text-2xl font-bold text-center">Sign In</h2>
      <form action={Login} className="flex flex-col gap-4">
        {error && (
          <p className="text-red-600 text-sm bg-red-100 p-2 rounded">{error}</p>
        )}
        <div className="flex flex-col gap-2">
          <label htmlFor="">
            Username <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="border rounded-lg px-2 py-1"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="">
            Password <span className="text-red-600">*</span>
          </label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="border rounded-lg px-2 py-1"
          />
        </div>
        <button
          type="submit"
          disabled={isLogged}
          className={`px-3 py-2 text-white rounded-lg w-fit ${
            isLogged
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-black cursor-pointer"
          }`}
        >
          Sign in
        </button>
      </form>
    </section>
  );
}
