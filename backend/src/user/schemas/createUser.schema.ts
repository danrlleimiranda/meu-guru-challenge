const filled = 'All fields must be filled';
import * as Joi from 'joi';
const invalidMessage = 'Invalid email or password';
export const createUserSchema = Joi.object({
  email: Joi.string()
    .pattern(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i)
    .max(140)
    .required()
    .messages({
      'any.required': filled,
      'string.empty': filled,
      'string.pattern.base':
        "email must follow this pattern 'example@example.com'",
    }),
  document: Joi.string().max(30).required().messages({
    'any.required': filled,
    'string.empty': filled,
  }),
  role: Joi.string().max(20).required(),
  phone: Joi.string().max(20).required(),
  name: Joi.string().max(140).required(),
  password: Joi.string().min(6).required().messages({
    'any.required': filled,
    'string.min': invalidMessage,
    'string.empty': filled,
  }),
});
