import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class RegisterComponent {

  form = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  };

  message = '';

  constructor(private auth: AuthService) {}

  onSubmit() {
    this.auth.register(this.form).subscribe({
      next: (res) => {
       console.log("SUCCESS:", res);
        this.message = res?.message || 'Registration successful';    
      },
      error: (err) => {
        console.error(err);

      this.message =
        err?.error?.message ||
      err?.error?.error ||
     'Registration failed';

      console.log(this.message);
      }
    });
  }
}
