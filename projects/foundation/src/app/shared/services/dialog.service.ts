import { inject, Injectable, Type } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ROUTES_PATHS } from '../utils/constants';
import { Actions, DialogOptions, DialogSizes } from '../models/common';

@Injectable({
  providedIn: 'root'
})
export class DialogService<T> {
  dialog = inject(MatDialog);

  private url!: string;

  getDialog(component: Type<any>, item: T | undefined, options: DialogOptions): MatDialogRef<T, any> {
    const size: string = this.getSize(options.action!);

    return this.dialog.open(component, {
      id: options.id ?? '',
      data: {item: item, action: options.action!},
      height: size,
      width: size
    })
  }

  private getSize(action: Actions): string {
    let size = DialogSizes.big;

    switch (action) {
      case Actions.create:
      case Actions.edit:
        size = DialogSizes.big;
        break;
      case Actions.delete:
        size = DialogSizes.extraSmall;
        break;
    }

    return size;
  }
}