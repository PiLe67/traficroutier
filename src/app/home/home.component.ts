import { Component,inject } from '@angular/core';
import { Auth,signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  public auth = inject(Auth);
  public user = this.auth.currentUser;

  constructor(private router: Router) { }
  
  signout() {
    signOut(this.auth)
    this.router.navigate(['sign-in'])
  }

  signin() {
    signOut(this.auth)
    this.router.navigate(['sign-in'])
  }

  itinerary() {
    this.router.navigate(['duree-trajet'])
  }

  traffic() {
    this.router.navigate(['map'])
  }
}
