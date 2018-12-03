import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { ListPage } from '../list/list';
import { Storage } from '@ionic/storage';
import { WebviewPage } from '../webview/webview';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// import { Contacts, ContactFieldType, ContactFindOptions } from '@ionic-native/contacts';

@Component({
  selector: 'page-add',
  templateUrl: 'add.html'
})

export class AddsPage {
  allContacts: any;
  userData: any;
  addData: any;

  constructor(public navCtrl: NavController, private http: HttpClient, public navParams: NavParams, private storage: Storage, private platform: Platform) {
    // constructor(private contacts: Contacts, public navCtrl: NavController, public navParams: NavParams, private storage: Storage,  private platform: Platform) {
    this.storage.get('userData').then((val) => {
      console.log('Your name is', val);
      this.userData = val;
    });
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    this.http.get("http://admin.findacross.com/index.php/json/mlmAdvertise", { headers: headers }).subscribe(data => {
      this.addData = data;

    }, err => {
      console.log(err);

    })


    this.platform.ready().then(() => {
      // this.contacts.find(['displayName', 'name', 'phoneNumbers', 'emails'], { filter: "", multiple: true })
      //   .then(data => {
      //     this.allContacts = data;

      //   });
    })
  }



  openPage(url) {
    this.navCtrl.push(WebviewPage, {
      url: url
    });

  }

  search(id) {
    this.navCtrl.push(ListPage, {
      id: id
    });
  }

}
