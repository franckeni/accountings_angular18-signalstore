import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogClose } from "@angular/material/dialog";
import { MatIcon } from "@angular/material/icon";
import { MatCard, MatCardHeader, MatCardAvatar, MatCardTitle, MatCardSubtitle, MatCardContent } from "@angular/material/card";

@Component({
    selector: 'app-dialog-error-http',
    templateUrl: 'http.dialog.html',
    styleUrl: './http.dialog.scss',
    standalone: true,
    imports: [
        MatCard, 
        MatDialogClose, 
        MatIcon, 
        MatCardHeader, 
        MatCardAvatar, 
        MatCardTitle, 
        MatCardSubtitle, 
        MatCardContent]
})
  export class HttpErrorDialog {
    message: string;
    status: number;
    statusText?: string;

    constructor(
        public dialogRef: MatDialogRef<HttpErrorDialog>, 
        @Inject(MAT_DIALOG_DATA) public data: { message: string, status: number, statusText?: string}) 
    {
        this.message = this.data.message
        this.status = this.data.status
        this.statusText = this.data.statusText
    }

    onNoClick(): void {
        this.dialogRef.close(false)
    }
  }