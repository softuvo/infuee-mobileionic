import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { Router } from "@angular/router";
import { ToastController } from "@ionic/angular";
import { UtilityService } from "./services/utility.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    public toastController: ToastController,
    private utility: UtilityService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.utility.getCookie("token");

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: "Bearer" + " " + token,
        },
      });
    }

    if (!request.headers.has("Content-Type")) {
      if (
        request.url.includes("updateProfileImage") ||
        request.url.includes("savebankdetails")
      ) {
        request = request.clone({
          setHeaders: {
            // 'content-type': 'application/json'
            "Content-Type":
              "multipart/form-data; boundary=----WebKitFormBoundaryqCQIBGheOwhMKTal",
          },
        });
      } else {
        request = request.clone({
          setHeaders: {
            "content-type": "application/json",
            // 'content-type': 'multipart/form-data'
          },
        });
      }
    }
    request = request.clone({
      headers: request.headers.set("Accept", "application/json"),
    });

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          console.log("event--->>>", event);
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        if (error["code"] == 301) {
          this.presentToast(error.message);
          localStorage.clear();
          this.router.navigateByUrl("/login");
        }
        return throwError(error);
      })
    );
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      position: "top",
    });
    toast.present();
  }
}
