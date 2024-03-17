import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DashboardComponent } from '../dashboard/dashboard.component';
@Component({
  selector: 'app-edit-data',
  templateUrl: './edit-data.component.html',
  styleUrls: ['./edit-data.component.scss'],
})
export class EditDataComponent implements OnInit {
  user: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DashboardComponent>
  ) {}
  ngOnInit(): void {
    if (this.data.dialogType == 'edit') {
      this.user = this.data.user;
    } else {
      this.user = {
        name: '',
        email: '',
        phoneNumber: '',
        status:''
      };
    }
  }
  options: string[] = ['Active', 'Inactive'];

  closeDialog() {
    this.dialogRef.close({
      isESC: false,
      dataToEdit: null,
      dialogType: this.data.dialogType,
    });
  }

  saveData() {
    this.dialogRef.close({
      isESC: false,
      dataToEdit: this.user,
    });
  }

  onSelect(value: any): void {
    this.user.status = value.target.value
  }
}
