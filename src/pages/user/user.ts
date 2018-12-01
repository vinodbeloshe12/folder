import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'user',
  templateUrl: 'user.html'
})
export class UserPage {
  adduser: any;
  user = {
    userId: this.randomString(),
    // userId: Math.floor(Math.random() * 899999 + 100000),
    name: '',
    payment: 0
  }

  constructor(private http: HttpClient, public toastCtrl: ToastController) { }

  showToast(msg: string, position: string) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: position
    });

    toast.present(toast);
  }

  randomString() {
    var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZ";
    var string_length = 8;
    var randomstring = '';
    for (var i = 0; i < string_length; i++) {
      var rnum = Math.floor(Math.random() * chars.length);
      randomstring += chars.substring(rnum, rnum + 1);
    }
    return randomstring;
  }

  createUserSubmit(data) {
    console.log("dddd", data);
    if (data.refId && data.userId && data.name) {
      let headers = new HttpHeaders();
      headers.append('Content-Type', 'application/json');
      // this.adduser = this.http.get('http://localhost/faback/index.php/json/getallcategory');
      this.http.post("http://admin.findacross.com/index.php/json/addUser", JSON.stringify(data), { headers: headers }).subscribe(data => {
        console.log('user created: ', data);
        this.user = {
          userId: this.randomString(),
          name: '',
          payment: 0
        }
      })
    } else {
      this.showToast("Please Enter All Details", 'top');
    }
  }
}
