import { Component,inject } from '@angular/core';
import { Auth,signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-out',
  templateUrl: './sign-out.component.html',
  styleUrl: './sign-out.component.css'
})
export class SignOutComponent {
  public auth = inject(Auth);
  public user = this.auth.currentUser;

  constructor(private router: Router) { }
  
  signout() {
    signOut(this.auth)
    this.router.navigate(['sign-in'])
  }
}
