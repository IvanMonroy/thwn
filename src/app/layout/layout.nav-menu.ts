import { Component, ViewChild, ChangeDetectorRef } from "@angular/core";
import { MatSidenav } from "@angular/material";
import { MediaMatcher } from "@angular/cdk/layout";

@Component({
  selector: "layout-nav-menu",
  template: `
      <mat-nav-list>
        <a mat-list-item [routerLink]="nav.route" routerLinkActive="active-list-item" *ngFor="let nav of fillerNav">
          <mat-icon aria-hidden="false" aria-label="Example home icon">{{
            nav.icon
          }}</mat-icon>
          {{ nav.name }}</a
        >
      </mat-nav-list>
  `
})
export class LayoutNavMenuComponent {
  mobileQuery: MediaQueryList;
  public fillerNav: any[] = [];
  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia("(max-width: 600px)");
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    this.fillerNav = [
      {
        icon: "home",
        name: "Página principal",
        route: ""
      },
      {
        icon: "image_search",
        name: "Conoce nuestros productos",
        route: "products"
      },
      {
        icon: "description",
        name: "Echa un vistazo a nuestros trabajos",
        route: "works-path"
      },
      {
        icon: "dashboard",
        name: "Noticias",
        route: "news-path/2"
      },
      {
        icon: "people_alt",
        name: "Acerca de nosotros",
        route: "news-index"
      },
      {
        icon: "remove_red_eye",
        name: "Trazabilidad",
        route: "traceability"
      }


      
    ];
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
