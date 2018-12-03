import { Component } from '@angular/core';
import { NavController, NavParams, Platform, Tab } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AddsPage } from '../adds/add';
import { NewsPage } from '../news/news';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  userData: any;
  tab1: any;
  tab2: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
    this.storage.get('userData').then((val) => {
      console.log('Your name is', val);
      this.userData = val;
    });
    this.tab1 = AddsPage;
    this.tab2 = NewsPage;

  }




}
