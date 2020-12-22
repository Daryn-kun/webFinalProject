import {Component, Input, OnInit} from '@angular/core';
import {RestapiService} from '../../service/restapi.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  User: any = [];
  passwordCon = '';
  regEmail = true;
  didMatch = true;
  @Input() userDetails = {
    firstName: '', lastName: '', email: '', password: ''
  };

  constructor(private registerService: RestapiService, private router: Router) {
  }

  onSubmit(value: any) {
    console.log(value);
    if (this.checkEmail(this.userDetails.email)) {
      if (this.userDetails.password == this.passwordCon) {
        this.registerService.isUserLoggedIn = true;
        this.registerService.registerUser(this.userDetails)
          .subscribe((data: {}) => {
            this.router.navigate(['/home']);
          });
        this.registerService.globalSavedId = this.getLastId();
        console.log('Passed id: ' + this.registerService.globalSavedId);
      } else {
        this.didMatch = false;
      }
    } else {
      this.regEmail = false;
    }

  }

  ngOnInit(): void {
    this.registerService.getUsers()
      .subscribe(data => this.User = data);
  }

  getLastId() {
    return this.User[this.User.length - 1].id + 1;
  }

  checkEmail(email): boolean {
    if (this.User.find(x => x.email === email)) {
      return false;
    } else {
      return true;
    }

  }
}

