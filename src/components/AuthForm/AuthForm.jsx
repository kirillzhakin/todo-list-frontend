import { useForm } from "react-hook-form";
import "./AuthForm.css";

function AuthForm({ title, buttonText, onRegister, onLogin, errorMessage }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  const onSubmit = (data) => {
    if (onLogin) {
      onLogin({ login: data.login, password: data.password });
    }
    if (onRegister) {
      onRegister({ login: data.login, password: data.password });
    }
  };

  return (
    <form className="login__form" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="login__title">{title}</h1>

      <label className="login__label">Логин</label>

      <input
        type="text"
        name="login"
        id="login"
        className="login__input"
        {...register("login", {
          required: "Поле обязательно к заполнению",
          pattern: {
            value:/[A-Za-z]/,
            message: "Формат: Иван/Ivan",
          },
          min: 3,
          max: 10,
          minLength: {
            value: 3,
            message: "Минимальное количество символов 3. Формат: Иван/Ivan",
          },
          maxLength: {
            value: 10,
            message: "Максимльное количество символов 10. Формат: Иван/Ivan",
          },
        })}
      />

      {errors?.login && (
        <span className="login__error">
          {errors?.login?.message || "Error!"}
        </span>
      )}
      <label className="login__label">Пароль</label>
      <input
        type="password"
        name="password"
        id="password"
        className="login__input"
        {...register("password", {
          required: "Поле обязательно к заполнению",
          min: 3,
          minLength: {
            value: 3,
            message: "Минимальное количество символов 3",
          },
        })}
      />
      {errors?.password && (
        <span className="login__error">
          {errors?.password?.message || "Error!"}
        </span>
      )}
      <span className="login__error">{errorMessage}</span>

      <button
        type="submit"
        name="submit"
        className={`login__button  ${isValid ? "" : "login__button_disabled"}`}
        disabled={!isValid}
      >
        {buttonText}
      </button>
    </form>
  );
}

export default AuthForm;
