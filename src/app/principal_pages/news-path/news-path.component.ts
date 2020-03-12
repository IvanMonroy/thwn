import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, SubscriptionLike } from 'rxjs';
import { FormControl } from '@angular/forms';
import { GlobalThingsService } from 'src/app/services/global/global-things.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-news-path',
  templateUrl: './news-path.component.html',
  styleUrls: ['./news-path.component.scss']
})
export class NewsPathComponent  implements OnInit, OnDestroy {
  data: Observable<any[]>;
  header: Observable<any[]>;
  dataFiltered: Observable<any[]>;
  filter: FormControl;
  filter$: Observable<string>;
  backgroudBanner: string;
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
    private route: ActivatedRoute,
    private activatedRoute: ActivatedRoute,
  ) {
    this.activatedRoute.data.subscribe(data => {
      document.title = data.title,
        this.model = 'index_news/info_new/',
        this.icon = data.items_icon,
        this.tittle = data.title
      });
      this.model = this.model + this.route.snapshot.paramMap.get('id');
 }

  ngOnInit() {
    this.subscription =  this.globalService.GetAllModel(this.model).subscribe((data: any[]) => {
      this.data = data['data'];
      this.backgroudBanner = data['data'].img_url_one
      this.header = data['title'];
       console.log(this.backgroudBanner);  })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    console.log(this.subscription.closed);
  }
}
