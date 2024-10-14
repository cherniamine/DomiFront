import { Component,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.css']
})
export class PersonDetailsComponent {
    constructor(
        public dialogRef: MatDialogRef<PersonDetailsComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { nomPrenom: string }
    ) {}

    close(): void {
        this.dialogRef.close();
    }

}
