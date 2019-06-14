import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';
import { Product } from 'src/app/models/product.model';
import { Location } from '@angular/common';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-stock-edit',
  templateUrl: './stock-edit.component.html',
  styleUrls: ['./stock-edit.component.css']
})
export class StockEditComponent implements OnInit {
  productSelected: Product;
  ProductId: number;
  imageSrc: ArrayBuffer | string;
  mIsSubmitted = false;

  constructor(private nativeRoute: ActivatedRoute, // NOTE ActivatedRoute ใช้เช็คว่าส่งค่า params
              private service: RestService,
              private location: Location) {

// tslint:disable-next-line: max-line-length
    this.nativeRoute.params.subscribe(params => this.ProductId = params.id); // NOTE การ query params /api/path/:id **ตรงค่า:idจำเป็นตรงตรงกัน
    console.log(this.ProductId);
    // this.nativeRoute.params.forEach(query => {
    //   this.ProductId = query.id;
    // });
    this.onInitailLoadDAta();
  }

  baseAPIURL = environment.baseAPIURL;


  onInitailLoadDAta() {
    this.service.getProducById(this.ProductId).subscribe( it => {
      console.log(it);
      this.productSelected = it.result;
    }, error => alert(JSON.stringify(error)));
  }

  ngOnInit() {
  }

  onUpdate() {

    const formData = new FormData();
    formData.append('ProductId', this.ProductId.toString());
    formData.append('Name', this.productSelected.name);
    formData.append('Price', this.productSelected.price.toString());
    formData.append('Stock', this.productSelected.stock.toString());
    formData.append('Image', this.productSelected.image);
    this.service.updateProduct(formData).subscribe( it => {
      this.mIsSubmitted = true;
      this.location.back();
    }, error => alert(JSON.stringify(error)));


  }

  onClickBack() {
    this.mIsSubmitted = true;
    this.location.back();
  }

  onUploadImage(event) {
    const metaImage = event.target.files[0];
    if (metaImage) {
      const reader = new FileReader();
      reader.readAsDataURL(metaImage);
      reader.onload = () => { // NOTE callback func
        this.imageSrc = reader.result;
        this.productSelected.image = metaImage;
      };
    }
  }
}
