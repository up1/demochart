import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexLegend,
  ApexDataLabels,
  ApexOptions,
  ApexPlotOptions,
  ApexTooltip
} from 'ng-apexcharts';
import { DataService } from '../data.service';
import {Record} from '../record';
import { DatePipe } from '@angular/common';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis | ApexYAxis[];
  title: ApexTitleSubtitle;
  colors: string[];
  legend: ApexLegend;
  dataLabels: ApexDataLabels;
  options: ApexOptions;
  plotOptions: ApexPlotOptions;
  tooltip: ApexTooltip;
};

@Component({
  selector: 'app-update-latest',
  templateUrl: './update-latest.component.html',
  styleUrls: ['./update-latest.component.css']
})
export class UpdateLatestComponent implements OnInit {

  @ViewChild('chart') chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  results: Record[];

  constructor(private dataService: DataService, private datePipe: DatePipe) {
  }

  getAllData(): void {
    this.dataService.readData().subscribe(datas => this.generateChart(datas.records));
  }

  generateChart(datas: Record[]) {
    datas = datas.reverse();
    const data1 = new Array();
    const data2 = new Array();
    const data3 = new Array();
    const dataXaxis = new Array();
    let current = -1;
    datas.forEach(data => {
      dataXaxis.push(data.fields.Datetime);
      data1.push(data.fields.Infected);
      data2.push(data.fields.Remedied);
      if (current === -1) {
        data3.push(0);
        current = data.fields.Infected;
      } else {
        data3.push(data.fields.Infected - current);
        current = data.fields.Infected;
      }
      console.log(this.datePipe.transform(data.fields.Datetime, 'dd-LLL-yyyy'));
      console.log(data.fields.Infected);

    });

    const colorsChart = ['#E0298E', '#48C68F', '#FEBC4A'];

    this.chartOptions = {
      colors: colorsChart,
      series: [
        {
          name: 'ติดเชื้อสะสม',
          data: data1,
          type: 'column',
        },
        {
          name: 'หายแล้วสะสม',
          data: data2,
          type: 'column',
        },
        {
          name: 'ติดเชื้อเพิ่มจากเมื่อวาน',
          type: 'line',
          data: data3
        }
      ],
      chart: {
        height: 500,
        type: 'line',
        stacked: false
      },
      title: {
        text: 'ผู้ติดเชื้อ COVID-19 ในประเทศไทย',
        align: 'center',
        style: {
          fontSize: '30'
        }
      },
      dataLabels: {
        enabled: true,
        enabledOnSeries: [2]
      },
      xaxis: {
        type: 'datetime',
        categories: dataXaxis
      },
      yaxis: {
        title: {
          text: 'จำนวนคน',
        },
        min: 0,
        opposite: true,
        axisTicks: {
          show: true
        },
        axisBorder: {
          show: true

        }
      },
      legend: {
        position: 'top',
        horizontalAlign: 'center',
        offsetY: -40,
        fontSize: '15'
      },
      tooltip: {
        fixed: {
          enabled: true,
          position: 'topLeft', // topRight, topLeft, bottomRight, bottomLeft
          offsetY: 30,
          offsetX: 60
        }
      },
    };
  }

  ngOnInit(): void {
    this.getAllData();
  }

}
