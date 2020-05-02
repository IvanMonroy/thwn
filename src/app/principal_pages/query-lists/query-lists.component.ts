import { Component, OnDestroy, OnInit } from '@angular/core';
import { GlobalThingsService } from '../../services/global/global-things.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, combineLatest, SubscriptionLike } from 'rxjs';

import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { error } from 'util';
import { DialogOverviewExampleDialog } from 'src/app/layout/layout.tools';


@Component({
  selector: 'app-query-lists',
  templateUrl: './query-lists.component.html',
  styleUrls: ['./query-lists.component.scss']
})
export class QueryListsComponent implements OnInit, OnDestroy {

  title = 'app';
  data: Observable<any[]>;
  dataFiltered: Observable<any[]>;
  filter: FormControl;
  filter$: Observable<string>;
  model: string;
  icon: string;
  tittle: string;
  color = 'primary';
  mode = 'indeterminate';
  value = 50;
  subscription: SubscriptionLike;
  newVehicle: Observable<any[]>;


  constructor(
    private globalService: GlobalThingsService,
    private http: HttpClient,
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute
 
  ) { 
    this.activatedRoute.data.subscribe(data => {
      document.title = data.title,
        this.model = data.model,
        this.icon = data.items_icon,
        this.tittle = data.title
      });

  }


  
  ngOnInit() {
   
    this.data = this.globalService.GetAllModel(this.model)
    console.log(this.data);
    this.filter = new FormControl('');
    this.filter$ = this.filter.valueChanges.pipe(startWith(''));
    this.dataFiltered = combineLatest(this.data, this.filter$).pipe(
      map(([datas, filterString]) => datas['data']
        .filter(data => data.name.toLowerCase().indexOf(filterString.toLowerCase()) !== -1
        ))
    )
    this.subscription = this.data.subscribe()
    console.log("Subscription " + this.tittle + this.subscription.closed);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    console.log(this.subscription.closed);
  }

  setToLocalStorage(price: any,mark: any,description: any,available: any,name: any ){
    var array =  {
      "price": price,
      "mark": mark,
      "description": description,
      "available": available,
      "name": name,
    }
    localStorage.setItem(name, JSON.stringify(array));
  }
  findFirst(filter: any){
    (<HTMLInputElement>document.getElementById("filter")).value = filter;
    document.getElementById("filter").focus();

    this.data = this.globalService.GetAllModel(this.model)
    console.log(this.data);
    this.filter = new FormControl('');
    this.filter$ = this.filter.valueChanges.pipe(startWith(filter));
    this.dataFiltered = combineLatest(this.data, this.filter$).pipe(
      map(([datas, filterString]) => datas['data']
        .filter(data => data.name.toLowerCase().indexOf(filterString.toLowerCase()) !== -1
        ))
    )
    this.subscription = this.data.subscribe()
    setTimeout(function(filter1: any){this.focusFirst(filter1)}, 5000)

  }
  focusFirst(filter: any){
    debugger
    (<HTMLInputElement>document.getElementById("filter")).value = filter;
    document.getElementById("filter").focus();
  }


}
