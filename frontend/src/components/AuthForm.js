import { useEffect } from 'react'
import { useForm } from "../hooks/useForm";

export function AuthForm({ onSubmit, loggedIn, buttonValue }) {
  const { values, handleChange, setValues } = useForm({});

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      password: values['form-password-input'],
      email: values['form-mail-input']
    });
  };

  useEffect(() => {
    setValues({
      'form-mail-input': '',
      'form-password-input': '',
    })
  }, [setValues])

  return (
      <form onSubmit={handleSubmit} className="auth__form" name={`register-form`}>
        <label className="auth__form-field">
          <input
            type="mail"
            className="auth__input"
            name="form-mail-input"
            placeholder="Email"
            onChange={handleChange}
            value={values['form-mail-input'] || ''}
          />
          <span className="auth__input-error mail-input-error"/>
        </label>
        <label className="auth__form-field">
          <input
            type="password"
            className="auth__input"
            name="form-password-input"
            placeholder="Пароль"
            onChange={handleChange}
            value={values['form-password-input'] || ''}
          />
          <span className="auth__input-error mail-input-error"/>
        </label>
        <input type="submit" className="auth__submit" name="form-submit" value={buttonValue}/>
      </form>
  )
}
