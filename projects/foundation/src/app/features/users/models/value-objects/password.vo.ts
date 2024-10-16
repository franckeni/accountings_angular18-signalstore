import { z } from 'zod';
import { ValueObject } from 'zod-value-object'

const MAX_LENGTH = 8;

export const passwordSchema = z.string().min(MAX_LENGTH);

export class Password extends 
    ValueObject('Password', passwordSchema) {}
