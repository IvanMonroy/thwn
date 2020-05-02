import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LayoutNavMenuComponent } from "./layout.nav-menu";
import { LayoutHeaderComponent } from "./layout.header";
import {
  LayoutToolsComponent,
  BottomSheetOverviewExampleSheet,
  DialogOverviewExampleDialog,
  TermsConditionDialogComponent
} from "./layout.tools";

import { AppRoutingModule } from "../app-routing.module";

import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";
import { MatButtonModule } from "@angular/material/button";
import { MatBadgeModule } from "@angular/material/badge";
import { MatBottomSheetModule } from "@angular/material/bottom-sheet";
import { MatMenuModule } from "@angular/material/menu";
import { FormsModule } from "@angular/forms";
import { MatDialogModule } from "@angular/material/dialog";
import {MatExpansionModule} from '@angular/material/expansion';

@NgModule({
  declarations: [
    LayoutNavMenuComponent,
    LayoutHeaderComponent,
    LayoutToolsComponent,
    BottomSheetOverviewExampleSheet,
    DialogOverviewExampleDialog,
    TermsConditionDialogComponent
  ],
  exports: [
    LayoutNavMenuComponent,
    LayoutHeaderComponent,
    BottomSheetOverviewExampleSheet,
    DialogOverviewExampleDialog,
    TermsConditionDialogComponent
  ],
  entryComponents: [
    BottomSheetOverviewExampleSheet,
    DialogOverviewExampleDialog,
    TermsConditionDialogComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatBadgeModule,
    MatMenuModule,
    MatBottomSheetModule,
    FormsModule,
    MatDialogModule,
    MatExpansionModule
  ]
})
export class LayoutModule {}
