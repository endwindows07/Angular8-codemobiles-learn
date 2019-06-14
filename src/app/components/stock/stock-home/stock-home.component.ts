import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { ResponseProducts } from 'src/app/models/product.model';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { StockCount } from 'src/app/models/strock.model';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-stock-home',
  templateUrl: './stock-home.component.html',
  styleUrls: ['./stock-home.component.css']
})
export class StockHomeComponent implements OnInit {

  constructor(private service: RestService, private router: Router, private spiner: NgxSpinnerService) { }
  products: ResponseProducts;
  baseAPIURL = environment.baseAPIURL;
  seachTextChanged = new Subject<string>();
  count: StockCount;

  ngOnInit() {
    this.spiner.show();
    this.feedData();
    this.seachTextChanged.pipe(
      debounceTime(1000)
    ).subscribe(term => this.onSearch(term));

  }

  onSearch(term: string) {
    if (term == null || term === '') {
      this.feedData();
      return;
    }

    this.service.searchProducts(term).subscribe( it => {
      this.products = it;
    }, error => alert(error));
    console.log(term);
  }
  feedData() {
    this.service.getProduct().subscribe( it => {
      this.products = it;
      console.log(it);
    }, error =>  alert(error));
    this.service.getProductCountOfStock().subscribe(it => {
      setTimeout(() => {
        this.spiner.hide();
        // this.mIsSubmitted = true;
      }, 1000);
      this.count = it;
      console.log(it);
    }, error => alert(error));

  }

  deleteProduct(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async result => {
        this.service.deleteProductById(id).subscribe(it => {
          alert('delete product success');
          this.feedData();
        }, error => alert(error));
    });
  }

  editProduct(id: number) {
    this.router.navigate([`stock/edit/${id}`]);
  }
}
