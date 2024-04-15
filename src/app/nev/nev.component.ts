import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-nev',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './nev.component.html',
  styleUrl: './nev.component.css'
})
export class NevComponent {


  logout() {
    localStorage.setItem('token', "");
  }
}
