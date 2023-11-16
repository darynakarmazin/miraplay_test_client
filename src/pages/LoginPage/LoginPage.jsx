import { useDispatch, useSelector } from "react-redux";
import { clearRegistrationError, logIn } from "../../redux/auth/operations";
import { useState, useEffect } from "react";
import AuthorizationTitle from "../../components/title/AuthorizationTitle";
import style from "./LoginPage.module.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const loginError = useSelector((state) => state.auth.error);

  useEffect(() => {
    if (loginError) {
      toast.error(loginError.message);
    }

    return () => {
      dispatch(clearRegistrationError());
    };
  }, [loginError, dispatch]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        return;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    dispatch(
      logIn({
        email,
        password,
      })
    );
    form.reset();
  };

  return (
    <div className={style.page_container}>
      <AuthorizationTitle />

      <form className={style.form} onSubmit={handleSubmit}>
        <label className={style.form_label}>
          Введіть ваш email:
          <input
            className={style.form_input}
            placeholder="youremail@miraplay.com"
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
          />
        </label>
        <label className={style.form_label}>
          Введіть ваш пароль:
          <input
            className={style.form_input}
            placeholder="ваш пароль"
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </label>
        <button className={style.form_button} type="submit">
          Log In
        </button>
        <ToastContainer theme="dark" />
      </form>
    </div>
  );
}
