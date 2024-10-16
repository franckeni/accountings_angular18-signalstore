import { z } from "zod";
import { Email, EmailSchema } from "./value-objects/email.vo";
import { Password, PasswordSchema } from "./value-objects/password.vo";

export const UserModelSchema = z.object({
    email: EmailSchema,
    password: PasswordSchema
})

export class UserModel {
    constructor(
        public readonly email: Email,
        public readonly password: Password
        ) {}
}