import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/authen/login/login.component';
import { RegisterComponent } from './components/authen/register/register.component';
import { StockHomeComponent } from './components/stock/stock-home/stock-home.component';
import { StockCreateComponent } from './components/stock/stock-create/stock-create.component';
import { StockEditComponent } from './components/stock/stock-edit/stock-edit.component';
import { ShopHomeComponent } from './components/shop/shop-home/shop-home.component';
import { TransactionHomeComponent } from './components/transaction/transaction-home/transaction-home.component';
import { TransactionDetailComponent } from './components/transaction/transaction-detail/transaction-detail.component';
import { ReportComponent } from './components/report/report.component';
import { TestComponent } from './components/test/test.component';
import { AuthenGuard } from './services/authen.guard';
import { UnauthenGuard } from './services/unauthen.guard';
import { from } from 'rxjs';

const routes: Routes = [
  { path: 'test', component: TestComponent, },
  { path: 'auth/login', component: LoginComponent},
  { path: 'auth/register', component: RegisterComponent },

  { path: 'stock', component: StockHomeComponent, canActivate: [AuthenGuard]}, // NOTE การใช้ Gruad ในการเช็คสิทธิฺ์ในการเข้าถึง
  { path: 'stock/create', component: StockCreateComponent, canActivate: [AuthenGuard], canDeactivate: [UnauthenGuard]},
  { path: 'stock/edit/:id', component: StockEditComponent, canActivate: [AuthenGuard], canDeactivate: [UnauthenGuard]}, // NOTE : คือ  paramiter เช่่น api/path/:id
  { path: 'shop', component: ShopHomeComponent, canActivate: [AuthenGuard] },
  { path: 'transaction', component: TransactionHomeComponent, canActivate: [AuthenGuard] },
  { path: 'transaction/detail/:id', component: TransactionDetailComponent, canActivate: [AuthenGuard] },
  { path: 'report', component: ReportComponent, canActivate: [AuthenGuard] },
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: '**', redirectTo: 'auth/login' }, // for page not found // NOTE หากไม่มี path ที่ตรงกับตัวไหนเลย ให้มาที่ path....
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
