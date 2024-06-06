import { Component, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword,sendEmailVerification } from "@angular/fire/auth";
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  hide = true;
  email: string = "";
  password: string = "";
  verifPassword: string = "";
  isLoading = false;
  errorMessage: string = "";

  public auth = inject(Auth);
  public user: any;

  constructor(private router: Router) { }

  clickEvent(event: MouseEvent) {
    this.hide = !this.hide;
    event.stopPropagation();
  }

  SendVerificationMail() {
    return sendEmailVerification(this.user);
  }

  signUp() {
    if (this.password !== this.verifPassword) {
      this.errorMessage = "Les mots de passe ne correspondent pas.";
      return;
    }
    this.isLoading = true;
    this.errorMessage = "";
    
    createUserWithEmailAndPassword(this.auth, this.email, this.password)
      .then((userCredential) => {
        this.user = userCredential.user;
        this.isLoading = false;
        this.SendVerificationMail();
        this.connect()
      })
      .catch((error) => {
        this.isLoading = false;
        this.errorMessage = error.message;
      });
  }

  connect() {
      this.router.navigate(['sign-in'])
  }
}
