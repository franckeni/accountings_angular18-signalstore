import { expect, test} from '@jest/globals';
import { UserModel } from './user.model';
import { Email } from './value-objects/email.vo';
import { Password } from './value-objects/password.vo';

describe('UserModel', () => {
  /*
  Not necessary to test the right email and right password here since it is done in value object
  Just test the presence of these parameters to create UserModel instance
  */
  test('should create an instance', () => {

    const email = new Email('test@test.fr');
    const password = new Password('jfd.FDH5467_)');
    const model = new UserModel(email, password);

    expect(model).toMatchObject({
      email,
      password
    })
  });
});
