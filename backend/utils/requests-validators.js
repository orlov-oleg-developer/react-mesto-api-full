const { celebrate, Joi } = require('celebrate');
const { linkRegex } = require('./constants');

const userDataValidator = celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string()
        .min(2)
        .max(30),

      about: Joi.string()
        .min(2)
        .max(30),

      avatar: Joi.string()
        .pattern(linkRegex),

      email: Joi.string()
        .email()
        .required(),

      password: Joi.string()
        .required(),
    }),
});

const emailPasswordValidator = celebrate({
  body: Joi.object()
    .keys({
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string()
        .required(),
    }),
});

const userIdValidator = celebrate({
  params: Joi.object()
    .keys({
      userId: Joi.string()
        .hex()
        .length(24)
        .required(),
    }),
});

const userNameAboutValidator = celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string()
        .min(2)
        .max(30)
        .required(),
      about: Joi.string()
        .min(2)
        .max(30)
        .required(),
    }),
});

const userAvatarValidator = celebrate({
  body: Joi.object()
    .keys({
      avatar: Joi.string()
        .pattern(linkRegex)
        .required(),
    }),
});

const cardIdValidator = celebrate({
  params: Joi.object()
    .keys({
      cardId: Joi.string()
        .hex()
        .length(24)
        .required(),
    }),
});

const cardNameLinkValidator = celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string()
        .min(2)
        .max(30)
        .required(),
      link: Joi.string()
        .pattern(linkRegex)
        .required(),
    }),
});

module.exports = {
  userDataValidator,
  emailPasswordValidator,
  userIdValidator,
  userNameAboutValidator,
  userAvatarValidator,
  cardIdValidator,
  cardNameLinkValidator,
};
