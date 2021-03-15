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
    // this.getBtcPrices();
    this.btcChart = new Chart(this.btcCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: ['1h', '2h', '3h', '4h', '5h', '6h', '7h', '8h', '9h', '10h', '11h', '12h', '13h', '14h', '15h', '16h', '17h', '18h', '19h', '20h', '21h', '22h', '23h', '24h'],
        datasets: [
          {
            label: 'Today Bitcoin price',
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
