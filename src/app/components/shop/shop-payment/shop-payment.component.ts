import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { RestService } from 'src/app/services/rest.service';
import Swal from 'sweetalert2';
import { Transaction } from 'src/app/models/transaction.model';

@Component({
  selector: 'app-shop-payment',
  templateUrl: './shop-payment.component.html',
  styleUrls: ['./shop-payment.component.css']
})
export class ShopPaymentComponent implements OnInit {
  constructor(private service: RestService) { }

  @Output() submitPayments = new EventEmitter<void>();
  @Input() orderPayment: Product[];
  @Input() totalPayment = 0;
  givenNumber = '0';

  ngOnInit() {
  }

  public get mChange(): number {
    const cash = Number(this.givenNumber.replace(/,/g, ''));
    const result = cash - this.totalPayment;
    if (result >= 0) {
      return result;
    } else {
      return 0;
    }
  }

  onClickGiven(addGiven: number) {
    this.givenNumber = String(Number(this.givenNumber) + addGiven);
  }

  public get isPaidEnough() {
    if (Number(this.givenNumber) >= this.totalPayment) {
      return true;
    }
    return false;
  }

  onClickExact() {
    this.givenNumber = String(this.totalPayment);
  }

  onClickReset() {
    this.givenNumber = '0.0';
  }

  onClickSubmit() {
    const transaction = new Transaction();
    transaction.total = this.totalPayment;
    transaction.paid = Number(this.givenNumber);
    transaction.change = Number(this.givenNumber) - this.totalPayment;
    transaction.paymentType = 'cash';
    transaction.paymentDetail = 'full';
    transaction.sellerId = 'sr0001';
    transaction.buyerId = 'by0000';
    transaction.orderList = JSON.stringify(this.orderPayment);

    this.service.addTransaction(transaction).subscribe(
      data => {
        this.submitPayments.emit(); // emit event of shop.component.html
        Swal.fire({
          position: 'center',
          type: 'success',
          title: data.message,
          showConfirmButton: false,
          timer: 1500
        });
      },
      error => {
        console.log(JSON.stringify(error));
        alert(error.error.message);
      }
    );
  }
}
