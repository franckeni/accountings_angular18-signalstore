import { z } from 'zod';
import { ValueObject } from 'zod-value-object'

export const IdSchema = z.string().nullable().optional();

export class Id extends ValueObject('Id', IdSchema) {}
