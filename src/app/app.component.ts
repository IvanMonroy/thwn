import { Component, ViewChild } from '@angular/core';
import { MediaMatcher } from "@angular/cdk/layout";
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  mobileQuery: MediaQueryList;
  @ViewChild("sidenav", { static: true }) sidenav: MatSidenav;
  title = 'tecni-hidraulicos';

  constructor(media: MediaMatcher) {
    this.mobileQuery = media.matchMedia("(max-width: 600px)");
  }

  emitAction(e){
    this.sidenav.toggle();
  }
  getMobileQuery(){
    return this.mobileQuery;
  }

}
