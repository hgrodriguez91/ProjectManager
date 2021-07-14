import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {LoginService} from '../../services/login.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credentials: FormGroup;

  constructor(private loginService: LoginService) {
    this.credentials = new FormGroup({
      username: new FormControl(""),
      password: new FormControl("")
    })
  }


  ngOnInit(): void {
  }

  autenticate(){
    this.loginService.login(this.credentials.value).subscribe(res=>{
      localStorage.setItem("token", res.token);
      console.log(res);
    })
    console.log(this.credentials.value);
  }

}
