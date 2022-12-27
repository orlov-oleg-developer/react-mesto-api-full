const mongoose = require('mongoose');

const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-error');
const BadRequestError = require('../errors/bad-request-error');
const ForbiddenError = require('../errors/forbidden-error');

const statusCode = {
  success: 200,
  created: 201,
};

const getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({}).populate(['owner', 'likes']);
    return res.status(statusCode.success).json(cards);
  } catch (e) {
    return next(e);
  }
};

const createCard = async (req, res, next) => {
  const ownerId = req.user._id;
  const { name, link } = req.body;

  try {
    const card = await Card.create({ name, link, owner: ownerId });
    return res.status(statusCode.created).json(card);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return next(new BadRequestError());
    }
    return next(e);
  }
};

const deleteCard = async (req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  try {
    const card = await Card.findById(cardId);
    if (!card) {
      throw new NotFoundError('Карточка с указанным _id не найдена');
    }

    const cardOwnerId = String(card.owner);

    if (userId !== cardOwnerId) {
      throw new ForbiddenError('У вас нет доступа к удалению этой карточки');
    }

    await card.remove();

    return res.status(statusCode.success).json(card);
  } catch (e) {
    if (e instanceof mongoose.Error.CastError) {
      return next(new BadRequestError());
    }
    return next(e);
  }
};

const likeCard = async (req, res, next) => {
  const { cardId } = req.params;

  try {
    const card = await Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    );

    if (card === null) {
      throw new NotFoundError('Карточка с указанным _id не найдена');
    }

    return res.status(statusCode.success).json(card);
  } catch (e) {
    if (e instanceof mongoose.Error.CastError) {
      return next(new BadRequestError());
    }
    return next(e);
  }
};

const deleteLike = async (req, res, next) => {
  const { cardId } = req.params;

  try {
    const card = await Card.findByIdAndUpdate(
      cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    );

    if (card === null) {
      throw new NotFoundError('Карточка с указанным _id не найдена');
    }

    return res.status(statusCode.success).json(card);
  } catch (e) {
    if (e instanceof mongoose.Error.CastError) {
      return next(new BadRequestError());
    }
    return next(e);
  }
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  deleteLike,
};
