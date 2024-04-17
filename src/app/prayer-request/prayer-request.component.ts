import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PrayerRequest } from '../models/prayerRequest';
import { ServiceService } from '../service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-prayer-request',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './prayer-request.component.html',
  styleUrl: './prayer-request.component.css'
})
export class PrayerRequestComponent implements OnInit {
  constructor(private http: ServiceService, private tost: ToastrService) { }
  emailId: string = "";
  prayer: any;
  role: number = parseInt(localStorage.getItem("role") ?? "0");
  ngOnInit(): void {
    this.emailId = this.http.getEmailIdFromToken();
    this.getPrayer();
  }
  prayerRequest: PrayerRequest = { prayerRequest: "", emailId: this.emailId, requestFor: "", message: "" };
  submitPrayerRequest() {
    this.http.showSpinner();
    this.http.postPrayerRequest(this.prayerRequest).subscribe({
      next: (res) => {
        this.http.hideSpinner();
        this.tost.success(res.message);

      },
      error: (err) => {
        this.http.hideSpinner();
        this.tost.error(err.message);
        console.log(err);
      },
      complete: () => {
        this.http.hideSpinner();
      }
    })
  }
  getPrayer() {
    this.http.showSpinner();
    this.http.getPrayerRequest().subscribe({
      next: (res) => {
        this.prayer = res;
        this.http.hideSpinner();
      }, error: (err) => {
        this.http.hideSpinner();
        console.log(err);
      }, complete: () => this.http.hideSpinner()
    })
  }
}
