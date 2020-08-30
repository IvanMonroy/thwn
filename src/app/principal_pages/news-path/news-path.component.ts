import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Observable, SubscriptionLike } from 'rxjs';
import { FormControl, FormGroup, FormBuilder, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { GlobalThingsService } from 'src/app/services/global/global-things.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatSidenav, MatSnackBar, ErrorStateMatcher } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import { PizzaPartyComponent } from '../find-us/find-us.component';
import { MatButtonModule } from '@angular/material/button';
import { TermsConditionDialogComponent } from 'src/app/layout/layout.tools';
import {WarningDialogComponent} from 'src/app/layout/layout.tools';
import { Meta } from '@angular/platform-browser';

/** Error when invalid control is dirty, touched, or submitted. */

@Component({
  selector: 'app-news-path',
  templateUrl: './news-path.component.html',
  styleUrls: ['./news-path.component.scss']
})
export class NewsPathComponent implements OnInit, OnDestroy {
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  data: Observable<any[]>;
  header: Observable<any[]>;
  dataFiltered: Observable<any[]>;
  filter: FormControl;
  filter$: Observable<string>;
  backgroudBanner: string;
  bodyOne: string;
  titlePage: string;
  model: string;
  icon: string;
  tittle: string;
  color = 'primary';
  mode = 'indeterminate';
  value = 50;
  subscription: SubscriptionLike;
  newVehicle: Observable<any[]>;
  form: FormGroup;
  divStyle: string;


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
    private _snackBar: MatSnackBar,
    private meta: Meta
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
      email: ['', [Validators.required, Validators.email]],
      is_subscriber: [false]
    });

    this.subscription = this.globalService.GetAllModel(this.model).subscribe((data: any[]) => {
      this.data = data['data'];
      this.backgroudBanner = data['data'].img_url_one
      this.bodyOne = data['data'].bodyone
      this.titlePage = data['data'].title
      this.header = data['title'];
      console.log(this.backgroudBanner);
 
    })

  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.divStyle = document.getElementsByClassName("post-title-block")[0].clientHeight.toString() + "px";
    const cnElems = document.getElementsByClassName("banner-section");

    for (let i = 0; i < 1; i++) {
      const e = cnElems[i];
      if (e instanceof HTMLElement) {
        e.style.height = this.divStyle;
      }
    }

  }

  submitForm() {
    var formData: any = new FormData();
    formData.append("email", this.form.get('email').value);
    formData.append("is_subscriber", this.form.get('is_subscriber').value);
    if (this.form.get('is_subscriber').value != true) {
      var message = [];
      message["message"] = "Debe haceptar terminos y condiciones 😔⚠️";
      message["data"] = ".";
      this.openSnackBar(message)
    }
    else {
      this.postData(formData)

    }
  }

  postData(data) {

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



  openDialog(): void {
    const dialogRef = this.dialog.open(TermsConditionDialogComponent, {
      width: '100%',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
    console.log(this.subscription.closed);
  }
}
