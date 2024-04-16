import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit {
  meetingDetails: any;
  constructor(private http: ServiceService) { }

  ngOnInit(): void {
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
