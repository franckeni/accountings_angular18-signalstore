import { z } from 'zod';
import { ValueObject } from 'zod-value-object'

const PARENT_MIN_VALUE = 1;
const PARENT_MAX_VALUE = 8;
const CHILD_MIN_VALUE = 10;
const CHILD_MAX_VALUE = 999999;

export const accountsTypeParentNumberSchema = z.number().gte(PARENT_MIN_VALUE).lte(PARENT_MAX_VALUE);
export const accountsTypeChildNumberSchema = z.number().gte(CHILD_MIN_VALUE).lte(CHILD_MAX_VALUE);

export class AccountsTypeParentNumber extends 
    ValueObject('AccountsTypeParentNumber', accountsTypeParentNumberSchema) {}

export class AccountsTypeChildNumber extends 
    ValueObject('AccountsTypeChildNumber', accountsTypeChildNumberSchema) {}

    