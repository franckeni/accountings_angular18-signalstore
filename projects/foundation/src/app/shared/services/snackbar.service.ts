import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  readonly SNACKBAR_DURATION = 5;
  readonly _snackbar = inject(MatSnackBar);

  error(message: string, duration: number = this.SNACKBAR_DURATION) {
    return this._snackbar.open(message, '', {
      duration: duration * 1000,
      panelClass: ['red-snackbar'],
    });
  }

  success(message: string, duration: number = this.SNACKBAR_DURATION) {
    return this._snackbar.open(message, '', {
      duration: duration * 1000,
      panelClass: ['green-snackbar'],
    });
  }

  info(message: string, duration: number = this.SNACKBAR_DURATION) {
    return this._snackbar.open(message, '', {
      duration: duration * 1000,
      panelClass: ['info-snackbar'],
    });
  }
}
