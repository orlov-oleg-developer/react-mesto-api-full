import { CurrentUserContext } from '../contexts/CurrentUserContext.js'
import { useEffect, useContext } from 'react'
import { useForm } from "../hooks/useForm";
import PopupWithForm from "./PopupWithForm"

export function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, setValues } = useForm({});

  const handleSubmit = (event) => {
    event.preventDefault();
    onUpdateUser({
      name: values['form-name-input'],
      about: values['form-job-input']
    })
  };

  useEffect(() => {
    setValues({
      'form-name-input': currentUser.name,
      'form-job-input': currentUser.about,
    })
  }, [currentUser, isOpen, setValues])

  return (
    <PopupWithForm
      title='Редактировать профиль'
      name='profile'
      buttonValue="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__form-field">
        <input
          className="popup__input"
          onChange={handleChange}
          value={values['form-name-input'] || ''}
          id="name-input"
          type="text"
          name="form-name-input"
          minLength="2"
          maxLength="40"
          required
          placeholder="Имя"
        />
        <span className="popup__input-error name-input-error"/>
      </label>
      <label className="popup__form-field">
        <input
          className="popup__input"
          onChange={handleChange}
          value={values['form-job-input'] || ''}
          id="description-input"
          type="text"
          name="form-job-input"
          minLength="2"
          maxLength="200"
          required
          placeholder="Описание"
        />
        <span className="popup__input-error description-input-error"/>
      </label>
    </PopupWithForm>
  )
}

