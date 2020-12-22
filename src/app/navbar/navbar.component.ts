import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {RestapiService} from '../service/restapi.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  sticky = false;
  reg$: boolean;
  returnUrl: string;

  constructor(private loginService: RestapiService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.reg$ = this.loginService.isUserLoggedIn;
    this.returnUrl = this.route.snapshot.queryParams['home'] || 'login';

  }

  @ViewChild('stickHeader') header: ElementRef;

  @HostListener('window:scroll', ['$event'])
  // tslint:disable-next-line:typedef
  handleScroll() {
    const windowScroll = window.pageXOffset;
    if (windowScroll >= this.header.nativeElement.offsetHeight) {
      this.sticky = true;
    } else {
      this.sticky = false;
    }
  }

  logOut() {
    this.loginService.isUserLoggedIn = false;
    this.router.navigateByUrl(this.returnUrl);
  }
}
