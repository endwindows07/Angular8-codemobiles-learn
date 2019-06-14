import { Component, AfterViewInit, OnInit } from '@angular/core';
import { chartJs } from 'chart';
declare var $: any;

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})

export class ReportComponent implements AfterViewInit {

  mReportArray: any[];
  mLabel: any[];

  constructor() {
    this.dummyData();
  }

  ngAfterViewInit(): void {
    // const myChartBar = new chartJs.Chart($('#myChartBar'), {
    //   type: 'bar', // line, radar
    //   data: {
    //     labels: this.mLabel,
    //     datasets: this.mReportArray
    //   },
    //   options: {
    //     responsive: true,
    //     maintainAspectRatio: true,
    //     scales: {
    //       yAxes: [
    //         {
    //           ticks: {
    //             beginAtZero: true
    //           }
    //         }
    //       ]
    //     }
    //   }
    // });

    const myChartLine = new chartJs.Chart(document.getElementById('myChartLine'), {
      type: 'line',
      data: {
        labels: this.mLabel,
        datasets: this.mReportArray
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });

    const myChartRadar = new chartJs.Chart(document.getElementById('myChartRadar'), {
      type: 'radar',
      data: {
        labels: this.mLabel,
        datasets: this.mReportArray.reverse()
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });
  }

  dummyData() {
    this.mLabel = ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'];

    this.mReportArray = [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3, 10],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }
    ];
  }

}
