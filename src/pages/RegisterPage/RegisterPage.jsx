import { useDispatch } from "react-redux";
import { useState } from "react";
import { register } from "../../redux/auth/operations";
import RegistrationTitle from "../../components/title/RegistrationTitle";
import style from "./RegisterPage.module.css";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

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
      register({
        email,
        password,
      })
    );
    form.reset();
  };

  return (
    <div className={style.page_container}>
      <RegistrationTitle />

      <form className={style.form} onSubmit={handleSubmit}>
        <label className={style.form_label}>
          Введіть ваш email:
          <input
            className={style.form_input}
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
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </label>
        <button className={style.form_button} type="submit">
          Register
        </button>
      </form>
    </div>
  );
}
