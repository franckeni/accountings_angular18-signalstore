import { z } from 'zod';
import { it } from '@jest/globals';
import { AccountsTypeParentNumber, AccountsTypeParentNumberSchema } from './number.vo';

describe('AccountsTypeNumber', () => {
  it('should create', () => {
    const accountsTypeNumber = new AccountsTypeParentNumber(1);

    expect(accountsTypeNumber.value).toBeTruthy();
  });

  it('should be false and throw an invalid accountsTypeNumbe', () => {
    const result = AccountsTypeParentNumberSchema.safeParse('jfd.FDH');
    const message: string | undefined = result.error?.flatten().formErrors[0];
    
    expect(result.success).toBeFalsy()
    expect(result.error).toBeInstanceOf(z.ZodError)
    expect(message).toEqual("String must contain at least 8 character(s)");
  });
});
