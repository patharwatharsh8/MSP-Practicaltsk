import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { EditDataComponent } from '../edit-data/edit-data.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  currentUser: any;
  userData: any;
  dataSource: any;
  displayedColumns: string[] = ['name', 'email', 'phoneNumber','status', 'actions'];

  constructor(
    private authService: AuthService,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.currentUser = this.router.getCurrentNavigation()?.extras.state;
    this.currentUser = this.currentUser.currentUserData;
  }

  ngOnInit(): void {
    this.updateTableData();
  }

  editDetails(user: any): void {
    const dialogRef = this.dialog.open(EditDataComponent, {
      width: '80%',
      height: '100px',
      data: { user: user ,dialogType:'edit'},
      panelClass: 'custom-dialog-container'
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.dataToEdit && Object.keys(result).length > 0) {
        this.authService
          .edit(result.dataToEdit.id, result.dataToEdit)
          .subscribe((res) => {
          this.updateTableData();
          });
      }
    });
  }

  addDetails(user: any) {
    const dialogRef = this.dialog.open(EditDataComponent, {
      width: '80%',
      height: '100px',
      data: { user: user ,dialogType:'add'},
      panelClass: 'custom-dialog-container'
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.dataToEdit && Object.keys(result).length > 0) {
        this.authService.register(result.dataToEdit).subscribe((res) => {
          // this.currentUser = res;
          this.updateTableData();
        });
      }
    });
  }

  removeUser(user: any) {
      if (user) {
        this.authService.removeById(user.id).subscribe((res) => {
          this.updateTableData();
        });
      }
  }

  logOut() {
    this.authService.LogOutFunc();
  }

  async updateTableData() {
    await this.authService.getDataList().subscribe((res) => {
      this.currentUser = res;
      this.dataSource = new MatTableDataSource(this.currentUser);
    });
  }
}
