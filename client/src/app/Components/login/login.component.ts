import { Component, OnInit } from '@angular/core';
import { faEnvelope} from '@fortawesome/free-regular-svg-icons'
import { Router} from '@angular/router';
import { faUserAlt} from '@fortawesome/free-solid-svg-icons';
import { faGooglePlusG} from '@fortawesome/free-brands-svg-icons';
import { AuthServiceService } from 'src/app/Services/Customer/auth/auth-service.service';
import { AuthService } from 'src/app/Services/Washer/auth/auth.service';
import {AdminAuthServiceService} from 'src/app/Services/Admin/auth/admin-auth-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user = faUserAlt;
  envelope = faEnvelope;
  googleIcon = faGooglePlusG;
  selected="Customer";
  emailError ='';
  passwordError ='';
  constructor(private router : Router, private _auth : AuthServiceService, private _washerAuth: AuthService,private  _adminAuth:AdminAuthServiceService) { }

  ngOnInit(): void {
  }

   /* Show and hide password */
  showpass(x,text){
     if (x.type === "password") {
       x.type = "text";
       text.text = "Hide"
     } else {
       text.text ="Show";
       x.type = "password";
     }
  }

   /* Login the user */
  login(customer){

    this.emailError =''; 
    this.passwordError='';

    if(customer.value.role == 'Customer'){
      let user = { email: customer.value.email, password : customer.value.password};
      this._auth.loginCustomer(user)
      .subscribe(
        res => {
          localStorage.setItem('cjwt',res.token)
          this.router.navigate(['/customerDashboard/customerHome'])
        },
        err => {this.emailError =err.error.email, this.passwordError = err.error.password}
      )
    }

    if(customer.value.role == 'Washer'){
      let user = { email: customer.value.email, password : customer.value.password};
      this._washerAuth.loginWasher(user)
      .subscribe(
        res => {
          localStorage.setItem('wjwt',res.token)
          this.router.navigate(['/washerDashboard/washerHome'])
        },
        err => {this.emailError =err.error.email, this.passwordError = err.error.password}
      )
    }

    if(customer.value.role == 'Admin'){
      let user = { email: customer.value.email, password : customer.value.password};
      this._adminAuth.loginAdmin(user)
      .subscribe(
        res => {
          localStorage.setItem('ajwt',res.token)
          this.router.navigate(['/adminDashboard/adminHome'])
        },
        err => {this.emailError =err.error.email, this.passwordError = err.error.password}
      )
    }

     
  }

  /* Login with Google */
  googleLogin(){
    this._auth.googleLogin()
      .subscribe(
        res=>console.log(res),
        err => console.log(err)
      )
  }
 
}
