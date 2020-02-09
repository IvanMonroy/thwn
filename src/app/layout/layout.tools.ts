import { Component, Input, Inject } from "@angular/core";
import {
  MatBottomSheet,
  MatBottomSheetRef,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog
} from "@angular/material";
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
          matBadge="15"
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
  constructor(private _bottomSheet: MatBottomSheet, public dialog: MatDialog) {}

  animal: string;
  name: string = 'Confirmación';

  ngOnInit() {}

  openBottomSheet(): void {
    this._bottomSheet.open(BottomSheetOverviewExampleSheet);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: {name: this.name, animal: this.animal}
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
    <mat-nav-list>
      <a
        href="https://keep.google.com/"
        mat-list-item
        (click)="openLink($event)"
      >
        <span mat-line>Google Keep</span>
        <span mat-line>Add to a note</span>
      </a>

      <a
        href="https://docs.google.com/"
        mat-list-item
        (click)="openLink($event)"
      >
        <span mat-line>Google Docs</span>
        <span mat-line>Embed in a document</span>
      </a>

      <a
        href="https://plus.google.com/"
        mat-list-item
        (click)="openLink($event)"
      >
        <span mat-line>Google Plus</span>
        <span mat-line>Share with your friends</span>
      </a>

      <a
        href="https://hangouts.google.com/"
        mat-list-item
        (click)="openLink($event)"
      >
        <span mat-line>Google Hangouts</span>
        <span mat-line>Show to your coworkers</span>
      </a>
    </mat-nav-list>
  `
})
export class BottomSheetOverviewExampleSheet {
  constructor(
    private _bottomSheetRef: MatBottomSheetRef<BottomSheetOverviewExampleSheet>
  ) {}

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
  template: `
    <h1 mat-dialog-title>{{ data.name }}</h1>
    <div mat-dialog-content>
      <p>¿Desea Salir?</p>

    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">No</button>
      <button mat-button [mat-dialog-close]="data.animal" cdkFocusInitial>
        Confirmar
      </button>
    </div>
  `
})
export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
