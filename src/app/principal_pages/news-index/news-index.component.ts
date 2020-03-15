import { Component, OnInit } from '@angular/core';
import { Observable, SubscriptionLike } from 'rxjs';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { MediaMatcher } from '@angular/cdk/layout';
import { GlobalThingsService } from 'src/app/services/global/global-things.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-news-index',
  templateUrl: './news-index.component.html',
  styleUrls: ['./news-index.component.scss']
})
export class NewsIndexComponent implements OnInit {
  news:  Observable<any[]>;
  news2:  Observable<any[]>;
  dataFiltered: Observable<any[]>;
  filter: FormControl;
  filter$: Observable<string>;
  model: string = 'index_news/all_news';
  icon: string;
  color = 'primary';
  mode = 'indeterminate';
  value = 50;
  subscription: SubscriptionLike;
  newVehicle: Observable<any[]>;
  title = 'tecni-hidraulicos';
  constructor(
    public dialog: MatDialog,
    media: MediaMatcher,
    private globalService: GlobalThingsService,
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
  ) { 

    this.subscription =  this.globalService.GetAllModel(this.model).subscribe((data: any[]) => {
      console.log(data);
      this.news = data['data'];
      this.news2 = data['title'];
    })

    console.log("Subscription " + this.title + this.subscription.closed);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    console.log(this.subscription.closed);
  }


}
