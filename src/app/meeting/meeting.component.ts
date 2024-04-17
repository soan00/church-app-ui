import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MeetingData } from '../models/meeting';
import { ServiceService } from '../service.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-meeting',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './meeting.component.html',
  styleUrl: './meeting.component.css'
})
export class MeetingComponent implements OnInit {
  meetingDetails: any;
  meeting: MeetingData = {
    name: "",
    location: "",
    date: new Date,
    endTime: "",
    startTime: "",
    respone: ""
  }
  constructor(private http: ServiceService, private tost: ToastrService) { }
  ngOnInit(): void {
    this.loadData();
  }
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
      }, complete: () => { this.http.hideSpinner(); this.loadData() }
    })
  }
  loadData() {
    this.http.showSpinner();
    this.http.getAllMeetings().subscribe({
      next: (res) => {
        this.http.hideSpinner();
        this.meetingDetails = res.data;
        console.log(JSON.stringify(res.data));
      }, error: (err) => { this.http.hideSpinner(); console.log(err); },
      complete: () => this.http.hideSpinner()
    })
  }
}

