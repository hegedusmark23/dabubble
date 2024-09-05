import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SidebarService } from '../../services/sidebar.service';
import { RevealPasswordService } from '../../services/reveal-password.service';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss','./log-in.component-2.scss'] 
})
export class LogInComponent {
  authService = inject(AuthService);
  router = inject(Router);
  fb = inject(FormBuilder);
  errorMessage: string | null = null; 
  userInfo = inject(SidebarService);
  revealPasswordService = inject(RevealPasswordService)

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}')]],
    password: ['', [Validators.required]],
  });

  constructor() {}
  

  googleSignIn() {
    this.authService.signInWithGoogle().subscribe({
      next: () => {
        this.router.navigateByUrl('/home');
        this.userInfo.fetchUsers();
        this.userInfo.activeChannelIndex = 0;
      },
      error: (err) => {
        this.errorMessage = err.message;
      }
    });
  }

guestLogin() {
  this.authService.guestLogin().subscribe({
    next: () => {
      this.router.navigateByUrl('/home');
      this.userInfo.fetchUsers();
      this.userInfo.activeChannelIndex = 0;
    },
    error: (err) => {
      console.error('Guest login failed:', err);
    }
  });
}

  onSubmit(): void {
    const rawForm = this.form.getRawValue();
    if (this.form.valid) {
      this.authService.logIn(rawForm.email, rawForm.password).subscribe({
        next: () => {
          this.router.navigateByUrl('/home');
        },
        error: (err) => {
          this.handleError(err.code);
        }
      });
    }
  }

  private handleError(errorCode: string): void {
    switch (errorCode) {
      case 'auth/user-not-found':
        this.errorMessage = 'Es existiert kein Benutzer mit dieser E-Mail-Adresse.';
        break;
      case 'auth/invalid-credential':
        this.errorMessage = 'Falsches E-Mail oder Passwort. Bitte überprüfen und erneut versuchen.';
        break;
      case 'auth/invalid-email':
        this.errorMessage = 'Diese E-Mail-Adresse ist ungültig.';
        break;
      case 'auth/too-many-requests':
        this.errorMessage = 'Zu viele fehlgeschlagene Anmeldeversuche. Bitte versuchen Sie es später erneut.';
        break;
      default:
        this.errorMessage = 'Ein unbekannter Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.';
        break;
    }
  }
}
