import { Injectable } from '@angular/core';
import { 
    Router, 
    CanActivate, 
    ActivatedRoute, 
    ActivatedRouteSnapshot, 
    RouterStateSnapshot, 
    UrlTree 
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    try {
      let data = localStorage.getItem('shopUser');
      console.log("User -> ", data);
      if (data === null) {
          this.router.navigate(['/signin']);
          return false;
      }  
      return true;
    } catch (error) {
      console.log('Error :: ', error);
      this.router.navigate(['/signin']);
      return false;
    }
    this.router.navigate(['/signin']);
    return false;
  }
}