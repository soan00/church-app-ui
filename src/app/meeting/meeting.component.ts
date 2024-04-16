import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MeetingData } from '../models/meeting';
import { ServiceService } from '../service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-meeting',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './meeting.component.html',
  styleUrl: './meeting.component.css'
})
export class MeetingComponent {
  meeting: MeetingData = {
    name: "",
    location: "",
    date: new Date,
    endTime: "",
    startTime: "",
    respone: ""
  }
  constructor(private http: ServiceService, private tost: ToastrService) { }
  submitForm() {
    this.http.showSpinner();
    this.http.postMeeting(this.meeting).subscribe({
      next: (res) => {
        this.http.hideSpinner();
        this.tost.success(res.respone);
        console.log(res);
      }, error: (err) => {
        this.http.hideSpinner();
        this.tost.error(err.error.response);
        console.log(err);
      }, complete: () => this.http.hideSpinner()
    })
  }
}
