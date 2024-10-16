import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { NgFor, AsyncPipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel, MatHint } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { AccountsTypeStore } from '../../../../../../adapters/accounts-type/state/store.state';
import { AccountsType, AccountsTypeResponseDTO, AccountsTypeUpdate } from '../../../../../../domain/accounts-type/models';
import { BUTTON_LABELS, PAGES_TITLES } from '../../../../../../shared/utils/constants';
import { Id } from '../../../../../../shared/valueObjects/id.vo';

@Component({
    selector: 'app-accounts-type-dialog-form',
    templateUrl: './dialog-form.component.html',
    styleUrls: ['./dialog-form.component.scss'],
    standalone: true,
    imports: [
        MatDialogClose,
        MatIcon,
        MatDialogTitle,
        MatDialogContent,
        FormsModule,
        ReactiveFormsModule,
        MatFormField,
        MatInput,
        MatLabel,
        MatSelect,
        NgFor,
        MatOption,
        MatHint,
        AsyncPipe,
    ],
})
export class EditCreateAccountsTypeDialog {
  readonly store = inject(AccountsTypeStore);
  readonly router = inject(Router);
  readonly route = inject(ActivatedRoute);
  readonly dialogRef = inject(MatDialogRef<EditCreateAccountsTypeDialog>);
  readonly data = inject<{item: AccountsTypeResponseDTO | null, action: string}>(MAT_DIALOG_DATA);

  formBuilder = inject(FormBuilder);
  mainFormGroup!: FormGroup;

  classNumberHint: string = '';
  readonlyClassNumber: boolean = false;
  currentElement: AccountsTypeResponseDTO | null = this.data.item ?? this.store.selected();

  ngOnInit(): void {
    this.initCurrentDialogInfos(this.data.action);
    this.initForm();
  }

  initForm(): void {
    this.mainFormGroup = this.formBuilder.group({
      id: [!!this.currentElement ? this.currentElement!.id : ''],
      title: [!!this.currentElement ? this.currentElement!.title : '', 
        [Validators.required, Validators.minLength(3)]],
      classNumber: [!!this.currentElement ? this.currentElement!.classNumber : '', 
        [Validators.required, Validators.pattern("^[0-9]*$")]],
      parentId: [!!this.currentElement ? this.currentElement!.parentId : ''],
    })
  }

  onSubmitForm(): void {
    if (this.mainFormGroup.valid) {
      let result: AccountsTypeUpdate = this.mainFormGroup.value;

      !!(result.id) ? 
      this.store.update({id: new Id(result.id), accountsType: result}) :
      this.store.save({accountsType: result as AccountsType});

      this.dialogRef.close(result)
    }
  }

  initCurrentDialogInfos(action: string) {
    const title = this.currentElement ? PAGES_TITLES.AccountsType.edit + this.currentElement?.classNumber :
                  PAGES_TITLES.AccountsType.create;
    const submitButtonText = this.currentElement ? BUTTON_LABELS.dialog.patch : BUTTON_LABELS.dialog.add;

    this.store.toggleDialogHadBeenOpened(true, title, action, submitButtonText);
  }
}
