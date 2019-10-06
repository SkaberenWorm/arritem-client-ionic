import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {
  RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError,
  Router
} from '@angular/router';
import { AuthenticationService } from './commons/services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private _auth: AuthenticationService,
    private router: Router
  ) {
    this.initializeApp();
  }

  ngOnInit() {
    //console.log("ngOnInit APP");
    this._auth.isLogin().then(loEsta => {
      if (loEsta) {
        //console.log('is login');
        // this.store.dispatch(new SetAutenticado(this._auth.obtenerUserName()));
      }
    });
    //
    //this.blockUI.start();
    this.router.events.subscribe(this.navigationInterceptor.bind(this));
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  private navigationInterceptor(e: RouterEvent) {
    if (e instanceof NavigationStart) {
    }

    if (
      e instanceof NavigationEnd ||
      e instanceof NavigationCancel ||
      e instanceof NavigationError
    ) {
      const splashScreen = document.querySelector('.app-splash-screen');
      if (splashScreen) {
        splashScreen['style'].opacity = 0;
        setTimeout(() => splashScreen && splashScreen.parentNode.removeChild(splashScreen), 300);
      }
    }
  }
}
