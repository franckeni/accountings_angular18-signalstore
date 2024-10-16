import { z } from 'zod';
import { ValueObject } from 'zod-value-object'

const PARENT_MIN_VALUE: number = 1;
const PARENT_MAX_VALUE: number = 8;
const CHILD_MIN_VALUE: number = 10;
const CHILD_MAX_VALUE: number = 999999;

export const AccountsTypeParentNumberSchema = z.number().gte(PARENT_MIN_VALUE).lte(PARENT_MAX_VALUE);
export const AccountsTypeChildNumberSchema = z.number().gte(CHILD_MIN_VALUE).lte(CHILD_MAX_VALUE);

export class AccountsTypeParentNumber extends 
    ValueObject('AccountsTypeParentNumber', AccountsTypeParentNumberSchema) {}

export class AccountsTypeChildNumber extends 
    ValueObject('AccountsTypeChildNumber', AccountsTypeChildNumberSchema) {}

    