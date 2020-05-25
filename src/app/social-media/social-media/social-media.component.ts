import { Component, OnInit, AfterViewInit, Input } from '@angular/core';

@Component({
  selector: 'fb-like',
  template: `<div class="fb-like" [attr.data-href]="url" data-layout="button_count" data-action="like" data-show-faces="true" data-share="true"></div>`,
  styleUrls: ['./social-media.component.scss']
})
export class SocialMediaComponent implements AfterViewInit {
  @Input() url = location.href;

  constructor() {
      // initialise facebook sdk after it loads if required
      if (!window['fbAsyncInit']) {
          window['fbAsyncInit'] = function () {
              window['FB'].init({
                  appId: 'your-app-id',
                  autoLogAppEvents: true,
                  xfbml: true,
                  version: 'v3.0',
                  picture: 'https://antrax-labs.org/wp-content/uploads/2018/12/malware-xbash-windows-640x393-3.jpg', 
                  title: 'your_title',  
              });
          };
      }

      // load facebook sdk if required
      const url = 'https://connect.facebook.net/en_US/sdk.js';
      if (!document.querySelector(`script[src='${url}']`)) {
          let script = document.createElement('script');
          script.src = url;
          document.body.appendChild(script);
      }
  }

  ngAfterViewInit(): void {
      // render facebook button
      window['FB'] && window['FB'].XFBML.parse();
  }
}
