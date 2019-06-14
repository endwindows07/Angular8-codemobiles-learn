import { Component, OnInit, ViewChild } from '@angular/core';
import { Transaction } from 'src/app/models/transaction.model';
import { RestService } from 'src/app/services/rest.service';
import { TransactionDetailComponent } from '../transaction-detail/transaction-detail.component';
declare var $: any;

@Component({
  selector: 'app-transaction-home',
  templateUrl: './transaction-home.component.html',
  styleUrls: ['./transaction-home.component.css']
})
export class TransactionHomeComponent implements OnInit {

  @ViewChild('testview', {static: true}) trandDetail: TransactionDetailComponent;

  constructor(private restService: RestService) { }
  mTransactionArray: Transaction[];
  ngOnInit() {
    this.feedData();
    $('#jTest').text('Pramot');
  }

  // JQuery // javascript framework
  // dom document object modal

  feedData() {
    this.restService.getTransaction().subscribe(
      data => {
        // console.log(JSON.stringify(data.result));
        this.mTransactionArray = data.result;
      },
      error => {
        console.log(JSON.stringify(error));
      }
    );
  }

  getNumberOfSKU(rawOrder): number {
    const order = JSON.parse(rawOrder);
    return order.length;
  }

  onClickTransactionModal(id) {
    this.trandDetail.feedData(id);
    $('#viewTransactionDetailModal').modal('show'); // NOTE การใช้ jQuery ในการทำ popup modal
  }
}
