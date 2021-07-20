import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credentials: FormGroup;
  errors: boolean = false;
  spinner: boolean = false;
  mensaje: string = "";

  constructor(private loginService: LoginService, private router:Router) {
    this.credentials = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(4)]),
      password: new FormControl('', Validators.required)
    })

  }


  ngOnInit(): void {
  }

  autenticate() {
    this.errors = false;
    this.spinner = true;
    if (this.credentials.valid) {
      this.loginService.login(this.credentials.value).subscribe(res => {
        if (res.error) {
          this.mensaje = res.error
          this.errors = true;
        }
        else {
          localStorage.setItem("token", res.token);
         this.router.navigate(['dashboard']);
        }
        this.spinner = false;
      }, err => {
        this.errors = true;
        this.spinner = false;
        if (err.status == 500)
          this.mensaje = "El servidor no esta disponible, intentelo mas tarde!";
      })
    }
  }

  
}
