import PopupWithForm from "./PopupWithForm"

export function ConfirmationPopup ({isOpen, onClose, card, handleConfirmationCardDelete}) {

  const handleSubmit = (event) => {
    event.preventDefault();
    handleConfirmationCardDelete(card)
  };

  return(
    <PopupWithForm
      title='Вы уверены?'
      name='delete-attention'
      buttonValue="Да"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
    </PopupWithForm>
  )
}

