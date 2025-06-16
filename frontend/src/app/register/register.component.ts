import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    PasswordModule,
    CardModule,
    ToastModule,
  ],
  standalone: true,
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
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
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  register() {
    if (this.form.valid) {
      this.isLoading = true;
      this.auth.register(this.form.value).subscribe({
        next: () => {
          this.isLoading = false;
          this.router.navigate(['/tasks']);
        },
        error: err => {
          this.isLoading = false;
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao registrar. Usuário já cadastrado, verifique os dados informados.',
          });
        }
      });
    }
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}