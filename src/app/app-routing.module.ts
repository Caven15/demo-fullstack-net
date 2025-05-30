import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ContactApiComponent } from './components/contact-api/contact-api.component';

const routes: Routes = [
  {path : '', pathMatch: "full", component : HomeComponent},
  {path : 'home', component : HomeComponent},

  {
    path : 'demonstrations', children: [
      {path : 'contact-api', component : ContactApiComponent}
    ]
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
