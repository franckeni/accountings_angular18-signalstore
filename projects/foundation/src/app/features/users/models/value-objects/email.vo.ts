import { z } from 'zod';
import { ValueObject } from 'zod-value-object'

const MIN_LENGTH = 5;

export const emailSchema = z.string().email({message: "Provide Valid Email Address"}).min(MIN_LENGTH);

export class Email extends ValueObject('Email', emailSchema) {}
