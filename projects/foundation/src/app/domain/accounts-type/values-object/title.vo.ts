import { z } from 'zod';
import { ValueObject } from 'zod-value-object';

const MIN_LENGTH = 3;

export const titleSchema = z.string().min(MIN_LENGTH, { message: `Title must be at least ${MIN_LENGTH} characters` });

export class Title extends ValueObject('Title', titleSchema) {}
