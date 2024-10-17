import { z } from 'zod';
import { Title, titleSchema } from './values-object/title.vo';
import { Id, idSchema } from '../../shared/valueObjects/id.vo';
import { IBaseModel } from '../base/model';
import {
  AccountsTypeChildNumber,
  accountsTypeChildNumberSchema,
  AccountsTypeParentNumber,
  accountsTypeParentNumberSchema,
} from './values-object/number.vo';

export const accountsTypeSchema = z.object({
  title: titleSchema,
  classNumber: accountsTypeParentNumberSchema.or(accountsTypeChildNumberSchema),
  id: idSchema,
  parentId: idSchema,
});

export interface AccountsType extends IBaseModel {
  title: Title;
  classNumber: AccountsTypeParentNumber | AccountsTypeChildNumber;
  parentId?: Id;
}

/**
 * DTO type for Accounts Type API response.
 */
export type AccountsTypeResponseDTO = z.infer<typeof accountsTypeSchema>;

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
export const accountsTypeListResponseDTO = z.array(accountsTypeSchema);

export type AccountsTypeListResponseDTO = z.infer<typeof accountsTypeListResponseDTO>;
