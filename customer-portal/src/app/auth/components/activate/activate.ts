import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-activate',
  standalone: true,
   imports: [FormsModule, CommonModule],
  templateUrl: './activate.html',
  styleUrl: './activate.scss'
})
export class ActivateComponent implements OnInit {

  message = '';
 isError = false;

  constructor(
    private route: ActivatedRoute,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    console.log("🔥 ActivateComponent loaded");
    const token = this.route.snapshot.queryParamMap.get('token');
    console.log("🔍 Activation token:", token);
    if (token) {
      this.auth.activate(token).subscribe({
       next: () => {
        console.log("✅ API success");
        this.message = 'Account activated successfully!';
        this.isError = false;
      },
      error: () => {
        console.log("❌ API error");
         this.message = 'Activation failed.';
         this.isError = true;
     }
      });
    }
  }
}
