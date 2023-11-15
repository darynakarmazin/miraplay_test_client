import style from "./Title.module.css";

function AuthorizationTitle() {
  return (
    <>
      <h1 className={style.title}>Вхід</h1>
      <p className={style.subtitle}>
        Увійди, щоб грати на максималках у свої улюблені ігри
      </p>
    </>
  );
}

export default AuthorizationTitle;
