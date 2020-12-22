import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {MylistComponent} from './mylist/mylist.component';
import {UserGuardGuard} from './guard/user-guard.guard';
import {NavbarComponent} from './navbar/navbar.component';


const routes: Routes = [
  {
    path: 'home', component: HomeComponent,
    canActivate: [UserGuardGuard],
  },
  {
    path: 'mylist', component: MylistComponent,
    canActivate: [UserGuardGuard],
  },
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
