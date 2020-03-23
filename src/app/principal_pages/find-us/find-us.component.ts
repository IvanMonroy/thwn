import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable, SubscriptionLike } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { GlobalThingsService } from 'src/app/services/global/global-things.service';
import { MatDialog } from '@angular/material';

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
  constructor(
    public formBuilder: FormBuilder,
    private http: HttpClient,
    public globalThingsService: GlobalThingsService,
    public dialog: MatDialog
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


  postData(data){
    this.http.post('https://willreyn-api.herokuapp.com/api/subscribers', data).subscribe(data => {
      console.log(data['message']);
    }, err => {
      console.log(err['error'].errors)
      console.log(err);
    })
  }

}
