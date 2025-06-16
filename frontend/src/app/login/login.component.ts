import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CardModule } from 'primeng/card';
import { AuthService } from '../auth/auth.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    PasswordModule,
    CardModule,
    ToastModule,
    DialogModule,
  ],
})
export class LoginComponent {
  form: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', Validators.required]
    });
  }

  login() {
    if (this.form.valid) {
      this.isLoading = true;
      this.auth.login(this.form.value).subscribe({
        next: () => {
          this.isLoading = false;
          this.router.navigate(['/tasks']);
        },
        error: err => {
          this.isLoading = false;
          console.error('Login error:', err);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao logar na plataforma. Verifique suas credenciais.',
          });
        }
      });
    }
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}