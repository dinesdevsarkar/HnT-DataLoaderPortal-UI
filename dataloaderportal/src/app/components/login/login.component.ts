import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { JwtRequest } from 'src/app/models/user';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  //Form Validables 
  loginForm: any = FormGroup;
  submitted = false;
  request: JwtRequest = new JwtRequest();
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private tokenStorage: TokenStorageService,
    private router: Router,
    private snackBar: MatSnackBar) { }
  //Add user form actions
  get f() { return this.loginForm.controls; }
  onSubmit() {

    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    //True if all the fields are filled
    if (this.submitted) {
      this.login();
    }

  }

  ngOnInit() {
    //Add User form validations
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.pattern]],
      password: ['', [Validators.required]]
    });

    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
  }

  //login user
  login() {
    const observables = this.userService.login(this.request);
    observables.subscribe(
      async (res: any) => {
        this.tokenStorage.saveToken(res.jwtToken);
        this.tokenStorage.saveUser({
          "username": res.username,
          "role": res.role
        });

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.successSnackBar("You are logging. Please wait...");
        await delay(4000);
        this.router.navigate(['/admin']);
        //this.reloadPage();
      }, err => {
        this.errorSnackBar("Something went wrong. Please try again...");
        console.log(err);
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
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

  // reloadPage(): void {
  //   window.location.reload();
  // }

}
