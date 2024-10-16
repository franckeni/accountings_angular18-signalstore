import { z } from 'zod';
import { Email, emailSchema } from './value-objects/email.vo';
import { Password, passwordSchema } from './value-objects/password.vo';

export const userModelSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export class UserModel {
  constructor(
    public readonly email: Email,
    public readonly password: Password,
  ) {}
}
