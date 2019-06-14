import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanDeactivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
// NOTE CanDeactivate คือเช็ค ตอนออก
export class UnauthenGuard implements  CanDeactivate<any> { // NOTE any คือทุก component
  constructor(private router: Router, private location: Location) {
  }

// tslint:disable-next-line: max-line-length
  canDeactivate(target: any, currentRoute: ActivatedRouteSnapshot): boolean { // target คืิอ component สามารถ กำห
    if (!target.mIsSubmitted) { // NOTE target.mIsSubmitted<ตัวแปล> เอามาเช็คว่า มีการ submit ไหม

      // mIsSubmitted is status submit of StockCreateComponent, StockEditComponent
      // Fix wrong route history error

      const currentUrlTree = this.router.createUrlTree([], currentRoute); /// NOTE การเช็ค URL ปัจจุบัน
      const currentUrl = currentUrlTree.toString();
      this.location.go(currentUrl);
      return window.confirm('Are you sure?'); // NOTE เช็คว่าต้องการออกหน้ารึป่าว
    }
    return true;
  }
}
