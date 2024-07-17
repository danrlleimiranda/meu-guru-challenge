import * as Joi from 'joi';

const invalidMessage = 'Invalid email or password';
const filled = 'All fields must be filled';
export const loginSchema = Joi.object({
  login: Joi.string()
    .pattern(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i)
    .required()
    .messages({
      'any.required': filled,
      'string.empty': filled,
      'string.pattern.base': invalidMessage,
    }),
  password: Joi.string().min(6).required().messages({
    'any.required': filled,
    'string.min': invalidMessage,
    'string.empty': filled,
  }),
});
