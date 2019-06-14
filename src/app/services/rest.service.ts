import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { User, ResponseLogin, ResponseRegister } from '../models/user.model';
import { Observable } from 'rxjs';
import { TestModel } from '../models/test.model';
import { ResponseProducts, Product, ResponseProduct } from '../models/product.model';
import { StockCount } from '../models/strock.model';
import Swal from 'sweetalert2';
import { Form } from '@angular/forms';
import { Transaction, ResponseTransaction, ResponseTransactions } from '../models/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  private hostURL = environment.baseAPIURL;
  private apiURL = `${this.hostURL}/api/v2`;
  // -----------------------------------------------------
  private loginURL = `${this.apiURL}/Auth/login`;
  private registerURL = `${this.apiURL}/Auth/register`;

  private productURL = `${this.apiURL}/product`;
  private outOfStockURL = `${this.productURL}/count/out_of_stock`;
  private transactionURL = `${this.apiURL}/transaction`;


  // DI
  constructor(private http: HttpClient, ) { }
  // NOTE เมื่อทำการ DI มา ตัวแปลนั้นจะค่าเป็นบนสุด
  // NOTE  http.post<typeRes>(url,model,header?)
  // NOTE  http.get<typeRes>(url,header?)
  // NOTE  localStorage คือตัวที่ใช้ในการ Set ค่า หรือ Get ค่า ใน Local Storage ของ browser

  login(user: User): Observable<ResponseLogin> { // NOTE  การ cast type
    console.log(this.loginURL);
    return this.http.post<ResponseLogin>(this.loginURL, user, { headers: this.headers });
  }

  register(user: User): Observable<ResponseRegister> {
    return this.http.post<ResponseRegister>(this.registerURL, user, { headers: this.headers });
  }

  isLogin(): boolean {
    const authenInfo = JSON.parse(localStorage.getItem(environment.keyLocalAuthenInfo)); // NOTE การ get ค่าจาก Storage
    return authenInfo !== null;
  }

  logout() {
    localStorage.removeItem(environment.keyLocalAuthenInfo);
  }

  getTest(): Observable<TestModel> {
    return this.http.get<TestModel>('https://jsonplaceholder.typicode.com/todos');
  }

  getProduct(): Observable<ResponseProducts> {
    // this.makeJWTManual();
    return this.http.get<ResponseProducts>(`https://localhost:5001/api/v2/Product/GetProduct`, {headers : this.headers});
  }

  getProductCountOfStock(): Observable<StockCount> {
    // this.makeJWTManual();
    return this.http.get<StockCount>(`https://localhost:5001/api/v2/Product/count/out_of_stock`, { headers: this.headers });
  }

  searchProducts(keyword: string): Observable<ResponseProducts> {
    // this.makeJWTManual();

    return this.http.get<ResponseProducts>(
      `${this.productURL}/search/name?keyword=${keyword}`, {
        headers: this.headers
      });
  }

  deleteProductById(id: number): Observable<ResponseProducts> {
    // this.makeJWTManual();
    return this.http.get<ResponseProducts>(`https://localhost:5001/api/v2/Product/DeleteProduct/${id}`, { headers: this.headers });
  }


  addProduct(data: FormData): Observable<ResponseRegister> { // NOTE หากจะส่งไฟล์ ห้ามมี Header เพราะเป็น  json type
    return this.http.post<ResponseRegister>(`https://localhost:5001/api/v2/Product/InsertProduct`, data);
  }

  getProducById(id: number): Observable<ResponseProduct> { // NOTE หากจะส่งไฟล์ ห้ามมี Header เพราะเป็น  json type
    return this.http.get<ResponseProduct>(`https://localhost:5001/api/v2/Product/GetProduct/${id}`);
  }

  updateProduct(data: FormData): Observable<ResponseProduct>   {
    return this.http.post<ResponseProduct>(`https://localhost:5001/api/v2/Product/UpdateProduct`, data);
  }

  addTransaction(tranaction: Transaction): Observable<ResponseTransaction> {
    return this.http.post<ResponseTransaction>(`https://localhost:5001/api/v2/Transaction`, tranaction, {
      headers: this.headers
    });
  }

  getTransaction(): Observable<ResponseTransactions> {
    return this.http.get<ResponseTransactions>(`${this.transactionURL}`, {
      headers: this.headers
    });
  }

  getTransactionById(id: string): Observable<ResponseTransaction> {
    return this.http.get<ResponseTransaction>(`https://localhost:5001/api/v2/Transaction/${id}`, {
      headers: this.headers
    });
  }

  // api/v2/Product/count/out_of_stock
  makeJWTManual(id: number) {
    this.headers = new HttpHeaders({
      ' Authorization': 'bearer ' + JSON.parse(
        localStorage.getItem(environment.keyLocalAuthenInfo)
      )
    });
  }
}

