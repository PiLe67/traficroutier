import { Component, inject } from '@angular/core';
import { Auth, signInWithEmailAndPassword,
  sendPasswordResetEmail,verifyPasswordResetCode,
  updatePassword } from "@angular/fire/auth";
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  hide = true;
  email: string = "";
  password: string = "";
  isLoading = false;
  errorMessage: string = "";
  newpassword:string = "";

  public auth = inject(Auth);
  public user: any;

  constructor(private router: Router) { }

  clickEvent(event: MouseEvent) {
    this.hide = !this.hide;
    event.stopPropagation();
  }

  signIn() {
    this.isLoading = true;
    this.errorMessage = "";
    
    signInWithEmailAndPassword(this.auth, this.email, this.password)
      .then((userCredential) => {
        this.user = userCredential.user;
        this.isLoading = false;
        if (this.user.emailVerified !== true) {
          window.alert("Veuillez valider votre adresse mail")
        }
        else {
          this.router.navigate([''])
        }
      })
      .catch((error) => {
        this.isLoading = false;
        this.errorMessage = error.message;
      });
  }
  
  code: string = "";

  sendCode() {
    this.errorMessage = "";

    sendPasswordResetEmail(this.auth, this.email)
  }

  verifyCode() {
    this.errorMessage = "";

    verifyPasswordResetCode(this.auth, this.code)
  }

  newPassword() {
    updatePassword(this.user,this.newpassword)
  }

  newAccount() {
    this.router.navigate(["sign-up"]);
  }
}

