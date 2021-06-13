import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { UserGuard } from './user.guard';
/*import { AddBookComponent } from './add-book/add-book.component';*/
import { BookDetailsComponent } from './book-details/book-details.component';
import { AddbookComponent } from './addbook/addbook.component'
import { BookfileComponent } from './bookfile/bookfile.component'
import { ReadbookComponent } from './readbook/readbook.component'

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
{
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [UserGuard]
  },
  {
    path: 'addBook',
    component:  AddbookComponent
  },
  {
    path: 'addbookfile',
    component: BookfileComponent
  },
  {
    path: 'bookDetails',
    component: BookDetailsComponent
  },
  {
    path: 'readbook',
    component: ReadbookComponent 
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
