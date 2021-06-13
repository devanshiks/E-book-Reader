import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup = new FormGroup({
    email:new FormControl(null,[Validators.email,Validators.required]),
    password:new FormControl(null,Validators.required),
  })

  public msg: any = [];
  public avail: boolean;
  constructor(private _router: Router,private _userService: UserService) { }


  ngOnInit(): void {
  }

  loginUser()
  {
    if(!this.loginForm.valid)
    {
      console.log('invalid');
      this.msg = "please,fill valid inputs";
      this.avail = true
      return;
    }
    this._userService.login(JSON.stringify(this.loginForm.value))
      .subscribe(
        data => {
          console.log(data);
          console.log(data['msg']);
          if (data['msg'] == 'Login successfull') {
            localStorage.setItem('token', data['token']);
            this._router.navigate(['/home']);
          }
          else {
           this.msg = data['msg'];
            this.avail = true;
            return;
          }
        },
        error => { console.error(error) }
      )
  }

}
