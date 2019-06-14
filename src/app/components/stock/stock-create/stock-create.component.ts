import { Component, OnInit } from '@angular/core';
import { Product, ResponseProduct } from 'src/app/models/product.model';
import { Location } from '@angular/common';
import { RestService } from 'src/app/services/rest.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-stock-create',
  templateUrl: './stock-create.component.html',
  styleUrls: ['./stock-create.component.css']
})

export class StockCreateComponent implements OnInit {
  message = '';
  mProduct: Product = new Product();
  imageSrc: ArrayBuffer | string;
  mIsSubmitted = false;

  constructor(private location: Location, private service: RestService, private spiner: NgxSpinnerService) { }

  ngOnInit() {
  }


  submitForm() {
    this.spiner.show();
    const formData = new FormData(); //  หากจะส่งค่ารูป หรือไฟล์
    formData.append('Name', this.mProduct.name);
    formData.append('Price', this.mProduct.price.toString());
    formData.append('Stock', this.mProduct.stock.toString());
    formData.append('Image', this.mProduct.image);

    this.service.addProduct(formData).subscribe(data => {
      this.mIsSubmitted = true;
      if (data != null) {
        setTimeout(() => {
          this.spiner.hide();
          // this.mIsSubmitted = true;
          this.location.back();
        }, 1000);
      }
      this.location.back();
    }, error => alert(JSON.stringify(error)));
  }

  onClickBack() {
    this.mIsSubmitted = true;
    // this.location.back();
  }

  onUploadImage(event) {
    const metaImage = event.target.files[0];
    if (metaImage) {
      const reader = new FileReader();
      reader.readAsDataURL(metaImage);
      reader.onload = () => { // NOTE callback func
        this.imageSrc = reader.result;
        this.mProduct.image = metaImage;
      };
    }
  }
}
