import { useTheme } from "../contexts/LoginProvider.jsx";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import LoginForm from "../components/loginForm.jsx";

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

  async function LogUser(formData) {
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
    } catch {
      setError("An error occurred during the login process. Please try again.");
    }
  }

  return (
    <section className="container mx-auto flex flex-col max-w-sm gap-6">
      <h2 className="text-2xl font-bold text-center">Sign In</h2>
      <LoginForm onSubmit={LogUser} error={error} isDisabled={isLogged} />
    </section>
  );
}
