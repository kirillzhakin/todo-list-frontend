import "./AuthForm.css";

function AuthForm(props) {
  return (
    <form className="login__form" noValidate onSubmit={props.onSubmit}>
      <h1 className="login__title">{props.title}</h1>

      <label className="login__label">Логин</label>
      <input
        type="text"
        name="login"
        id="login"
        className="login__input"
        required
        minLength={2}
        pattern="[а-яА-Яa-zA-ZёË\- ]{1,}"
        value={props.login}
        onChange={props.onChange}
      />
      <span className="login__error"></span>
      <label className="login__label">Пароль</label>
      <input
        type="password"
        name="password"
        id="password"
        className="login__input"
        required
        value={props.password}
        onChange={props.onChange}
      />
      <span className="login__error">{props.errorMessage}</span>

      <button type="submit" name="submit" className="login__button">
        {props.buttonText}
      </button>
    </form>
  );
}

export default AuthForm;
