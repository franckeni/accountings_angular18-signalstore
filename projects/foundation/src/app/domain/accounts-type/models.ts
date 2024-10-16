import { z } from "zod";
import { Title, TitleSchema } from "./values-object/title.vo";
import { Id, IdSchema } from "../../shared/valueObjects/id.vo";
import { IBaseModel } from "../base/model";
import {
    AccountsTypeChildNumber, 
    AccountsTypeChildNumberSchema, 
    AccountsTypeParentNumber, 
    AccountsTypeParentNumberSchema } from "./values-object/number.vo";

export const AccountsTypeSchema = z.object({
    title: TitleSchema,
    classNumber: AccountsTypeParentNumberSchema.or(AccountsTypeChildNumberSchema),
    id: IdSchema,
    parentId: IdSchema
})

// First Accounts Type that having classNumber between 1 and 8 are parents
// and naturally, the don't have parentId. IdSchema is Optional Type
const AccountsTypeParentSchema = z.object({
    title: TitleSchema,
    classNumber: AccountsTypeParentNumberSchema,
    id: IdSchema,
    parentId: IdSchema
})

// Need this because when we are creating nested Accounts Yype
const AccountsTypeChildSchema = z.object({
    title: TitleSchema,
    classNumber: AccountsTypeChildNumberSchema,
    id: IdSchema,
    parentId: IdSchema
})

/*/
export class AccountsType implements IBaseModel {
    constructor(
        public readonly title: Title,
        public readonly classNumber: AccountsTypeParentNumber | AccountsTypeChildNumber,
        public readonly id?: Id,
        public readonly parentId?: Id,
        ) {}
}*/

export interface AccountsType extends IBaseModel {
        title: Title,
        classNumber: AccountsTypeParentNumber | AccountsTypeChildNumber,
        parentId?: Id,
}

/**
 * DTO type for Accounts Type API response.
 */
export type AccountsTypeResponseDTO = z.infer<typeof AccountsTypeSchema>

/**
 * 
 */
export class AccountsTypeUpdate implements IBaseModel {
    constructor(
        public readonly id?: Id,
        public readonly parentId?: Id,
        public readonly title?: Title,
        public readonly classNumber?: AccountsTypeParentNumber | AccountsTypeChildNumber,
        ) {}
}

// Nested elements ( for index from 0 to 7 => children in child in parent) in sorted came from bulk elemnts in list.
// So just check if list schema is valid and sorted.item schema respect AccountsTypeParentSchema.
export const AccountsTypeListResponseDTO = z.array(AccountsTypeSchema)

export type AccountsTypeListResponseDTO = z.infer<typeof AccountsTypeListResponseDTO>
