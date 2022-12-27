const router = require('express').Router();

const {
  cardIdValidator, cardNameLinkValidator,
} = require('../utils/requests-validators');

const {
  getCards, createCard, deleteCard, likeCard, deleteLike,
} = require('../controllers/cards');

router.get('/', getCards);
router.delete(
  '/:cardId',
  cardIdValidator,
  deleteCard,
);
router.post(
  '/',
  cardNameLinkValidator,
  createCard,
);
router.put(
  '/:cardId/likes',
  cardIdValidator,
  likeCard,
);
router.delete(
  '/:cardId/likes',
  cardIdValidator,
  deleteLike,
);

module.exports = router;
