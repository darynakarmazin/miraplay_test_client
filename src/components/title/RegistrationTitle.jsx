import style from "./Title.module.css";

function RegistrationTitle() {
  return (
    <>
      <h1 className={style.title}>Реєстрація</h1>
      <p className={style.subtitle}>
        Зареєструйся, щоб грати на максималках у свої улюблені ігри
      </p>
    </>
  );
}

export default RegistrationTitle;
