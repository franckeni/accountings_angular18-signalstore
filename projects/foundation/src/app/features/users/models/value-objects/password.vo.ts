import { z } from 'zod';
import { ValueObject } from 'zod-value-object'

const MAX_LENGTH: number = 8;

export const PasswordSchema = z.string().min(MAX_LENGTH);

export class Password extends 
    ValueObject('Password', PasswordSchema) {}
