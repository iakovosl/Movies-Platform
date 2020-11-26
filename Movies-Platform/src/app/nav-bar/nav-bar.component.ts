import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.less']
})
export class NavBarComponent implements OnInit {
  constructor(private accountService: AccountService, private router: Router) {
    this.accountService.user.subscribe((x) => (this.user = x));
  }

  user: User;

  ngOnInit(): void {}

  logout() {
    this.accountService.logout();
  }
}
