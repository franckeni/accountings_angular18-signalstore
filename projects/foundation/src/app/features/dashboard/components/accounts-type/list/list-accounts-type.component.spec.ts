import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAccountsTypeComponent } from './list-accounts-type.component';

describe('ListAccountsTypeComponent', () => {
  let component: ListAccountsTypeComponent;
  let fixture: ComponentFixture<ListAccountsTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListAccountsTypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListAccountsTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
