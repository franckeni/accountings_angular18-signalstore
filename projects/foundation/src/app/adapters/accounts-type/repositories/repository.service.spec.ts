import { TestBed } from '@angular/core/testing';
import { AccountsTypeRepositoryService } from './repository.service';


describe('AccountsTypeRepositoryService', () => {
  let service: AccountsTypeRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountsTypeRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
