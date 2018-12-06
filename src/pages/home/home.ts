import { Component } from '@angular/core';
import { NavController, NavParams, Platform, Tab } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AddsPage } from '../adds/add';
import { NewsPage } from '../news/news';
import { WebviewPage } from '../webview/webview';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ListPage } from '../list/list';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  addData: any;
  userData: any;
  tab1: any;
  tab2: any;
  newsData: any;

  constructor(public navCtrl: NavController, private http: HttpClient, public navParams: NavParams, private storage: Storage) {
    this.storage.get('userData').then((val) => {
      console.log('Your name is', val);
      this.userData = val;
    });
    this.tab1 = AddsPage;
    this.tab2 = NewsPage;
    this.getNewsData();
  }


  getNewsData() {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    this.http.get("https://newsapi.org/v2/top-headlines?country=in&apiKey=1dd563c100fa420dbe55bf0f203b7cbf", { headers: headers }).subscribe(data => {
      let tempArr: any = [];
      tempArr = data['articles'];
      headers.append('Content-Type', 'application/json');
      this.http.get("http://admin.findacross.com/index.php/json/mlmAdvertise", { headers: headers }).subscribe(res => {
        this.addData = res;
        let i = 2;
        this.addData.forEach(element => {
          console.log("ii", i, tempArr)
          element.url = element.link;
          tempArr.splice(i, 0, element);
          i = i + 3;
        });
        this.newsData = tempArr;
      }, err => {
        console.log(err);

      })
    }, err => {
      console.log(err);

    })
  }

  search(id) {
    this.navCtrl.push(ListPage, {
      id: id
    });
  }
  openPage(url) {
    this.navCtrl.push(WebviewPage, {
      url: url
    });

  }



}
