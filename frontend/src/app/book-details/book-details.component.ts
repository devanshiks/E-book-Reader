import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../user.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  constructor(private _router: Router,private _userService: UserService) { }

  book:any
  ngOnInit(): void {
    this.book = this._userService.getBook()
    console.log('getting details')
    console.log(this.book)
  }

  readBook(readbk){
    this._userService.setBook(readbk)
    this._router.navigate(['/readbook']) 
  }

  logoutUser()
  {
    this._userService.logoutUser()
  }

  }



