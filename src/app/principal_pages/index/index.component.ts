import { Component, OnInit, ViewChild } from '@angular/core';
import { DialogOverviewExampleDialog } from 'src/app/layout/layout.tools';
import { MatDialog, MatSidenav } from '@angular/material';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  mobileQuery: MediaQueryList;
  @ViewChild("sidenav", { static: true }) sidenav: MatSidenav;
  title = 'tecni-hidraulicos';

  constructor(  public dialog: MatDialog,
    media: MediaMatcher) {
    this.mobileQuery = media.matchMedia("(max-width: 770px)");
    console.log(this.mobileQuery)
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '100%',      
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  ngOnInit() {
  }

}
