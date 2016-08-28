import {Component} from '@angular/core';
import {NavController, ViewController, NavParams, ModalController, Loading, LoadingController, AlertController} from 'ionic-angular';

import {UserService} from '../../services/user.service';
import {TimelineService} from '../../services/timeline.service';
import {Auth} from '../../other/auth.component';


@Component({
  templateUrl: 'build/pages/user/authenticate.html',
  providers: [
    UserService,
    TimelineService,
  ],
})
export class AuthenticatePage {
  //
  logInModel: {phone?: number, password?: string} = {};

  //
  signUpModel: {nickname?: string, phone?: number, password?: string} = {};

  //
  currentModal: string = 'LogIn';

  //
  loading: Loading;


  //
  //
  constructor(
    private navController: NavController,
    private navParams: NavParams,
    private viewCtrl: ViewController,
    private modalCtrl: ModalController,
    private userService: UserService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private auth: Auth
  ) {
    if (this.navParams.get('modal')) {
      this.currentModal = this.navParams.get('modal');
    }
  }


  //
  //
  cancelModal() {
    this.viewCtrl.dismiss();
  }


  //
  //
  logInHandler(ngForm) {
    let data: Object = {
      phone: this.logInModel.phone,
      password: this.logInModel.password,
    };

    if (ngForm.valid) {
      this.openLoadingModal();

      this.userService.logIn(data)
      .then(ret => {
        this.auth.logIn(ret);
        this.viewCtrl.dismiss().then((data) => {
          this.dismissLoadingModal();
        });
      }, (data) => {
        this.dismissLoadingModal().then(() => {
          this.openAlter({title: 'LogIn Failed', subTitle: data._body});
        });
      });
    }
  }


  //
  //
  signUpHandler(ngForm) {
    let data: Object = {
      nickname: this.signUpModel.nickname,
      phone: this.signUpModel.phone,
      password: this.signUpModel.password,
    };

    if (ngForm.valid) {
      this.openLoadingModal();

      this.userService.signUp(data)
      .then(ret => {
        this.auth.logIn(ret);
        this.viewCtrl.dismiss().then(() => {
          this.dismissLoadingModal();
        });
      }, (data) => {
        this.dismissLoadingModal().then(() => {
          this.openAlter({title: 'SignUp Failed', subTitle: data._body});
        });
      });
    }
  }


  //
  //
  openLoadingModal() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    return this.loading.present();
  }


  //
  //
  dismissLoadingModal() {
    return this.loading.dismiss();
  }


  //
  //
  openAlter(params?) {
    if (!params) {
      params = {
        title: 'Alter',
        subTitle: '',
      }
    }

    let alert = this.alertCtrl.create({
      title: params.title,
      subTitle: params.subTitle,
      buttons: ['OK']
    });
    alert.present();
  }
}