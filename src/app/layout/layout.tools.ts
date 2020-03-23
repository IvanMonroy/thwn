import { Component, Input, Inject, OnInit, OnDestroy } from "@angular/core";
import {
  MatBottomSheet,
  MatBottomSheetRef,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog
} from "@angular/material";
import { Observable, SubscriptionLike } from 'rxjs';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { GlobalThingsService } from '../services/global/global-things.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: "layout-tools",
  template: `
    <ng-container
      *ngTemplateOutlet="
        !medyaQueryParent.matches ? not_responsive : responsive
      "
    >
    </ng-container>
    <ng-template #not_responsive let-lessonsCounter="estimate">
      <button mat-icon-button>
        <mat-icon
          class="example-icon"
          aria-hidden="false"
          matBadge="4"
          matBadgeColor="warn"
          style="color:#393B3E "
          (click)="openBottomSheet()"
          >loyalty</mat-icon
        >
      </button>
      <button mat-icon-button (click)="openDialog()">
        <mat-icon mat-icon-button  style="color:#393B3E"  class="example-icon" aria-hidden="false"
          >place</mat-icon
        >
      </button>
    </ng-template>
    <ng-template #responsive let-lessonsCounter="estimate">
      <button mat-menu-item (click)="openBottomSheet()">
        <mat-icon
          class="example-icon"
          style="color:#393B3E "
          aria-hidden="false"
          matBadge="4"
          matBadgeColor="warn"
          >loyalty</mat-icon
        >
        Nuevo
      </button>
      <button mat-menu-item (click)="openDialog()">
        <mat-icon mat-icon-button class="example-icon" aria-hidden="false"  style="color:#393B3E "
          >place</mat-icon
        >
        Encuéntranos
      </button>
    </ng-template>
  `
})
export class LayoutToolsComponent {
  @Input() medyaQueryParent: MediaQueryList;
  @Input() varl: string = "mat-menu-item";
  constructor(private _bottomSheet: MatBottomSheet, public dialog: MatDialog) { }

  animal: string;
  name: string = 'Confirmación';

  ngOnInit() { }

  openBottomSheet(): void {
    this._bottomSheet.open(BottomSheetOverviewExampleSheet);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '100%',
      data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
}

@Component({
  selector: "bottom-sheet-overview-example-sheet",
  template: `
    <mat-nav-list *ngFor="let new of news" >
      <a href="/news-path/{{new.id}}" mat-list-item >
        <span mat-line>{{new.title}}</span>
        <span mat-line>Conoce más sobre está noticia dancho click aquí</span>
      </a>

    </mat-nav-list>

  `
})
export class BottomSheetOverviewExampleSheet implements OnInit, OnDestroy {
  title = 'app';
  news: Observable<any[]>;
  dataFiltered: Observable<any[]>;
  filter: FormControl;
  filter$: Observable<string>;
  model: string = 'index_news/index_pp';
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
    private _bottomSheetRef: MatBottomSheetRef<BottomSheetOverviewExampleSheet>
  ) {
    this.subscription = this.globalService.GetAllModel(this.model).subscribe((data: any[]) => {
      console.log(data);
      this.news = data['data'];
    })

    console.log("Subscription " + this.tittle + this.subscription.closed);
  }

  ngOnInit() {

    console.log(this.news)
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    console.log(this.subscription.closed);
  }

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
}

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: "dialog-overview-example-dialog",
  styleUrls: ['./layout.tools.scss'],
  template: `
    <h1 mat-dialog-title>Encuéntranos</h1>
    <div mat-dialog-content>
    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12  d-inline-flex" style="float: left;">
    <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3976.6265969793285!2d-74.0751845!3d4.6604899!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9a5375c7dec9%3A0xf304a588c576a9c4!2sCra.%2028a%20%2366-73%2C%20Bogot%C3%A1!5e0!3m2!1ses!2sco!4v1581279301681!5m2!1ses!2sco" 
    width="100%" height="815px" frameborder="0" style="border:0;" allowfullscreen=""></iframe>
    </div>
    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12  d-inline-flex">
    <div class="row">
    <div class="col-12 d-inline-flex" style="margin-top: 5px;">
    <mat-accordion style="width: 100%;">
  <mat-expansion-panel>
    <mat-expansion-panel-header>
      <mat-panel-title>
        Dirección
      </mat-panel-title>
      <mat-panel-description>
        Estamos ubicados en
      </mat-panel-description>
    </mat-expansion-panel-header>
    Carrera. 28a #66 - 73 Barrio 7 de Agosto
  </mat-expansion-panel>
  <mat-expansion-panel (opened)="panelOpenState = true"
                       (closed)="panelOpenState = false">
    <mat-expansion-panel-header>
      <mat-panel-title>
        Horarios de atención
      </mat-panel-title>
      <mat-panel-description>
        Lunes a sábado
      </mat-panel-description>
    </mat-expansion-panel-header>
    10:00am - 10:00pm
      </mat-expansion-panel>
      <mat-expansion-panel (opened)="panelOpenState = true"
      (closed)="panelOpenState = false">
<mat-expansion-panel-header>
<mat-panel-title>
Horarios de atención
</mat-panel-title>
<mat-panel-description>
Domingos y festivos
</mat-panel-description>
</mat-expansion-panel-header>
10:00am - 05:00pm
</mat-expansion-panel>
</mat-accordion>
</div>
<br>
<div class="col-12 d-inline-flex">
<img  class="card-img-top" src="../../assets/icons/IMG-20200204-WA00031.jpg" style="width: 100%;
height: auto; margin-top: 5px;" alt="Card image cap">
    </div>
    </div>
    </div>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">Ok</button>

    </div>
  `
})
export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
