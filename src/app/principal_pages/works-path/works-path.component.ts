import { Component, OnInit, OnDestroy } from '@angular/core';
import { SubscriptionLike, Observable, combineLatest } from 'rxjs';
import { FormControl } from '@angular/forms';
import { GlobalThingsService } from 'src/app/services/global/global-things.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { map, startWith } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';

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
    private _sanitizer: DomSanitizer,
  ) {
    this.activatedRoute.data.subscribe(data => {
      document.title = data.title,
        this.model = '/our_works/index_for_menu',
        this.icon = data.items_icon,
        this.tittle = data.title
      });

   }

  ngOnInit() {

    this.subscription =  this.globalService.GetAllModel(this.model).subscribe((data: any[]) => {
      for(var i = 0; i < data['data'].length; i++){
      data['data'][i].image1 = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'  + data['data'][i].image_one);
      data['data'][i].image2 = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'  + data['data'][i].image_two);
      }
      this.data = data['data']
    })
    
   
  
    console.log("Subscription " + this.tittle + this.subscription.closed);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    console.log(this.subscription.closed);
  }

}
