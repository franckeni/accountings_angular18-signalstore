import { z } from 'zod';
import { expect, test} from '@jest/globals';
import { AccountsType } from './models';
import { Title } from './values-object/title.vo';
import { AccountsTypeParentNumber } from './values-object/number.vo';

describe('AccountsType', () => {
  /*
  Not necessary to test the right title and number here since it is done in value object
  Just test the presence of these parameters to create AccountsType instance
  */
  test('should create an instance', () => {

    const title = new Title('les comptes de capitaux');
    const classNumber = new AccountsTypeParentNumber(1);

    const model = new AccountsType(title, classNumber);

    expect(model).toMatchObject({
      title,
      classNumber
    })
  });
});
