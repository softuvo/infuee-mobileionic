import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { UtilityService } from './utility.service';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public baseUrl = 'https://infuee.softuvo.xyz/api/';
  // public baseUrl = 'http://127.0.0.1:8000/api/';

  public webUrl = 'https://infuee.softuvo.xyz/';
  // public webUrl = 'http://127.0.0.1:8000/';
  public httpOptions;
  constructor(private http: HttpClient, private utility: UtilityService) {
    this.httpOptions = {
      // headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      headers: new HttpHeaders({
        Accept: 'application/json, text/plain',
        'Content-Type': 'application/json',
      }),
      observe: 'response' as 'response',
    };
  }

  login(data): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'login', data).pipe(
      tap((_) => this.utility.log('login')),
      catchError(this.handleError('login', []))
    );
  }

  logout(): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'logout').pipe(
      tap((_) => this.utility.log('logout')),
      catchError(this.handleError('logout', []))
    );
  }

  signUp(data): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'register', data).pipe(
      tap((_) => this.utility.log('register')),
      catchError(this.handleError('register', []))
    );
  }

  forgetPassword(data): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'forget-password', data).pipe(
      tap((_) => this.utility.log('forget-password')),
      catchError(this.handleError('forget-password', []))
    );
  }
  createNewPswd(data): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'create-new-password', data).pipe(
      tap((_) => this.utility.log('create-new-password')),
      catchError(this.handleError('create-new-password', []))
    );
  }

  getCountryCode() {
    return this.http.get<any>(this.baseUrl + 'countries').pipe(
      tap((_) => this.utility.log('countries')),
      catchError(this.handleError('countries', []))
    );
  }

  getCategories() {
    return this.http.get<any>(this.baseUrl + 'categories').pipe(
      tap((_) => this.utility.log('categories')),
      catchError(this.handleError('categories', []))
    );
  }

  getSocialPlateForm() {
    return this.http.get<any>(this.baseUrl + 'social-platform').pipe(
      tap((_) => this.utility.log('social-platform')),
      catchError(this.handleError('social-platform', []))
    );
  }

  getProfileInfo() {
    return this.http.get<any>(this.baseUrl + 'get-account-info').pipe(
      tap((_) => this.utility.log('get-account-info')),
      catchError(this.handleError('get-account-info', []))
    );
  }

  updateProfile(data): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'post-account-info', data).pipe(
      tap((_) => this.utility.log('post-account-info')),
      catchError(this.handleError('post-account-info', []))
    );
  }

  getInfluencers(data): Observable<any> {
    let urlSearchParams = new URLSearchParams();
    if (data) {
      if (data.page) {
        urlSearchParams.append('page', data.page);
      }
      if (data.search) {
        urlSearchParams.append('search', data.search);
      }
      if (data.filter) {
        urlSearchParams.append(
          'order',
          data.filter.order ? data.filter.order : 1
        );
        if (data.filter.age) {
          urlSearchParams.append('age', data.filter.age);
        }
        if (data.filter.category) {
          let category = '';
          for (let cat in data.filter.category) {
            if (data.filter.category[cat] == true) {
              category += category == '' ? cat : '&' + cat;
            }
          }
          urlSearchParams.append('category', category);
        }

        if (data.filter.influencers) {
          for (let item in data.filter.influencers) {
            if (data.filter.influencers[item] == true) {
              urlSearchParams.append(item, item);
            }
          }
        }

        if (data.filter.priceRange) {
          if (
            data.filter.priceRange.lower >= 0 &&
            data.filter.priceRange.upper &&
            data.filter.priceRange.upper > 0
          ) {
            urlSearchParams.append('low_price', data.filter.priceRange.lower);
            urlSearchParams.append('high_price', data.filter.priceRange.upper);
          }
        }
      }
    }

    return this.http
      .get<any>(this.baseUrl + `influencers?` + urlSearchParams.toString())
      .pipe(
        tap((_) => this.utility.log('influencers')),
        catchError(this.handleError('influencers', []))
      );
  }

  changePswd(data): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'change-password', data).pipe(
      tap((_) => this.utility.log('change-password')),
      catchError(this.handleError('change-password', []))
    );
  }

  getMyAccountProfile(user): Observable<any> {
    return this.http.get<any>(this.baseUrl + `influencer/${user}/profile`).pipe(
      tap((_) => this.utility.log('change-password')),
      catchError(this.handleError('change-password', []))
    );
  }

  addToCart(id): Observable<any> {
    return this.http.get<any>(this.baseUrl + `addtocart/${id}`).pipe(
      tap((_) => this.utility.log('change-password')),
      catchError(this.handleError('change-password', []))
    );
  }

  getOrderList(): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'orders').pipe(
      tap((_) => this.utility.log('orders')),
      catchError(this.handleError('orders', []))
    );
  }

  updateProfilePic(form): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'updateProfileImage', form).pipe(
      tap((_) => this.utility.log('updateProfileImage')),
      catchError(this.handleError('updateProfileImage', []))
    );
  }

  addRating(data): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'addRatings', data).pipe(
      tap((_) => this.utility.log('addRatings')),
      catchError(this.handleError('addRatings', []))
    );
  }

  getCartData(): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'mycart').pipe(
      tap((_) => this.utility.log('mycart')),
      catchError(this.handleError('mycart', []))
    );
  }

  getTransaction(): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'transactions').pipe(
      tap((_) => this.utility.log('transactions')),
      catchError(this.handleError('transactions', []))
    );
  }

  deleteCartItem(id): Observable<any> {
    return this.http
      .post<any>(this.baseUrl + 'deleteItem', { item_id: id })
      .pipe(
        tap((_) => this.utility.log('deleteItem')),
        catchError(this.handleError('deleteItem', []))
      );
  }

  placeOrder(data): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'placeorder', data).pipe(
      tap((_) => this.utility.log('placeorder')),
      catchError(this.handleError('placeorder', []))
    );
  }

  becomeInfluencer(data): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'become-influencer', data).pipe(
      tap((_) => this.utility.log('become-influencer')),
      catchError(this.handleError('become-influencer', []))
    );
  }

  requestOtp(data): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'fa-send-otp', data).pipe(
      tap((_) => this.utility.log('fa-send-otp')),
      catchError(this.handleError('fa-send-otp', []))
    );
  }

  sendOtp(data): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'enable-fa', data).pipe(
      tap((_) => this.utility.log('enable-fa')),
      catchError(this.handleError('enable-fa', []))
    );
  }

  disableFA(data): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'disable-fa', data).pipe(
      tap((_) => this.utility.log('disable-fa')),
      catchError(this.handleError('disable-fa', []))
    );
  }

  myPlans(): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'myplans').pipe(
      tap((_) => this.utility.log('myplans')),
      catchError(this.handleError('myplans', []))
    );
  }

  addPlan(data): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'add-plan', data).pipe(
      tap((_) => this.utility.log('add-plan')),
      catchError(this.handleError('add-plan', []))
    );
  }

  getBaseUrl() {
    return this.baseUrl;
  }
  getImageUrl() {
    return 'https://infuee.softuvo.xyz/media/users/';
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.utility.hideLoader();
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.utility.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getBankDetails(): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'getbankdetails').pipe(
      tap((_) => this.utility.log('bank details')),
      catchError(this.handleError('bankdetails', []))
    );
  }

  deleteBankDetails(): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'deletebankdetails').pipe(
      tap((_) => this.utility.log('deletebankdetails')),
      catchError(this.handleError('deletebankdetails', []))
    );
  }

  saveBankData(data): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'savebankdetails', data).pipe(
      tap((_) => this.utility.log('savebankdetails')),
      catchError(this.handleError('savebankdetails', []))
    );
  }

  loginWithOtp(data) {
    return this.http.post<any>(this.baseUrl + 'loginOTP', data).pipe(
      tap((_) => this.utility.log('loginwithotp')),
      catchError(this.handleError('loginwithotp', []))
    );
  }
  verifyWithOtp(data) {
    return this.http.post<any>(this.baseUrl + 'verifyOTP', data).pipe(
      tap((_) => this.utility.log('verifyOTP')),
      catchError(this.handleError('verifyOTP', []))
    );
  }
  resendOtp(data) {
    return this.http.post<any>(this.baseUrl + 'resendOTP', data).pipe(
      tap((_) => this.utility.log('resend Otp')),
      catchError(this.handleError('resend otp', []))
    );
  }

  getFilteredInfluencers(param): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'influencers' + param).pipe(
      tap((_) => this.utility.log('influencers')),
      catchError(this.handleError('influencers', []))
    );
  }
  applyCoupon(code) {
    return this.http.post<any>(this.baseUrl + 'apply-coupon', code).pipe(
      tap((_) => this.utility.log('coupon applied')),
      catchError(this.handleError('coupon applied', []))
    );
  }
  removeCoupon(id) {
    return this.http.post<any>(this.baseUrl + 'remove-coupon', id).pipe(
      tap((_) => this.utility.log('coupon removed')),
      catchError(this.handleError('coupon removed', []))
    );
  }
  addJob(form): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'add-job', form).pipe(
      tap((_) => this.utility.log('add-job')),
      catchError(this.handleError('add-job', []))
    );
  }
}
