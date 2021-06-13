import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addbook',
  templateUrl: './addbook.component.html',
  styleUrls: ['./addbook.component.css']
})
export class AddbookComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }
  image
  onSubmit(f: NgForm) {
    if (!f.valid) {
     // this.msg = "something went  wrong!!";
      //this.avail = true;
      return;
    }
    const formData = new FormData();
    formData.append('file', this.image);
    formData.append('booktitle', f.controls.booktitle.value);
    formData.append('bookauthor', f.controls.bookauthor.value);
    formData.append('bookgenre', f.controls.bookgenre.value);
    formData.append('bookdescription', f.controls.bookdescription.value);
    formData.append('bookaboutauthor', f.controls.bookaboutauthor.value);
    this.http.post<any>('http://localhost:3000/api/addbook', formData).subscribe(
      (res) => {
        console.log(res)
      }
      ,
      (error) => {
        console.log(error);
      }
    );

  }
  selectImage(event) {
    console.log("image selected");
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.image = file;
    }
  }
}


