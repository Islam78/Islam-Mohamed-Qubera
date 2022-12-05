import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/core/modules/user.model';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formData: FormGroup;
  processing: boolean = false;
  error: boolean = false;
  ErrMsg: string = 'Welcome back! Please enter your details.';
  constructor(private authSer: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }
  // initial form 
  private initForm() {
    this.formData = new FormGroup({
      username: new FormControl(),
      password: new FormControl(),
    });
  }
  // btn login
  private login(data: UserModel) {
    this.processing = true
    this.authSer.login({
      username: data.username,
      password: data.password,
    }).then(
      data => {
        if (data.id) {
          this.handleLoginSuccess();
        } else {
          this.handleLoginError(data);
        }
      }
    )
  }
  // login success
  private handleLoginSuccess() {
    this.processing = false;
    this.error = false;
    this.router.navigate(['/orders']);
  }
  // dont login 
  private handleLoginError(error: string) {
    this.processing = false;
    this.error = true;
    if (!this.formData.valid) {
      this.ErrMsg = `Enter Email And password   user: kminchelle, password: 0lelplR`
    } else {
      this.ErrMsg = error
    }
  }
  // submit btn
  onSubmitButtonClicked(data: UserModel) {
    this.error = false;
    this.processing = false;
    this.login(data);
  }

}
