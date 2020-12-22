import {Component, OnInit} from '@angular/core';
import {RestapiService} from '../../service/restapi.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  User: any = [];
  email = '';
  password = '';
  logEmail = true;
  logPass = true;
  user: any;

  constructor(public restApi: RestapiService, private router: Router, private route: ActivatedRoute) {

  }

  onSubmit(value: any) {
    if (this.User.find(x => x.email === this.email)) {
      this.user = this.User.find(x => x.email === this.email);
      // tslint:disable-next-line:triple-equals
      if (this.user.password == this.password) {
        console.log(value);
        this.restApi.isUserLoggedIn = true;
        this.router.navigate(['/home']);
        this.restApi.globalSavedId = this.user.id;
        console.log('Passed id: ' + this.restApi.globalSavedId);
      } else {
        this.logPass = false;
      }
    } else {
      this.logEmail = false;
    }
  }

  ngOnInit(): void {
    this.restApi.getUsers()
      .subscribe(data => this.User = data);
    console.log('User: ' + this.User);
  }

}
