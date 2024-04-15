import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginData } from './models/login';
import { Observable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { SignUpData } from './models/signup';
import { jwtDecode } from 'jwt-decode';
import { PrayerRequest } from './models/prayerRequest';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient, private spinner: NgxSpinnerService) { }
  URL: string = 'https://localhost:7056';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem("token")
    })
  };

  login(data: any): Observable<LoginData> {
    return this.http.post<LoginData>(`${this.URL}/Account/login`, data)
  }

  signup(data: SignUpData): Observable<SignUpData> {
    return this.http.post<SignUpData>(`${this.URL}/Account/sigup`, data)
  }
  postPrayerRequest(data: PrayerRequest): Observable<PrayerRequest> {
    return this.http.post<PrayerRequest>(`${this.URL}/Home/postPrayer`, data, this.httpOptions)
  }
  showSpinner() {
    this.spinner.show();
  }

  hideSpinner() {
    this.spinner.hide();
  }

  getEmailIdFromToken(): string {
    const token = localStorage.getItem("token");
    if (token) {
      const decode: any = jwtDecode(token);
      return decode.nameid;
    }
    return "";
  }
}
