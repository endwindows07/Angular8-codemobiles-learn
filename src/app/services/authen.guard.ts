import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenGuard implements CanActivate {
  constructor(private checkLogin: RestService, private router: Router) {
  }
  // NOTE หาก return true จะสามารถทำงานต่อได้
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // จุดการใช้ในการเช็ค logic ว่าจะสามารถเข้าอะไรได้บ้าง
    if (this.checkLogin.isLogin) {
      return true;
    }
    this.router.navigate(['auth/login']);
    return false;
  }
}
