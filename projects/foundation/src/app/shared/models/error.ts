import { HttpErrorResponse } from '@angular/common/http';

export type ErrorType = HttpErrorResponse | Error | string | null;
