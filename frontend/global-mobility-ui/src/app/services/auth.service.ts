import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://localhost:7051/api/Auth';

  constructor(
    private http: HttpClient
  ) {}


  login(request: LoginRequest): Observable<LoginResponse> {

    return this.http
      .post<LoginResponse>(
        `${this.apiUrl}/login`,
        request
      )
      .pipe(

        tap(() => {

          // Temporary authentication state.
          // We will replace this with JWT storage
          // in the next step.

          localStorage.setItem(
            'adminLoggedIn',
            'true'
          );

        })

      );

  }


  logout(): void {

    localStorage.removeItem(
      'adminLoggedIn'
    );

  }


  isLoggedIn(): boolean {

    return localStorage.getItem(
      'adminLoggedIn'
    ) === 'true';

  }

}