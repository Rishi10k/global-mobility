import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  username: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl =
    'https://localhost:7051/api/Auth';

  constructor(
    private http: HttpClient
  ) {}


  login(
    request: LoginRequest
  ): Observable<LoginResponse> {

    return this.http
      .post<LoginResponse>(
        `${this.apiUrl}/login`,
        request
      )
      .pipe(

        tap(response => {

          localStorage.setItem(
            'adminToken',
            response.token
          );

        })

      );
  }


  logout(): void {

    localStorage.removeItem(
      'adminToken'
    );

  }


  isLoggedIn(): boolean {

    return !!localStorage.getItem(
      'adminToken'
    );

  }


  getToken(): string | null {

    return localStorage.getItem(
      'adminToken'
    );

  }

}