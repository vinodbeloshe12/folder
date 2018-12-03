import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { WebviewPage } from '../webview/webview';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// import { Contacts, ContactFieldType, ContactFindOptions } from '@ionic-native/contacts';

@Component({
  selector: 'page-news',
  templateUrl: 'news.html'
})

export class NewsPage {
  newsData: any;


  constructor(public navCtrl: NavController, private http: HttpClient, public navParams: NavParams, private storage: Storage, private platform: Platform) {
    // constructor(private contacts: Contacts, public navCtrl: NavController, public navParams: NavParams, private storage: Storage,  private platform: Platform) {

    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    this.http.get("https://newsapi.org/v2/top-headlines?country=in&apiKey=1dd563c100fa420dbe55bf0f203b7cbf", { headers: headers }).subscribe(data => {
      this.newsData = data;

    }, err => {
      console.log(err);

    })



  }



  openPage(url) {
    this.navCtrl.push(WebviewPage, {
      url: url
    });

  }
}
