import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  
  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Show session expired message
          this.showSessionExpiredMessage();
          
          // Redirect to login page
          this.router.navigate(['/login']);
        }
        
        // Re-throw the error so components can still handle it if needed
        return throwError(() => error);
      })
    );
  }

  private showSessionExpiredMessage(): void {
    alert('Tu sesión ha expirado');
  }
}