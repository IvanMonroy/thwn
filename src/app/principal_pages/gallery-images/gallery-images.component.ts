import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Gallery, GalleryItem, ImageItem, ThumbnailsPosition, ImageSize } from '@ngx-gallery/core';
import { Lightbox } from '@ngx-gallery/lightbox';
import { map, startWith, switchMap } from 'rxjs/operators';
import { Observable, SubscriptionLike, combineLatest } from 'rxjs';
import { FormControl } from '@angular/forms';
import { GlobalThingsService } from 'src/app/services/global/global-things.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-gallery-images',
  template:  `
  <h4 style="text-align: center;">{{header}}</h4>
  <div class="row" gallerize >
  <div class="col-md-4" *ngFor="let img of data">
     <div class="card">
        <img class="card-img-top" src="{{img.srcUrl}}" alt="Card image cap">
        <div class="card-body">
           <h5 class="card-title border-bottom pb-3">{{img.header}} </h5>
           <p class="card-text">{{img.description}}</p>
        </div>
     </div>
  </div>  
</div>



`,
  styleUrls: ['./gallery-images.component.scss'],
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalleryImagesComponent implements OnInit {
  data: Observable<any[]>;
  header: string;
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

  items: GalleryItem[];

 
 data1xd = data1;

  constructor(
    private globalService: GlobalThingsService,
    private route: ActivatedRoute,
    private http: HttpClient,
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    public gallery: Gallery,
    public lightbox: Lightbox) {
      this.activatedRoute.data.subscribe(data => {
        document.title = data.title,
          this.model = 'works/index_gallery_url/',
          this.icon = data.items_icon,
          this.tittle = data.title
        });
        this.model = this.model + this.route.snapshot.paramMap.get('id');
      
        console.log(this.model)

     }



     ngOnInit() {
           
      this.subscription =  this.globalService.GetAllModel(this.model).subscribe((data: any[]) => {
        this.data = data['data'];
        this.header = data['title'];
        console.log(this.data);      
      })

      console.log("Subscription " + this.tittle + this.subscription.closed);
      const lightboxRef = this.gallery.ref('lightbox');
      lightboxRef.setConfig({
        imageSize: ImageSize.Cover,
        thumbPosition: ThumbnailsPosition.Top
      });
    }
  
    ngOnDestroy() {
      this.subscription.unsubscribe();
      console.log(this.subscription.closed);
    }

  }
 

  const data1 = [
    {
      srcUrl: 'https://preview.ibb.co/jrsA6R/img12.jpg',
      previewUrl: 'https://preview.ibb.co/jrsA6R/img12.jpg'
    },
    {
      srcUrl: 'https://preview.ibb.co/kPE1D6/clouds.jpg',
      previewUrl: 'https://preview.ibb.co/kPE1D6/clouds.jpg'
    },
    {
      srcUrl: 'https://preview.ibb.co/mwsA6R/img7.jpg',
      previewUrl: 'https://preview.ibb.co/mwsA6R/img7.jpg'
    },
    {
      srcUrl: 'https://preview.ibb.co/kZGsLm/img8.jpg',
      previewUrl: 'https://preview.ibb.co/kZGsLm/img8.jpg'
    }
  ];