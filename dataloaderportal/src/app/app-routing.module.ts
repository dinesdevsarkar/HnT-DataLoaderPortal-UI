import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { EditComponent } from './components/edit/edit.component';
import { HomeComponent } from './components/home/home.component';
import { ListComponent } from './components/list/list.component';
import { LoginComponent } from './components/login/login.component';
import { SearchComponent } from './components/search/search.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { UploadFileComponent } from './components/uploadfile/uploadfile.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "sign-up", component: SignUpComponent },
  { path: "admin", component: AdminComponent },
  { path: "admin/uploadfile", component: UploadFileComponent },
  { path: "admin/list", component: ListComponent },
  { path: "admin/search", component: SearchComponent },
  { path: "admin/edit", component: EditComponent },
  { path: "admin/list/edit", component: EditComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
