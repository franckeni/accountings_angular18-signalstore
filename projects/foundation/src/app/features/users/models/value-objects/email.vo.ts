import { z } from 'zod';
import { ValueObject } from 'zod-value-object'

const MIN_LENGTH: number = 5;

export const EmailSchema = z.string().email({message: "Provide Valid Email Address"}).min(MIN_LENGTH);

export class Email extends ValueObject('Email', EmailSchema) {}
