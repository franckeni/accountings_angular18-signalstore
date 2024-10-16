import { Component, inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { AccountsType, AccountsTypeResponseDTO } from '../../../../../../domain/accounts-type/models';
import { BUTTON_LABELS, PAGES_TITLES } from '../../../../../../shared/utils/constants';
import { AccountsTypeStore } from '../../../../../../adapters/accounts-type/state/store.state';
import { Id } from '../../../../../../shared/valueObjects/id.vo';

@Component({
    selector: 'app-assignments-dialog-form-delete',
    templateUrl: './delete.component.html',
    styleUrls: ['./delete.component.scss'],
    standalone: true,
    imports: [
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions,
        MatDialogClose,
        MatIcon,
    ],
})
export class DeleteAccountsTypeDialog {

  readonly store = inject(AccountsTypeStore);
  readonly dialogRef = inject(MatDialogRef<DeleteAccountsTypeDialog>);
  readonly data = inject<{item: AccountsTypeResponseDTO | null, action: string}>(MAT_DIALOG_DATA);

  currentElement: AccountsTypeResponseDTO | null = this.data.item ?? this.store.selected()!;

  ngOnInit() {
    this.store.toggleDialogHadBeenOpened(true, PAGES_TITLES.AccountsType.delete+this.currentElement!.classNumber, 
                                        this.data.action, BUTTON_LABELS.dialog.delete);
  }

  confirmDelete(): void {
    this.store.delete({id: new Id(this.currentElement!.id!)});
    this.dialogRef.close(true)
  }
}
