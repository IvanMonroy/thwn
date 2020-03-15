import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { DialogOverviewExampleDialog } from 'src/app/layout/layout.tools';
import { MatDialog, MatSidenav } from '@angular/material';
import { MediaMatcher } from '@angular/cdk/layout';
import { Observable, SubscriptionLike } from 'rxjs';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { GlobalThingsService } from 'src/app/services/global/global-things.service';
declare var jQuery: any;
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit, OnDestroy {
  news: any;
  dataFiltered: Observable<any[]>;
  filter: FormControl;
  filter$: Observable<string>;
  model: string = 'index_news/index_pp';
  icon: string;
  color = 'primary';
  mode = 'indeterminate';
  value = 50;
  subscription: SubscriptionLike;
  newVehicle: Observable<any[]>;

  
  mobileQuery: MediaQueryList;
  mobileQuery2: MediaQueryList;
  @ViewChild("sidenav", { static: true }) sidenav: MatSidenav;
  title = 'tecni-hidraulicos';

  constructor(
    public dialog: MatDialog,
    media: MediaMatcher,
    private globalService: GlobalThingsService,
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
   ) {
    this.mobileQuery = media.matchMedia("(max-width: 770px)");
    this.mobileQuery2 = media.matchMedia("(max-width: 520px)");
    console.log(this.mobileQuery)

    this.subscription =  this.globalService.GetAllModel(this.model).subscribe((data: any[]) => {
      console.log(data);
      this.news = data['data'];
    })

    console.log("Subscription " + this.title + this.subscription.closed);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '100%',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  ngOnInit() {
   
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
    console.log(this.subscription.closed);
  }

}
