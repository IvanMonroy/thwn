import { Component, Output, EventEmitter, Input } from "@angular/core";

@Component({
  selector: "layout-header",
  template: `
    <mat-toolbar style="background-color: white;
    background-image: url('../../assets/icons/logo-72x40.png');
    background-repeat: no-repeat, repeat;
    background-size: 24px;
    background-position: 62px;
     color: #393B3E" class="example-toolbar">
      <mat-toolbar-row>
        <button mat-icon-button (click)="toggle()">
          <mat-icon>menu</mat-icon>
        </button>
        <img src=""/>
        <h1 class="example-app-name">{{ title }}</h1>
        <span class="example-spacer"></span>
        <ng-container
          *ngTemplateOutlet="
            !medyaQueryParent.matches ? not_responsive : responsive
          "
        >
        </ng-container>
      </mat-toolbar-row>
    </mat-toolbar>

    <ng-template #not_responsive>
      <layout-tools [medyaQueryParent]="medyaQueryParent"></layout-tools>
    </ng-template>
    <ng-template #responsive>
      <mat-menu #appMenu="matMenu">
        <layout-tools [medyaQueryParent]="medyaQueryParent"></layout-tools>
      </mat-menu>
      <button mat-icon-button [matMenuTriggerFor]="appMenu">
        <mat-icon
          class="example-icon"
          aria-hidden="false"
          aria-label="menu icon"
          >more_vert</mat-icon
        >
      </button>
    </ng-template>
  `
})
export class LayoutHeaderComponent {
  public title: string = "Tecni-Hidráulicos";
  @Output() toggleEmit = new EventEmitter<any>();
  @Input() medyaQueryParent: MediaQueryList;

  constructor() {}

  ngOnInit() {}

  toggle() {
    this.toggleEmit.next(null);
  }

}
