import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { HttpClient } from '@angular/common/http';
import { PdfViewerModule } from 'ng2-pdf-viewer';

@Component({
  selector: 'app-readbook',
  templateUrl: './readbook.component.html',
  styleUrls: ['./readbook.component.css']
})
export class ReadbookComponent implements OnInit {

  public pdfSrc:any
  public book:any
  public src:any
  constructor(private _userService: UserService, private http:HttpClient) { }

  
  ngOnInit(): void {
    this.book = this._userService.getBook()
    console.log('getting details')
    console.log(this.book)
    this.src = "../../assets/uploads/"+this.book.bookpath
    console.log(this.src)
    this.pdfSrc = this.src

    
  }
  
  logoutUser()
  {
    this._userService.logoutUser()
  }

}
