import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bookfile',
  templateUrl: './bookfile.component.html',
  styleUrls: ['./bookfile.component.css']
})
export class BookfileComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }

  book
  onSubmit(f: NgForm) {
    if (!f.valid) {
     // this.msg = "something went  wrong!!";
      //this.avail = true;
      return;
    }
    const formData = new FormData();
    formData.append('file', this.book);
    formData.append('booktitle', f.controls.booktitle.value); 
    this.http.post<any>('http://localhost:3000/api/addbookfile', formData).subscribe(
      (res) => {
        console.log(res)
      }
      ,
      (error) => {
        console.log(error);
      }
    );

  }
  selectBook(event) {
    console.log("image selected");
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.book = file;
    }
  }


}
