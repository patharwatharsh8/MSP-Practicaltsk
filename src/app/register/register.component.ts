import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm!: FormGroup;
  options: string[] = ['Active', 'Inactive'];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      phoneNumber: [''],
      status: ['']
    });
  }
//Task no 1001
  register(): void {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe(res=>{
        this.router.navigate(['/login']);
        alert('User Registered Successfully');
      },(error)=>{
        console.error('error in register');
      });
    }
  }
  onSelect(value: any): void {
    this.registerForm?.get('status')?.setValue(value.target.value);
  }
}
