import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import User from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SignUpComponent implements OnInit {
  //Form Validables 
  RegisterForm: any = FormGroup;
  submitted = false;
  user: User = new User();

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private snackBar: MatSnackBar) { }

  //Add user form actions
  get f() { return this.RegisterForm.controls; }

  onSubmit() {

    this.submitted = true;
    // stop here if form is invalid
    if (this.RegisterForm.invalid) {
      return;
    }
    //True if all the fields are filled
    if (this.submitted) {
      this.createUser();
    }

  }

  ngOnInit() {
    //Add User form validations
    this.RegisterForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.pattern]],
      roles: [[''], [Validators.required, Validators.pattern]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  //create new user
  createUser() {
    const observables = this.userService.createUser(this.user);
    observables.subscribe(
      (res: any) => {
        // console.log(res);
        this.successSnackBar("Your account is created successfully!");
      }, (err) => {
        this.errorSnackBar("Something went wrong !, Please try again");
        console.log(err);
      }
    )
  }

  successSnackBar(message: string) {
    this.snackBar.open(message, 'X', {
      duration: 6000, panelClass: 'snackbar-success'
    });
  }

  errorSnackBar(message: string) {
    this.snackBar.open(message, 'X', {
      duration: 6000, panelClass: 'snackbar-error'
    });
  }
}
