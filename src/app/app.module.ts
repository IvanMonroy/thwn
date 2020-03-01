import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatSidenavModule } from "@angular/material/sidenav";
import {PrincipalPagesModule} from "./principal_pages/principal-pages.module"
import {QueryListsPagesModule} from "./principal_pages/query-lists-pages.module"
import { LayoutModule } from './layout/layout.module';
import { AppComponent } from './app.component';
import { MatIconModule } from "@angular/material/icon";
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    LayoutModule,
    PrincipalPagesModule,
    QueryListsPagesModule,
    MatIconModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
