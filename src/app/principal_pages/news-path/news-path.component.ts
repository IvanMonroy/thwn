import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Observable, SubscriptionLike } from 'rxjs';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { GlobalThingsService } from 'src/app/services/global/global-things.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatSidenav, MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import { PizzaPartyComponent } from '../find-us/find-us.component';

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
  form: FormGroup;

  mobileQuery: MediaQueryList;
  mobileQuery2: MediaQueryList;
  @ViewChild("sidenav", { static: true }) sidenav: MatSidenav;
  @ViewChild("inputFile", { static: true }) myInputVariable: ElementRef;
  title = 'tecni-hidraulicos';
  
  constructor(
    private globalService: GlobalThingsService,
    private http: HttpClient,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private activatedRoute: ActivatedRoute,
    media: MediaMatcher,
    public formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ) {
    this.mobileQuery = media.matchMedia("(max-width: 981px)");
    this.mobileQuery2 = media.matchMedia("(max-width: 520px)");
    console.log(this.mobileQuery)
    this.activatedRoute.data.subscribe(data => {
      document.title = data.title,
        this.model = 'index_news/info_new/',
        this.icon = data.items_icon,
        this.tittle = data.title
      });
      this.model = this.model + this.route.snapshot.paramMap.get('id');


      this.form = this.formBuilder.group({
        email: ['']
      });
 }

  ngOnInit() {
    this.subscription =  this.globalService.GetAllModel(this.model).subscribe((data: any[]) => {
      this.data = data['data'];
      this.backgroudBanner = data['data'].img_url_one
      this.header = data['title'];
       console.log(this.backgroudBanner);  })
  }

  submitForm() {
    var formData: any = new FormData();
        formData.append("email", this.form.get('email').value);
        this.postData( formData)      
  }

  postData(data){
  
    this.http.post('https://willreyn-api.herokuapp.com/api/subscribers/subscribe', data).subscribe((data: any[]) => {
      console.log(data['message']);
     this.openSnackBar(data);
     this.myInputVariable.nativeElement.value = '';
    }, err => {
      console.log(err['error'].errors)
      console.log(err);
      this.openSnackBar(data['message'])
    })
  }

  openSnackBar(message: any[]) {
    this._snackBar.openFromComponent(PizzaPartyComponent, {
      duration: 6000,
      data: message
      
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    console.log(this.subscription.closed);
  }
}
