import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private _router: Router,private _userService: UserService) { }

  ngOnInit(): void {
    this.showBooks()
  }

  logoutUser()
  {
    this._userService.logoutUser()
  }
books:any[]
  showBooks() {
    this._userService.getallBook().subscribe(
      data => {
        this.books = data['msg'];
        console.log(data);
      },
      error => {
        /*console.log("yoyo err");
        if (error instanceof HttpErrorResponse) {
          if (error.status == 401 || error.status == 500) {
            this.router.navigate(['/login'])
          }
        }*/
        console.log(error);
      }
    )
    // console.log();
  }

  viewBookDetails(book){
    this._userService.setBook(book)
    this._router.navigate(['/bookDetails'])
  }

}
