import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable, SubscriptionLike } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { GlobalThingsService } from 'src/app/services/global/global-things.service';
import { MatDialog, MatSnackBar, MAT_SNACK_BAR_DATA } from '@angular/material';

@Component({
  selector: 'app-find-us',
  templateUrl: './find-us.component.html',
  styleUrls: ['./find-us.component.scss']
})
export class FindUsComponent implements OnInit {
  template: any;
  form: FormGroup;
  entries: Observable<any[]>;
  dataEntries: Observable<any[]>;
  rates: Observable<any[]>;
  dataRates: Observable<any[]>;
  subscription: SubscriptionLike[] = [];

  @ViewChild("inputFile1", { static: true }) name: ElementRef;
  @ViewChild("inputFile2", { static: true }) subject: ElementRef;
  @ViewChild("inputFile3", { static: true }) email: ElementRef;
  @ViewChild("inputFile4", { static: true }) phone: ElementRef;
  @ViewChild("inputFile5", { static: true }) message: ElementRef;

  constructor(
    public formBuilder: FormBuilder,
    private http: HttpClient,
    public globalThingsService: GlobalThingsService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {

    this.form = this.formBuilder.group({
      name: [''],
      subject: [''],
      email: [''],
      phone: [''],
      mesagge: [''],
      is_subscriber: ['']
    });
   }

  ngOnInit() {
  }



  submitForm() {
    var formData: any = new FormData();

        formData.append("name", this.form.get('name').value);
        formData.append("subject", this.form.get('subject').value);
        formData.append("email", this.form.get('email').value);
        formData.append("phone", this.form.get('phone').value);
        formData.append("mesagge", this.form.get('mesagge').value);
        formData.append("is_subscriber", this.form.get('is_subscriber').value);
        this.postData( formData)
        
  }

  openSnackBar(message: any[]) {
    this._snackBar.openFromComponent(PizzaPartyComponent, {
      duration: 5000,
      data: message
      
    });
  }

  postData(data){
  
    this.http.post('https://willreyn-api.herokuapp.com/api/subscribers', data).subscribe((data: any[]) => {
      console.log(data['message']);
      this.openSnackBar(data);
      this.name.nativeElement.value = '';
      this.subject.nativeElement.value = '';
      this.email.nativeElement.value = '';
      this.phone.nativeElement.value = '';
      this.message.nativeElement.value = '';
    }, err => {
      console.log(err['error'].errors)
      console.log(err);
      this.openSnackBar(data['message'])
    })
  }

}


@Component({
  selector: 'snack-bar-component-example-snack',
  template: `
  <span class="example-pizza-party" style="color: #285dbf;">
  {{message}}!!! 🔨
  </span>

  `,
})
export class PizzaPartyComponent {
  message: any;
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {
    console.log(data)
    this.message =  data['message'] + " " + data['data'].name
   }

}