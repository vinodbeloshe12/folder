import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as _ from 'lodash';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  userData: any;
  userArr: any = [];
  filterUser = [];
  currentUser: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient, public toastCtrl: ToastController, ) {
    console.log("navparms", navParams);
    let id = navParams.get('id');
    this.getUserTree(id);
  }

  getUserTree(id) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    this.http.get("http://admin.findacross.com/index.php/json/getTree?id=" + id, { headers: headers }).subscribe(data => {
      console.log('my data: ', data);
      let usertdata: any = data;
      if (usertdata.length == 0 || usertdata.data.length == 0) {
        this.showToast("Invalid User Id", 'top');
        this.navCtrl.push(HomePage);

        console.log("aaaa", this.filterUser);
      } else {
        this.currentUser = usertdata.user;
        this.userArr = usertdata.data;
        let tIndex = this.userArr.findIndex(i => i.id == id);

        this.userData = tIndex != -1 ? this.userArr[tIndex] : '';
        console.log("userDatauserData", this.userData, tIndex)
        let gval = _.groupBy(this.userArr, 'parentid');
        this.filterUser = gval[id];
        console.log("gvallllllll", gval)
        if (this.filterUser && this.filterUser.length > 0) {
          this.filterUser.forEach(element => {
            console.log(element)
            element.users = gval[element.id];
            if (element.users && element.users.length > 0) {
              element.users.forEach(element => {
                element.users = gval[element.id];
              });
            }
          });
        }

      }
    })
  }

  showToast(msg: string, position: string) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: position
    });

    toast.present(toast);
  }
}
