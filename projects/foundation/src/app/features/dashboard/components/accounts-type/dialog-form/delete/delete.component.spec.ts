import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeleteAccountsTypeComponent } from './delete.component';


describe('DeleteAccountsTypeComponent', () => {
  let component: DeleteAccountsTypeComponent;
  let fixture: ComponentFixture<DeleteAccountsTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [DeleteAccountsTypeComponent]
})
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteAccountsTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
