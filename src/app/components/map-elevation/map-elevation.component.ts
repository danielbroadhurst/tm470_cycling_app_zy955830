import { Component, AfterContentInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-map-elevation',
  templateUrl: './map-elevation.component.html',
  styleUrls: ['./map-elevation.component.scss'],
})
export class MapElevationComponent implements AfterContentInit {

  @Input() elevation: [] = [];

  @ViewChild('canvas') chart: ElementRef;

  constructor() { }

  ngAfterContentInit() {    
    setTimeout(() => {
      this.drawChart(this.elevation);
    }, 250);
  }

  drawChart(dataset) {
    let distanceArray = dataset.map(a => a.dist);
    let elevationArray = dataset.map(a => a.ele);
    var config = {
      type: 'line',
      data: {
        labels: distanceArray,
        datasets: [{
          label: 'Elevation',
          backgroundColor: '#00000',
          borderColor: '#00000',
          data: elevationArray,
          fill: false,
        }]
      },
      options: {
        legend: false, 
        responsive: true,
        title: {
          display: true,
          text: 'Elevation Chart'
        },
        tooltips: {
          mode: 'index',
          intersect: false,
        },
        hover: {
          mode: 'nearest',
          intersect: true
        },
        scales: {
          xAxes: [{
            ticks: {
              beginAtZero: true
            },
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Distance (km)'
            }
          }],
          yAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Elevation (m)'
            }
          }]
        }
      }
    };
    let ctx = <HTMLCanvasElement> document.getElementById('canvas')
    ctx.getContext('2d');
    new Chart(ctx, config);
  }


}
