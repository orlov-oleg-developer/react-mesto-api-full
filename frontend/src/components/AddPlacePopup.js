import { useEffect } from "react";
import { useForm } from "../hooks/useForm";
import PopupWithForm from "./PopupWithForm"

export function AddPlacePopup  ({isOpen, onClose, onAddPlace}) {

  const {values, handleChange, setValues} = useForm({});

  const handleSubmit = (event) => {
    event.preventDefault();
    onAddPlace({
      name: values['form-image-name-input'],
      link: values['form-link-input']
    })
  };

  useEffect(() => {
    setValues({
      "form-image-name-input": "",
      "form-link-input": "",});
  }, [isOpen, setValues]);

  return(
    <PopupWithForm
      title='Новое место'
      name='add-cards'
      buttonValue="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__form-field">
        <input
          className="popup__input"
          value={values['form-image-name-input'] || ''}
          onChange={handleChange}
          id="image-name-input"
          type="text"
          name="form-image-name-input"
          minLength="2"
          maxLength="30"
          placeholder="Название"
          required
        />
        <span className="popup__input-error image-name-input-error"></span>
      </label>
      <label className="popup__form-field">
        <input
          className="popup__input"
          value={values['form-link-input'] || ''}
          onChange={handleChange}
          id="link-input"
          type="url"
          name="form-link-input"
          placeholder="Ссылка на картинку"
          required
        />
        <span className="popup__input-error link-input-error"></span>
      </label>
    </PopupWithForm>
  )
}

