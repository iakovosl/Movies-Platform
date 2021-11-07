import { Component, OnInit } from '@angular/core';
import { UserService } from '@app/_services';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '@app/_models';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.less']
})
export class EditComponent implements OnInit {
  form: FormGroup;
  id: string;
  isAddMode: boolean;
  loading = false;
  submitted = false;

  user: User;
  firstname: string;
  lastname: string;
  username: string;
  newPassword: string;



  constructor(private userService: UserService,
              private router: Router,
              private formBuilder: FormBuilder) { }


  ngOnInit() {
    this.form = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.userService.getUser().subscribe((user) => {
      this.user = user;
      this.form.patchValue(user);
    });
  }
  
// convenience getter for easy access to form fields
get f() { return this.form.controls; }

updateUser() {
  let dirtyValues = {};

  Object.keys(this.form.controls).forEach((key) => {
    let currentControl = this.form.controls[key];

    if (currentControl.dirty) {
      dirtyValues[key] = currentControl.value;
    } else {
    }
  });

  this.userService
    .updateUser(dirtyValues)
    .pipe()
    .subscribe({
      next: () => {
        this.router.navigate(['/register']);
      },
      error: (err) => {
        console.error('something wrong occurred: ' + err);
      },
    });
}
}
