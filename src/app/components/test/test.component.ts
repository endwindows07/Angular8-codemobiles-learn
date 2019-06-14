import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { TestModel } from 'src/app/models/test.model';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  constructor(private servic:RestService) {
    this,servic.getTest()
      .subscribe(it=>{
        console.log(it);
        this.values = it;
      });
  }

  values: TestModel;

  ngOnInit() {

  }

}
