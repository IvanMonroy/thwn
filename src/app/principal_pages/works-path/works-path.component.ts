import { Component, OnInit, OnDestroy } from '@angular/core';
import { SubscriptionLike, Observable, combineLatest } from 'rxjs';
import { FormControl } from '@angular/forms';
import { GlobalThingsService } from 'src/app/services/global/global-things.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-works-path',
  templateUrl: './works-path.component.html',
  styleUrls: ['./works-path.component.scss']
})
export class WorksPathComponent implements OnInit, OnDestroy {
  data: Observable<any[]>;
  header: string;
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
    private activatedRoute: ActivatedRoute,
  ) {
    this.activatedRoute.data.subscribe(data => {
      document.title = data.title,
        this.model = '/works/index_menu',
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
        .filter(data => data.title.toLowerCase().indexOf(filterString.toLowerCase()) !== -1
        ))
    )
    this.subscription = this.data.subscribe()
    console.log("Subscription " + this.tittle + this.subscription.closed);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    console.log(this.subscription.closed);
  }

}
