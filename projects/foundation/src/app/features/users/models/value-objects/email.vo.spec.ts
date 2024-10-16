import { z } from 'zod';
import { Email, EmailSchema } from './email.vo';

describe('Email', () => {
  it('should create', () => {
    const email = new Email('test@test.fr');

    expect(email.value).toBeTruthy();
  });

  it('should be false', () => {
    const result = EmailSchema.safeParse('testtest.fr');

    expect(result.success).toBeFalsy()
  });

  it('should be false', () => {
    const result = EmailSchema.safeParse('@t.com');

    expect(result.success).toBeFalsy()
  });

  it('should be truth', () => {
    const result = EmailSchema.safeParse('testtest.fr');

    expect(result.error).toBeInstanceOf(z.ZodError)
  });

  it('should throw an invalid email', () => {
    const result = EmailSchema.safeParse('testtest.fr');
    const message: string | undefined = result.error?.flatten().formErrors[0];

    expect(message).toEqual("Provide Valid Email Address");
  });
});
