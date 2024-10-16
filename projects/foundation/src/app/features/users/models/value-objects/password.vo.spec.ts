import { z } from 'zod';
import { Password, passwordSchema } from './password.vo';

describe('Password', () => {
  it('should create', () => {
    const password = new Password('jfd.FDH5467_');

    expect(password.value).toBeTruthy();
  });

  it('should be false', () => {
    const result = passwordSchema.safeParse('jfd.FDH');
    
    expect(result.success).toBeFalsy()
  });

  it('should be truth', () => {
    const result = passwordSchema.safeParse('jfd.FDH');

    expect(result.error).toBeInstanceOf(z.ZodError)
  });

  it('should throw an invalid password', () => {
    const result = passwordSchema.safeParse('jfd.FDH');
    const message: string | undefined = result.error?.flatten().formErrors[0];

    expect(message).toEqual("String must contain at least 8 character(s)");
  });
});
