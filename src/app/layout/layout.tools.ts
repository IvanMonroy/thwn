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





@Component({
  selector: "terms-condition-dialog",
  styleUrls: ['./layout.tools.scss'],
  template: `
  <div mat-dialog-content>
  <div class="container" style="width: 100%;">
  <p  style="margin-top: 25px;"><strong>Tratamiento de Datos</strong></p>
  <div class="col-lg-12 col-md-12 col-sm-12">
    <p  style="margin-top: 25px;">
      Tecnihidráulicos JB – informa al titular de la información y este así lo acepta de manera expresa y voluntaria que
      los datos consignados a Tecnihidráulicos JB, sean recopilados, almacenados para los usos que a continuación se
      enuncian:

      Recabar o recolectar los datos personales e incorporarlos y almacenarlos en nuestra base de datos.
      Ordenar, catalogar, clasificar, dividir o separar la información suministrada.
      Utilizar los datos suministrados en campañas de comunicación, divulgación y promoción u oferta de productos,
      actividades o servicios desarrollados como parte de estrategias internas de la compañía.
      Utilizarlos para fines administrativos internos o comerciales tales como: estudios de crédito, elaboración y
      presentación de cotizaciones, referencias comerciales de experiencia, investigación de mercados, análisis
      estadísticos, realización de encuestas sobre satisfacción, ofrecimiento o reconocimiento de beneficios propios de
      nuestro programa de lealtad y servicio postventa.
      Conservar registros históricos de la compañía y mantener contacto con los titulares del dato.
      Verificar, comprobar o validar los datos suministrados.
      Estudiar y analizar la información entregada para el seguimiento y mejoramiento de los productos, el servicio y la
      atención.
      Entregar la información recolectada a terceros con los que la compañía contrate el almacenamiento y administración
      de los datos personales, bajo los estándares de seguridad y confidencialidad a los cuales estamos obligados.
      Transferir los datos personales a cualquier país o servidor en otro país.
      Comunicar y permitir el acceso a los datos personales suministrados a terceros proveedores de servicios de apoyo
      general y a las personas naturales o jurídicas accionistas de Tecnihidráulicos JB
      Registro como contratista, proveedor o cliente.
      Control y prevención del fraudes.
      Control y prevención de lavado de activos y financiación del terrorismo.
      Celebración, ejecución y gestión de las propuestas de negocios y contratos objeto de los servicios prestado.
      Reportes a centrales de riesgo por incumplimiento de las obligaciones financieras derivadas de la relación
      comercial.
      La información aportada por el Titular no será utilizada para actividades ilegales, además será maneja con las
      medidas técnicas, humanas y administrativas que sean necesarias para garantizar al Titular que la información no
      será adulterada, perdida, consultada sin permiso o en uso fraudulento.
    </p>
  </div>
</div>
<div class="container"  style="width: 100%;">
  <p  style="margin-top: 25px;"><strong>Derechos del Titular</strong></p>
  <div class="col-lg-12 col-md-12 col-sm-12">
    <p style="margin-top: 25px;">
      El titular de los datos tiene derecho a:<br>

      • Conocer, actualizar y rectificar sus datos personales recolectados por Tecnihidráulicos JB -, este
      derecho se puede ejercer entre otros frente a datos parciales, inexactos, incompletos, fraccionados o que induzcan
      al error.
      Solicitar prueba de la autorización otorgada a Tecnihidráulicos JB –<br>
      • Ser informado por Tecnihidráulicos JB -, previa solicitud, respecto del uso que le han dado a los datos del
      titular.<br>
      • Revocar en cualquier tiempo la autorización y/o supresión del dato.<br>
      • Acceder en forma gratuita a los datos del titular contenidos en la base de datos de Tecnihidráulicos JB –<br>
    </p>
  </div>
</div>
<div class="container"  style="width: 100%;">
  <p style="margin-top: 25px;"><strong>Departamento responsable de la atención de las peticiones, consultas y
    reclamos</strong></p>
  <div class="col-lg-12 col-md-12 col-sm-12">
    <p style="margin-top: 25px;">
      Para que el titular de la información pueda ejercer sus derechos de acuerdo con la ley 1266 de 2008, 1581 de 2012,
      decreto 1377 de 2013, decreto 1074 de 2015 y demás normas concordantes Tecnihidráulicos JB – Soluciones Web –
      ha destinado el departamento de Servicio al Cliente con el fin de atender las solicitudes de los titulares,
      tal y como se presenta a continuación:
    </p>
  </div>
</div>
<div class="container"  style="width: 100%;">
  <p style="margin-top: 25px;" > <strong>Procedimiento para ejercer lo derechos </strong></p>
    <div class="col-lg-12 col-md-12 col-sm-12">
      <p style="margin-top: 25px;">
        Atención electrónica:<br> El Titular del dato podrá realizar su requerimiento formal a la dirección electrónica
        tecnihidraulicosjb@gmail.com previo agotamiento de los requisitos de legitimación para el ejercicio del titular,
        a saber.
        <br>
        • Ser titular de la información, acreditar la identidad en forma suficiente mediante el medio que
        Tecnihidráulicos JB defina para tal fin.<br>
        • Por los causahabientes, quienes deberán acreditar tal calidad.<br>
        • Por el representante/apoderado del titular de la información, quien también deberá acreditar tal calidad.<br>
        • Por estipulación a favor de otro o por otro ejercerán por conjunto de las personas que estén facultadas para
        representarlos, e igualmente se deberá acreditar tal calidad.<br>
        •Los derechos de los menores de edad se ejercerán por las personas encargadas de su representación, e igualmente
        se deberá acreditar tal calidad.<br>
        <br>
        Atención escrita:<br> El Titular del dato deberá realizar su requerimiento formal a la dirección:<br>
        Carrera 28a #66 - 73 Bogotá D.C. Colombia, previo agotamiento de los requisitos de legitimación para
        el ejercicio del titular, según lo descrito en el literal a del presente numeral, mediante escrito donde
        se especifique la dirección donde recibirá notificaciones y respuestas.
      </p>
    </div>
    </div>



    <div class="container"  style="width: 100%;">
      <p  style="margin-top: 25px;"><strong> Entrada en vigencia y duración </strong></p>
        <div class="col-lg-12 col-md-12 col-sm-12">
          <p  style="margin-top: 25px;">
            La presente política de manejo de datos de Tecnihidráulicos JB - entra a partir de
            la fecha de su firma 11 de Octubre de 2016, y tendrá una vigencia indefinida o hasta cuando
            haya cambios sustanciales, los cuales serán informados a los titulares de la información según los términos
            de la ley.
          </p>
        </div>
    </div>
    </div>
  `
})
export class TermsConditionDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<TermsConditionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
