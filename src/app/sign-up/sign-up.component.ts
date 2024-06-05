import { Component, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from "@angular/fire/auth";

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

  constructor() { }

  clickEvent(event: MouseEvent) {
    this.hide = !this.hide;
    event.stopPropagation();
  }

  signUp() {
    if (this.password !== this.verifPassword) {
      this.errorMessage = "Les mots de passe ne correspondent pas.";
      return;
    }
    this.isLoading = true;
    this.errorMessage = "";
    console.log(this.auth);
    console.log(this.email);
    console.log(this.password);
    console.log(this.verifPassword);
    
    createUserWithEmailAndPassword(this.auth, this.email, this.password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        this.isLoading = false;
      })
      .catch((error) => {
        this.isLoading = false;
        this.errorMessage = error.message;
      });
  }
}
