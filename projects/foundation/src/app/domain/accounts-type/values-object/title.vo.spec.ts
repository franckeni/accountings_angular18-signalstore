import { z } from 'zod';
import { Title, titleSchema } from './title.vo';

describe('Title', () => {
  it('should create', () => {
    const email = new Title('test@test.fr');

    expect(email.value).toBeTruthy();
  });

  it('should be false', () => {
    const result = titleSchema.safeParse(256);

    expect(result.success).toBeFalsy();
  });

  it('should be truth', () => {
    const result = titleSchema.safeParse(147);

    expect(result.error).toBeInstanceOf(z.ZodError);
  });
});
