import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {

  const router=inject(Router);
  const http=inject(HttpClient);

  const token=localStorage.getItem('token');
  if (!token) {
    router.navigate(['/login']);
    return false;
    
  }// Verify token with backend
  return http.get('https://expense-tracker-backend-k359.onrender.com/api/auth/verify-token').pipe(
    map(() => true), // token valid
    catchError(() => {
      localStorage.removeItem('token'); // remove fake token
      router.navigate(['/login']);      // redirect to login
      return of(false);
    })
  );
};

