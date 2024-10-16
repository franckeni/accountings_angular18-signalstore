import { z } from 'zod';
import { ValueObject } from 'zod-value-object';

export const idSchema = z.string().nullable().optional();

export class Id extends ValueObject('Id', idSchema) {}
