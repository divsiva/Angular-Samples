import { AfterViewInit, Component } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { ChartService } from '../../app/services/chart-service.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
   selector: 'app-charts',
   templateUrl: './charts.component.html',
   styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements AfterViewInit {
   private amchart: am4charts.XYChart;
   width = 550;
   height = 400;
   chart: any;
   dateAxis: any;
   dropdownList = [];
   selectedItems = [];
   dropdownSettings = {};
   neighborhoodGroup: any;
   selectedText: string;
   valueAxis: any;
   series: any;
   chartData = [];

   constructor(private chartService: ChartService) { }
   async ngAfterViewInit() {
      let chartDataSheet;
      am4core.useTheme(am4themes_animated);
      await this.chartService.getChartData().subscribe(
         data => {
            chartDataSheet = data;
            for (let i = 0; i < chartDataSheet.Sheet1.length; i++) {
               chartDataSheet.Sheet1[i]['businessStartDate'] = chartDataSheet.Sheet1[i]['businessStartDate'].split('/')[2];
            }
            this.getCount(chartDataSheet.Sheet1)
         }
      )
      this.chart = am4core.create("chartdiv", am4charts.XYChart);

      this.dateAxis = this.chart.xAxes.push(new am4charts.DateAxis());
      this.dateAxis.renderer.grid.template.location = 0;
      this.chart.paddingLeft = 0;

      this.dropdownList = [
         { item_id: 1, item_text: 'Bayview Hunters Point' },
         { item_id: 2, item_text: 'Bernal Heights' },
         { item_id: 3, item_text: 'Castro/Upper Market' },
         { item_id: 4, item_text: 'Chinatown' },
         { item_id: 5, item_text: 'Excelsior' },
         { item_id: 6, item_text: 'Financial District/South Beach' },
         { item_id: 7, item_text: 'Haight Ashbury' },
         { item_id: 8, item_text: 'Hayes Valley' },
         { item_id: 9, item_text: 'Inner Richmond' },
         { item_id: 10, item_text: 'Inner Sunset' },
         { item_id: 11, item_text: 'Marina' },
         { item_id: 12, item_text: 'Mission' },
         { item_id: 13, item_text: 'Mission Bay' },
         { item_id: 14, item_text: 'Nob Hill' },
         { item_id: 15, item_text: 'Noe Valley' },
         { item_id: 16, item_text: 'Oceanview/Merced/Ingleside' },
         { item_id: 17, item_text: 'Outer Mission' },
         { item_id: 18, item_text: 'Outer Richmond' },
         { item_id: 19, item_text: 'Pacific Heights' },
         { item_id: 20, item_text: 'Potrero Hill' },
         { item_id: 21, item_text: 'Presidio Heights' },
         { item_id: 22, item_text: 'Russian Hill' },
         { item_id: 23, item_text: 'South of Market' },
         { item_id: 24, item_text: 'Sunset/Parkside' },
         { item_id: 25, item_text: 'Tenderloin' },
         { item_id: 26, item_text: 'Treasure Island' },
         { item_id: 27, item_text: 'West of Twin Peaks' },
         { item_id: 28, item_text: 'Western Addition' },
         { item_id: 29, item_text: 'undefined' }
      ];
      this.selectedItems = [
         { item_id: 6, item_text: 'Financial District/South Beach' }
      ];
      this.dropdownSettings = {
         singleSelection: false,
         idField: 'item_id',
         textField: 'item_text',
         itemsShowLimit: 5,
         enableCheckAll: false,
         limitSelection: 5,
      };
   }
   getCount(chartData) {
      var counter = {}; let counter1 = [];
      chartData.forEach(function (obj) {
         var key = JSON.stringify(obj);
         counter[key] = (counter[key] || 0) + 1;
      });
      for (var prop in counter) {
         var temp = JSON.parse(prop);
         temp['count'] = counter[prop];
         counter1.push(temp);
      }
      this.neighborhoodGroup = counter1.reduce((r, a) => {
         r[a.Neighborhoods] = [...r[a.Neighborhoods] || [], a];
         return r;
      }, {});
      console.log(this.neighborhoodGroup, 'neighbour')
      for (let key in this.neighborhoodGroup) {
         this.neighborhoodGroup[key].sort((a, b) => parseFloat(a.businessStartDate) - parseFloat(b.businessStartDate));
      }
      this.chart.data = this.generateChartData();
      this.createAxisAndSeries(this.selectedItems[0].item_text);
   }
  
   onItemSelect(item: any) {
      this.selectedText = item.item_text;
      let year;
      for (let i = 0; i < this.neighborhoodGroup[this.selectedText].length; i++) {
         year = this.neighborhoodGroup[this.selectedText][i].businessStartDate;
         this.chartData.push( {
            "date": new Date(year, 0),
            [this.selectedText]: this.neighborhoodGroup[this.selectedText][i].count
         })
      }
      this.valueAxis.tooltip.disabled = true;
      this.series = this.chart.series.push(new am4charts.LineSeries());
      this.series.dataFields.dateX = "date";
      this.series.dataFields.valueY = this.selectedText;
      this.series.id = this.selectedText;
      this.amchart = this.chart;
   }
   onItemDeSelect(item: any) {
      this.chart.series.removeIndex(
         this.chart.series.indexOf(this.chart.map.getKey(item.item_text))
      ).dispose();
   }

   createAxisAndSeries(field: any) {
      this.valueAxis = this.chart.yAxes.push(new am4charts.ValueAxis());
      this.valueAxis.tooltip.disabled = true;
      this.valueAxis.min = 0;
      this.valueAxis.max= 10;
      this.valueAxis.title.text = "No: of Business";
      this.valueAxis.title.fontWeight = "bold";
      this.series = this.chart.series.push(new am4charts.LineSeries());
      this.series.dataFields.dateX = "date";
      this.series.dataFields.valueY = field;
      this.series.id = field;
      this.dateAxis.baseInterval = {
         "timeUnit": "year",
         count: 1
      }
      this.dateAxis.title.text = 'Year';
      this.dateAxis.title.fontWeight = "bold";
      this.chart.cursor = new am4charts.XYCursor();
      this.chart.scrollbarX = new am4core.Scrollbar();
      this.amchart = this.chart;
   }
  
   generateChartData() {
      let year;
      let selectedItem = this.selectedItems[0].item_text;
      for (let i = 0; i < this.neighborhoodGroup[selectedItem].length; i++) {
         year = this.neighborhoodGroup[selectedItem][i].businessStartDate;
         this.chartData.push({
            "date": new Date(year, 0),
            [selectedItem]: this.neighborhoodGroup[selectedItem][i].count,
         })
      }
      return this.chartData;
   }
}
