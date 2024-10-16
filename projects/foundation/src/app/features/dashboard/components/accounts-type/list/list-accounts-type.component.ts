import { AsyncPipe, isPlatformBrowser } from '@angular/common';
import { Component, effect, inject, PLATFORM_ID, Type } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { accountsTypeStore } from '../../../../../adapters/accounts-type/state/store.state';
import { HttpErrorComponent } from '../../../../../shared/components/http/http.component';
import { AccountsType, AccountsTypeResponseDTO } from '../../../../../domain/accounts-type/models';
import { accountsTypeGetUsecaseProvider, accountsTypeListUsecaseProvider } from '../../../../../adapters/accounts-type/providers';
import { PAGES_TITLES } from '../../../../../shared/utils/constants';
import { SnackbarService } from '../../../../../shared/services/snackbar.service';
import { DialogService } from '../../../../../shared/services/dialog.service';
import { Actions } from '../../../../../shared/utils/constants';
import { EditCreateAccountsTypeDialogComponent } from '../dialog-form/edit/dialog-form.component';
import { DeleteAccountsTypeDialogComponent } from '../dialog-form/delete/delete.component';
import { Utils } from '../../../../../shared/utils/utils';

@Component({
  selector: 'app-list-accounts-type',
  standalone: true,
  imports: [AsyncPipe, HttpErrorComponent, MatButtonModule, MatProgressSpinner, MatIconModule, RouterLink],
  templateUrl: './list-accounts-type.component.html',
  styleUrl: './list-accounts-type.component.scss',
  providers: [accountsTypeGetUsecaseProvider, accountsTypeListUsecaseProvider],
})
export class ListAccountsTypeComponent {
  readonly router = inject(Router);
  readonly route = inject(ActivatedRoute);
  readonly store = inject(accountsTypeStore);
  readonly snackbarService = inject(SnackbarService);
  readonly dialogService = inject(DialogService<AccountsType>);
  readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  // Make Actions Available in template
  ACTIONS = Actions;

  constructor() {
    this.restoreClosedDialog();

    effect(() => {
      this.displayErrorSnackbar();
      this.displaySuccessSnackbar();
    });
  }

  openDialogFormAction(item: AccountsTypeResponseDTO | null, action: Actions): void {
    this.router.navigateByUrl(Utils.getUrlFromAction('AccountsType', action, item?.id as string));

    const dialogRef = this.dialogService.getDialog(this.getDialogComponent(action), item, { action: action });

    dialogRef.afterClosed().subscribe(() => {
      this.store.resetSelected();
      this.store.toggleDialogHadBeenOpened(false, '', '');
      this.router.navigate(['../'], { relativeTo: this.route });
    });
  }

  private restoreClosedDialog(): void {
    // Trigger the dialog widget again if page reloaded when Editing, Creating or Deleting.
    if (this.shouldOpenClosedDialog(this.router.url)) {
      this.openDialogFormAction(this.store.selected()!, this.store.dialog.action() as Actions);
    }
  }

  private shouldOpenClosedDialog(url: string) {
    return Utils.routeStartWithEditOrCreateOrDelete(url, 'AccountsType') && this.store.dialogHadBeenOpenedAndItemSelected();
  }

  private getDialogComponent(action: Actions): Type<unknown> {
    let component: Type<unknown> = EditCreateAccountsTypeDialogComponent;

    switch (action) {
      case Actions.Create:
      case Actions.Edit:
        component = EditCreateAccountsTypeDialogComponent;
        break;
      case Actions.Delete:
        component = DeleteAccountsTypeDialogComponent;
        break;
    }

    return component;
  }

  private displayErrorSnackbar(): void {
    if (this.store.error!()) {
      this.snackbarService.error(PAGES_TITLES['accountsTypeSnackbarFailure'] as string);
    }
  }

  private displaySuccessSnackbar(): void {
    if (this.store.createdOrUpdated()) {
      this.snackbarService.success(PAGES_TITLES['accountsTypeSnackbarSuccess'] as string);
    }
  }
}
