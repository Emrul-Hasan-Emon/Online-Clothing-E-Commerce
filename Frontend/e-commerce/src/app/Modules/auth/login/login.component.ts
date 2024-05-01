import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Service/auth.service';

export interface Response {
  id: string,
  name: string,
  role: string,
  token?: any
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  logInForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.logInForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }


  private userValidation(userData: Response) {
    this.authService.isUserLogged = true;
    this.router.navigate(['home']);
  }

  private adminValidation(userData: Response) {
    this.authService.isAdminLogged = true;
    this.router.navigate(['admin']);
  }
  validateTheUser(userData: any) {
    this.authService.authenticateUser(userData).subscribe(
      (response: Response) => {
        if(response.role == 'user') {
          this.userValidation(response);
        }
        else if(response.role == 'admin') {
          this.adminValidation(response);
        }
        
        const dataString = JSON.stringify(response);

        localStorage.setItem('token', response.token);
        localStorage.setItem('userinfo', dataString);

        this.authService.validationHappened(response);
      },
      (error) => {
        console.log(error);
      }
    )
  }
  authenticate() {
    console.log('Log In Form -----> ', this.logInForm);
    this.validateTheUser(this.logInForm.value);
  }
}
