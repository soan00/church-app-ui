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
  ngOnInit(): void {
    this.emailId = this.http.getEmailIdFromToken();
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
}
