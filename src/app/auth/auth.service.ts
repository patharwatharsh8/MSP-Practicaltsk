import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { NavigationExtras, Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnInit {
  isLoggedIn = false;
  userData: any;
  isInvalidUser!: boolean;
  private authToken: string | null = null;

  constructor(private http: HttpClient, private router: Router) {}
  ngOnInit() {}
  token = 'sample_token_generated_on_client_side';

  async login(email: string, password: string) {
    this.userData = await this.getUserData().toPromise();
    let data: any = this.userData.find(
      (data: any) => data.email == email && data.password == password
    );
    if (data && Object.keys(data).length > 0) {
      this.isLoggedIn = true;
      // localStorage.setItem('login', JSON.stringify(data.id));
      const currentUser: NavigationExtras = {
        state: { currentUserData: data },
      };
      this.router.navigate(['/dashboard'], currentUser);
      this.setToken(this.token);
    } else {
      localStorage.removeItem('login');
      this.isInvalidUser = true;
      this.isLoggedIn = false;
    }
  }

  register(data: string) {
    return this.http.post('http://localhost:3000/userData', data);
  }
  edit(id: number, newData: any) {
    return this.http.put(`http://localhost:3000/userData/${id}`, newData);
  }
  getUserById(id: any) {
    return this.http.get(`http://localhost:3000/userData/${id}`);
  }
  getUserByName(name: any) {
    return this.http.get(`http://localhost:3000/userData?name=${name}`);
  }
  removeById(id: string) {
    return this.http.delete(`http://localhost:3000/userData/${id}`);
  }
  LoginFunc() {
    this.isLoggedIn = true;
  }
  getDataList() {
      return this.http.get('http://localhost:3000/userData');
  }

  LogOutFunc() {
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
    localStorage.removeItem('login');
    this.removeToken()
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }

  getUserData() {
    return this.http.get<any>('http://localhost:3000/userData');
  }

  setToken(token: string): void {
    this.authToken = token;
    localStorage.setItem('authToken', token);
  }

  removeToken() {
    this.authToken = null;
    localStorage.removeItem('authToken');
  }
  getToken(): string | null {
    return this.authToken || localStorage.getItem('authToken');
  }
}
