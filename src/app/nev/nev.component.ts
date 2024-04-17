import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-nev',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './nev.component.html',
  styleUrl: './nev.component.css'
})
export class NevComponent implements OnInit {
  @Input() role: number = 0;
  email: string = ''
  constructor(private http: ServiceService) { }
  ngOnInit(): void {
    const token = localStorage.getItem("token");
    console.log(this.role);
    if (token == '' || token == undefined)
      this.email = ''
    else {
      const email = this.http.getEmailIdFromToken();
      this.email = email;
    }
  }

  logout() {
    localStorage.setItem('token', "");
    localStorage.setItem('role', "0");
  }
}
