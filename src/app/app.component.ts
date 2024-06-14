import { Component, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'traficroutier';
  public shown = true;

  public auth = inject(Auth);
  public user = this.auth.currentUser;

  constructor(private router: Router) { }

  showSidebar(){
    this.shown = !this.shown;
    console.log(this.shown);
  }

  itineraire() {
    this.router.navigate(["duree-trajet"]);
  }

  home() {
    this.router.navigate(['home'])
  }

  map() {
    this.router.navigate(['map'])
  }

  account() {
    if (this.auth.currentUser == null) {
      this.router.navigate(['sign-in'])
    }
    else {
      this.router.navigate(['sign-out'])
    }
  }
}

export class LoginComponent {
  private auth = inject(Auth);
}
