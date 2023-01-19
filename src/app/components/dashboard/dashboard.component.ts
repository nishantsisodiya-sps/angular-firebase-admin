import { Component, OnInit } from '@angular/core';
import { totalUsers } from 'src/app/model/data'; 
import { Totalsales } from 'src/app/model/data';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  //for total users
  totalUsers: any[] =[]

  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;

  colorScheme :any = {
    domain: ["#5AA454", "#A10A28", "#C7B42C", "#AAAAAA" , "#666"]
  };
  view:any = [900, 300]

  //for total sales
  
  totalsales: any[] =[]
  colorScheme2 :any = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };
  view2:any = [1015, 300]
  cardColor: string = '#232837';

  constructor() {
    Object.assign(this , {totalUsers}),
    Object.assign(this , {Totalsales})
   }

  ngOnInit(): void {
  }

  //for total users

  percFormat(value: number): string {
    const str = value.toFixed(1);
    return str;
  }

  onSelect(data: any): void {
    console.log("Item clicked", JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log("Activate", JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log("Deactivate", JSON.parse(JSON.stringify(data)));
  }
  



  
  
  //for total sales
  onSelects(event: any) {
    console.log(event);
  }


}
