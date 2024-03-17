import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {
    var storedValue = localStorage.getItem('authToken');
    if (storedValue) {
      this.authService.isLoggedIn = true;
    } else {
      this.router.navigate(['/login']);
      this.authService.removeToken();
    }
  }
}
