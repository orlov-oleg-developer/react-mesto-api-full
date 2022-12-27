import {AuthForm} from "./AuthForm";

export function Register({ isLoggedIn, onRegister }) {
  return (
    <section className="auth">
      <h2 className="auth__title">Регистрация</h2>
      <AuthForm onSubmit={onRegister} loggedIn={isLoggedIn} buttonValue={'Зарегистрироваться'}/>
      <p className="auth__link">Уже зарегистрированы? Войти</p>
    </section>
  )
}
