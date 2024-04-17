import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { LoginData } from '../models/login';
import { Router, RouterModule } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, NgxSpinnerModule, CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginData: LoginData = {
    emailId: '',
    password: '',
    token: '',
    role: 0
  }
  toke: any = ''
  constructor(private service: ServiceService, private tost: ToastrService, private rout: Router) {

  }
  ngOnInit(): void {
    this.toke = localStorage.getItem("token");
    if (this.toke == '' || this.toke == undefined)
      this.rout.navigate(["/login"]);
    else
      this.rout.navigate(['/home']);
  }


  login(): void {
    this.service.showSpinner();
    this.service.login(this.loginData).subscribe({
      next: (res) => {
        localStorage.setItem("token", res.token)
        localStorage.setItem("role", res.role.toString())
        this.tost.success("Login Success!");
        this.rout.navigate(["/home"]);
      }, error: (err) => { this.service.hideSpinner(); this.tost.error("Login Fail!"); this.rout.navigate(["/login"]); console.log("login fails", err); },
      complete: () => {
        this.service.hideSpinner();
      }
    });
  }
}
