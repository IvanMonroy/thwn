import { Component, OnDestroy, OnInit, Inject } from '@angular/core';
import { GlobalThingsService } from '../../services/global/global-things.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, combineLatest, SubscriptionLike } from 'rxjs';

import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { error } from 'util';
import { DialogOverviewExampleDialog } from 'src/app/layout/layout.tools';
import { PizzaPartyComponent } from '../find-us/find-us.component';


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


  constructor(
    private globalService: GlobalThingsService,
    private http: HttpClient,
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private _snackBar: MatSnackBar
 
  ) { 
    this.activatedRoute.data.subscribe(data => {
      document.title = data.title,
        this.model = data.model,
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
        .filter(data => data.name.toLowerCase().indexOf(filterString.toLowerCase()) !== -1
        ))
    )
    this.subscription = this.data.subscribe()
    console.log("Subscription " + this.tittle + this.subscription.closed);
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

  setToLocalStorage(price: any,mark: any,description: any,available: any,name: any ){
    var array =  {
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

  openDialog(price: any,mark: any,description: any,available: any,name: any, imgurl: any, id: any): void {
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

  setToLocalStorage(price: any,mark: any,description: any,available: any,name: any ){
    var inputValue = (<HTMLInputElement>document.getElementById("TxtCant")).value;
    var array =  {
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

  calculatePrice(price: any){
    var inputValue = (<HTMLInputElement>document.getElementById("TxtCant")).value;
    (<HTMLInputElement>document.getElementById("Cost")).innerText = (parseInt(price) * parseInt(inputValue)).toFixed(3) + "$";  
    var message = [];
    message["message"] = "Precio calculado 📠💵";
    message["data"] = ".";
   this.openSnackBar(message)
  }

}

