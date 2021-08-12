import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { UtilityService } from "./services/utility.service";
import { NavController } from "@ionic/angular";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(
    private utility: UtilityService,
    private navCtrl: NavController
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.utility.isUserLoggedIn()) {
      // this.navCtrl.navigateRoot("influencer/browse-influencers");
      return true;
    } else {
      return true;
    }
  }
}
