import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
// import { ListPage } from '../list/list';
// import { WebviewPage } from '../webview/webview';
// import { Contacts, ContactFieldType, ContactFindOptions } from '@ionic-native/contacts';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  allContacts: any;
  userData: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }



  openPage(url) {
    // this.navCtrl.push(WebviewPage, {
    //   url: url
    // });

  }

  search(id) {
    // this.navCtrl.push(ListPage, {
    //   id: id
    // });
  }

}
