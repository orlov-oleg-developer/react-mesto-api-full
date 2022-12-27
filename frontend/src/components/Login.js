import {AuthForm} from "./AuthForm";

export function Login({ onLogin, isLoggedIn }) {

  return (
    <section className="auth">
      <h2 className="auth__title">Вход</h2>
      <AuthForm onSubmit={onLogin} loggedIn={isLoggedIn} buttonValue={'Войти'}/>
    </section>
  )
}
