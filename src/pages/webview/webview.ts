import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'page-webview',
  templateUrl: 'webview.html'
})
export class WebviewPage {
  userData: any;
  userArr: any = [];
  filterUser = [];
  url: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public sanitizer: DomSanitizer) {
    console.log("navparms", navParams);
    this.url = navParams.get('url');
  }

  public transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
