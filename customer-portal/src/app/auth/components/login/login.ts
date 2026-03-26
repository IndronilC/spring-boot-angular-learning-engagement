import { Component } from '@angular/core';
import { AuthService } from '../../services/auth';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
   imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class LoginComponent {

  form = {
    email: '',
    password: ''
  };

  message = '';

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    this.auth.login(this.form).subscribe({
      next: (res) => {
        this.auth.saveToken(res.accessToken);
        this.router.navigate(['/dashboard']);
      },
      error: () => this.message = 'Invalid credentials'
    });
  }
}