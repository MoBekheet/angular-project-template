import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = '';
      if (error.error instanceof ErrorEvent) {
        // Client-side error
        errorMessage = `Client-side error: ${error.error.message}`;
      } else {
        // Server-side error
        errorMessage = `Server-side error: ${error.status} - ${error.message}`;
      }
      console.error(errorMessage);

      // Updated throwError function with a factory function
      return throwError(() => new Error(errorMessage));
    })
  );
};
