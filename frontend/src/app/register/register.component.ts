import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  signupForm:FormGroup = new FormGroup({
    name:new FormControl(null,Validators.required),
    email:new FormControl(null,[Validators.email,Validators.required]),
    password:new FormControl(null,Validators.required),
    repassword:new FormControl(null,Validators.required)
  })

  public msg: any = [];
  public avail: boolean;
  constructor(private _router: Router,private _userService: UserService) { }

  ngOnInit(): void {
  }

  registerUser(){
    if (!this.signupForm.valid) {
      console.log("Invalid registration inputs");
      this.msg = "please,fill valid inputs";
      this.avail = true
      return;
    }
   if (this.signupForm.controls.password.value != this.signupForm.controls.repassword.value) {
      console.log("Password and confirm password does not match");
      this.msg = "Password and confirm password does not match";
      this.avail = true
      return; 
    }
    this._userService.register(JSON.stringify(this.signupForm.value))
      .subscribe(
        data => {
          console.log(data);
          localStorage.setItem('token',data['token']);
          this._router.navigate(['/login']);
        },
        error => console.error(error)
      )
  }

}
