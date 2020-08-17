import { Component, OnDestroy, OnInit, Inject } from '@angular/core';
import { GlobalThingsService } from '../../services/global/global-things.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, combineLatest, SubscriptionLike } from 'rxjs';

import { FormControl, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, startWith, debounce } from 'rxjs/operators';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { error } from 'util';
import { DialogOverviewExampleDialog } from 'src/app/layout/layout.tools';
import { PizzaPartyComponent } from '../find-us/find-us.component';
import { DomSanitizer } from '@angular/platform-browser';


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
  form: FormGroup;

  constructor(
    private globalService: GlobalThingsService,
    private http: HttpClient,
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private _sanitizer: DomSanitizer,
    public formBuilder: FormBuilder,
  

  ) {
    this.activatedRoute.data.subscribe(data => {
      document.title = data.title,
        this.model = data.model,
        this.icon = data.items_icon,
        this.tittle = data.title
    });

    this.form = this.formBuilder.group({
      filter: ['']
    });
    
  }
  



  ngOnInit() {

    this.subscription = this.globalService.GetAllModel(this.model).subscribe(
      (data: any[]) => {
        for (var i = 0; i < data['data'].length; i++) {
          data['data'][i].imgurl = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + data['data'][i].imgurl);
          data['data'][i].imageurltwo = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + data['data'][i].imageurltwo);
        }
        this.data = data['data']
      })

    console.log("Subscription " + this.tittle + this.subscription.closed);
  }

  getByDesc(){
    var formData: any = new FormData();
    formData.append("filter", this.form.get('filter').value);  
    this.postForm(formData);
 
  }

  postForm(formData){
    this.http.post('https://willreyn-api.herokuapp.com/api/products/get_by_desc',formData).subscribe(
      (data: any[]) => {
        for (var i = 0; i < data['data'].length; i++) {
          data['data'][i].imgurl = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + data['data'][i].imgurl);
          data['data'][i].imageurltwo = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + data['data'][i].imageurltwo);
        }
        this.data = data['data']
      })
    
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    console.log(this.subscription.closed);
  }

  openSnackBar(message: any[]) {
    this._snackBar.openFromComponent(PizzaPartyComponent, {
      duration: 6000,
      data: message

    });
  }

  setToLocalStorage(price: any, mark: any, description: any, available: any, name: any) {
    var array = {
      "price": price,
      "mark": mark,
      "description": description,
      "available": available,
      "name": name,
    }
    localStorage.setItem(name, JSON.stringify(array));
    var message = [];
    message["message"] = "Producto agregado al carrito 🛍️🎊";
    message["data"] = ".";
    this.openSnackBar(message)
  }

  openDialog(price: any, mark: any, description: any, available: any, name: any, imgurl: any, id: any): void {
    const dialogRef = this.dialog.open(DetailsDialogComponent, {
      width: '100%',
      data: {
        "price": price,
        "mark": mark,
        "description": description,
        "available": available,
        "name": name,
        "imgurl": imgurl,
        "id": id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }


  openShippingCart(price: any, mark: any, description: any, available: any, name: any, imgurl: any, id: any): void {
    const dialogRef = this.dialog.open(ShippingCartDialogComponent, {
      width: '100%',
      data: {
        "price": price,
        "mark": mark,
        "description": description,
        "available": available,
        "name": name,
        "imgurl": imgurl,
        "id": id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

}


export interface DialogData {
  animal: string;
  name: string;
}


@Component({
  selector: "details-dialog",
  styleUrls: ['./query-lists.component.scss'],
  template: `
  <div mat-dialog-content>
  <div class="container" style="width: 100%; height: 400px">
    <div class="modal-body">
      <div class="row">
        <div class="col-md-6 product_img">
          <img width="348px" height="348px" onError="this.src='../../../assets/images/item-not-found.png'"
            data-src="holder.js/348x348" style="width: 348px; height: 348px; max-width: 100%;"
            data-holder-rendered="true" src="{{dataExt.imgurl}}" class="img-responsive">
        </div>
        <div class="col-md-6 product_content">
          <h4>Product Id: <span>{{dataExt.id}}</span></h4>
          <div class="rating">
            (Tecni- hidráulicos JB)
          </div>
          <div class="rating">
            {{dataExt.available == true ? "Unidades disponibles" : "Unidades agotadas"}}
          </div>
          <p>{{dataExt.name}} {{dataExt.mark}} {{dataExt.description}}</p>
          <h3 class="cost"><span class="glyphicon glyphicon-usd"></span>$ {{dataExt.price}} <small class="pre-cost"><span
                class="glyphicon glyphicon-usd"></span>$ {{dataExt.price - 1000}}</small></h3>
          <div class="row">

            <mat-form-field class="example-full-width">
              <mat-label>Cantidad</mat-label>
              <textarea id="TxtCant" matInput placeholder="Ingrese una cantidad..." value="0"></textarea>
            </mat-form-field>



          </div>
          <div class="space-ten"></div>
          <div class="example-button-row">
            <div class="example-flex-container">
              <div class="example-button-container">
                <button mat-mini-fab color="primary"
                  (click)="setToLocalStorage(dataExt.price, dataExt.mark, dataExt.description,dataExt.available,dataExt.name )"
                  aria-label="Agregar al carrito" title="Agregar al carrito">
                  <mat-icon>shopping_cart</mat-icon>
                </button>
              </div>


              <div class="example-button-container">
                <button mat-mini-fab color="primary" (click)="calculatePrice(dataExt.price)"
                  aria-label="Calular precio" title="Calular precio">
                  <mat-icon>attach_money</mat-icon>
                </button>
              </div>

            </div>
            <br>
            <h3 style="margin: 0 auto;  text-align: center;" class="cost" id="Cost"><span
                class="glyphicon glyphicon-usd"></span> $0 </h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  `
})
export class DetailsDialogComponent {
  dataExt: any;
  constructor(
    public dialogRef: MatDialogRef<DetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private _snackBar: MatSnackBar
  ) {
    this.dataExt = data;
    console.log(this.dataExt)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  setToLocalStorage(price: any, mark: any, description: any, available: any, name: any) {
    var inputValue = (<HTMLInputElement>document.getElementById("TxtCant")).value;
    var array = {
      "price": (parseInt(price) * parseInt(inputValue)).toFixed(3),
      "mark": mark,
      "description": description,
      "available": available,
      "name": name,
    }
    localStorage.setItem(name, JSON.stringify(array));
    var message = [];
    message["message"] = "Producto agregado al carrito 🛍️🎊";
    message["data"] = ".";
    this.openSnackBar(message)
  }

  openSnackBar(message: any[]) {
    this._snackBar.openFromComponent(PizzaPartyComponent, {
      duration: 6000,
      data: message

    });
  }

  calculatePrice(price: any) {
    var inputValue = (<HTMLInputElement>document.getElementById("TxtCant")).value;
    (<HTMLInputElement>document.getElementById("Cost")).innerText = (parseInt(price) * parseInt(inputValue)).toFixed(3) + "$";
    var message = [];
    message["message"] = "Precio calculado 📠💵";
    message["data"] = ".";
    this.openSnackBar(message)
  }

}



@Component({
  selector: "shipping-cart-dialog",
  styleUrls: ['./shipping-cart.component.scss'],
  template: `
  <div mat-dialog-content style="height: 400px">
  <mat-toolbar color="primary" style="width:100%">
  <mat-toolbar-row>
  <span>Carrito de compra</span>
  <span class="example-spacer"></span>
  <mat-icon class="example-icon" aria-hidden="false" aria-label="Example heart icon">shopping_cart</mat-icon>
</mat-toolbar-row>

</mat-toolbar>
  <div class="container">
   <div class="card shopping-cart">

            <div class="card-body">
                    <!-- PRODUCT -->
                    <div class="row" style="margin-top: 10px" *ngFor="let product of dataTotal">
                        <div class="col-12 col-sm-12 col-md-2 text-center">
                        <img width="120px" height="80px" onError="this.src='../../../assets/images/item-not-found.png'"
                        data-src="holder.js/120x80" style="width: 120px; height: 80px; max-width: 100%;"
                        data-holder-rendered="true" src="{{product.imgurl}}" class="img-responsive">

                               
                        </div>
                        <div class="col-12 text-sm-center col-sm-12 text-md-left col-md-6">
                            <h4 class="product-name"><strong>{{ product.name }}</strong></h4>
                            <h4>
                                <small>{{product.name + " " + product.mark}}</small>
                            </h4>
                        </div>
                        <div class="col-12 col-sm-12 text-sm-center col-md-4 text-md-right row">
                            <div class="col-4 col-sm-4 col-md-4 col-md-6 text-md-right" style="padding-top: 5px">
                                <h6><strong>{{product.price}} <span class="text-muted">$</span></strong></h6>
                            </div>
                            <div class="col-3 col-sm-3 col-md-3">
                            </div>

                            <div class="col-2 col-sm-2 col-md-2 text-right">
                              
                          <div class="example-flex-container">
                            <div class="example-button-container">
                              <button mat-mini-fab color="primary"
                                (click)="removeToLocalStorage(product.name)"
                                aria-label="Remover del carrito" title="Remover del carrito">
                                <mat-icon>remove_shopping_cart</mat-icon>
                              </button>
                            </div>
                          </div>

                            </div>
                        </div>
                    </div>
                    <hr>
                    <!-- END PRODUCT -->
                <div class="pull-right">
                    <a href="" class="btn btn-outline-secondary pull-right">
                        Seguir comprando
                    </a>
                </div>
            </div>
            <div class="card-footer">
                <div class="coupon col-md-5 col-sm-5 no-padding-left pull-left">
                    <div class="row">
                    </div>
                </div>
                <div class="pull-right" style="margin: 10px">
                    <a href="" class="btn btn-success pull-right">Checkout</a>
                    <div class="pull-right" style="margin: 5px">
                        Total price: <b id="totalPrice">50.00€</b>
                    </div>
                </div>
            </div>
        </div>
</div>
  `
})


export class ShippingCartDialogComponent {
  dataExt: any;
  dataTotal = [];
  totalPrice: any;
  constructor(
    public dialogRef: MatDialogRef<ShippingCartDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private _snackBar: MatSnackBar
  ) {

    for (var i = 0, len = localStorage.length; i < len; i++) {
      var key = localStorage.key(i);
      var value = localStorage[key];
      this.dataTotal.push(JSON.parse(localStorage[key]))
      console.log(key + " => " + value);
      this.totalPrice = JSON.parse(localStorage[key]).price;
    }

    this.dataExt = data;
    console.log(this.dataTotal)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  removeToLocalStorage(key: any) {
    localStorage.removeItem(key);
    var message = [];
    message["message"] = "Producto eliminado del carrito 🛍️🎊";
    message["data"] = ".";
    this.openSnackBar(message)

    this.dataTotal = [];
    for (var i = 0, len = localStorage.length; i < len; i++) {
      var key1 = localStorage.key(i);
      var value = localStorage[key1];
      this.dataTotal.push(JSON.parse(localStorage[key1]))
      console.log(key1 + " => " + value);
      this.totalPrice += JSON.parse(localStorage[key1]).price;
    };

    (<HTMLInputElement>document.getElementById("totalPrice")).innerText = this.totalPrice
  }



  openSnackBar(message: any[]) {
    this._snackBar.openFromComponent(PizzaPartyComponent, {
      duration: 6000,
      data: message

    });
  }


}

