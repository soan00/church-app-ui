import { Component, OnInit } from '@angular/core';
import { NevComponent } from '../nev/nev.component';
import { Router, RouterOutlet } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NevComponent, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  token: any = ""
  meetingDetails: any;
  constructor(private rout: Router) { }
  ngOnInit(): void {
    this.token = localStorage.getItem("token");
    if (this.token == '')
      this.rout.navigate(["/login"]);
    const email: any = jwtDecode(this.token);
    console.log(email?.nameid);
  }

}
