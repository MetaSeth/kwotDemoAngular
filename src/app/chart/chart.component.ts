import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Chart from 'chart.js';
import { pipe } from 'rxjs';

import { PriceService } from '../priceService/price.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, AfterViewInit {
  @ViewChild('btcCanvas') btcCanvas!: ElementRef;
  btcChart!: Chart;
  BtcPrices: Array<number> = new Array();
  labels = ['01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00',
  '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '24:00'];
  constructor(private priceService: PriceService) { }
  ngAfterViewInit(): void {
    this.getBtcPrices();
  }
  ngOnInit(): void {
  }
  getBtcPrices(): void {
    this.priceService.getBtcPrice().subscribe({ next: (btcPrices) => this.chartInit(btcPrices.map(element => parseFloat(element))) });
  }
  chartInit(btcPrices: number[]): void {
    this.btcChart = new Chart(this.btcCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: this.labels,
        datasets: [
          {
            label: 'Today Bitcoin\'s price (EUR)',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: btcPrices,
            spanGaps: false,
          }
        ]
      }
    });
  }

}
