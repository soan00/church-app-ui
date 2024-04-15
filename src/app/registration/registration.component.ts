import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { SignUpData } from '../models/signup';
import { ServiceService } from '../service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent implements OnInit {
  formData: SignUpData = {
    name: "",
    email: "",
    password: "",
    phoneNo: 0,
    roleId: 2,
    token: ""
  };
  toke: any = '';
  constructor(private http: ServiceService, private tost: ToastrService, private rout: Router) { }
  ngOnInit(): void {
    this.toke = localStorage.getItem("token");
    if (this.toke == '')
      this.rout.navigate(["/login"]);
  }
  signup(): void {
    this.http.showSpinner();
    this.http.signup(this.formData).subscribe({
      next: (res) => {
        this.http.hideSpinner();
        this.tost.success("Data save successfully!");
        this.rout.navigate(["/login"])
        console.log(res);
      }, error: (err) => {
        this.http.hideSpinner();
        this.tost.error(err.error)
        this.rout.navigate(["/signup"])
        console.log(err);
      }, complete: () => { this.http.hideSpinner(); }
    })
  }
}
