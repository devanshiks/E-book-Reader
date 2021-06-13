import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from './user.service';
import { CommonModule } from '@angular/common';
import { UserGuard } from './user.guard';
import { PdfViewerModule } from 'ng2-pdf-viewer';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { TokenInterceptorService } from './token-interceptor.service';
/*import { AddBookComponent } from './add-book/add-book.component';*/
import { BookDetailsComponent } from './book-details/book-details.component';
import { AddbookComponent } from './addbook/addbook.component';
import { BookfileComponent } from './bookfile/bookfile.component';
import { ReadbookComponent } from './readbook/readbook.component'

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    BookDetailsComponent,
    AddbookComponent,
    BookfileComponent,
    ReadbookComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    PdfViewerModule
  ],
  providers: [UserService, UserGuard, 
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
