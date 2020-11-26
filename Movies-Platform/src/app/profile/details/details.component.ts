import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.less']
})
export class DetailsComponent implements OnInit {
  user: Observable<User>;
  currentUser: User;
  error: string;

  constructor(private userService: UserService) { 
    this.user = this.userService.getUser();
    this.user.subscribe(
      (user) => (this.currentUser = user),
      (error) => {
        this.error = error;
      }
    );
  }

  

  ngOnInit(): void {
  }

}
