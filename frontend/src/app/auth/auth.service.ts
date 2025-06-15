import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/env';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiUrl.replace('/tasks', '');

  constructor(private http: HttpClient) { }

  login(credentials: { email: string; password: string }): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/auth/login`, credentials).pipe(
      tap(res => localStorage.setItem('token', res.token))
    );
  }

register(data: { email: string; password: string }): Observable<{ token: string }> {
  return this.http.post<{ token: string }>(`${this.apiUrl}/auth/register`, data).pipe(
    tap(res => localStorage.setItem('token', res.token))
  );
}

  logout() {
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
