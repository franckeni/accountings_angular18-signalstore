import { Injectable } from '@angular/core';
import { ErrorType } from '../models/error';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  // Error
  handleError(error: ErrorType) {
    let msg: string | null;

    if (error instanceof HttpErrorResponse) {
      // client-side error
      msg = error.error.detail ?? error.error.message ;
    } else if (error instanceof Error) {
      // server-side error
      msg = error.message;
    } else {
      msg = error
    }
  
    return msg;
  }
}
