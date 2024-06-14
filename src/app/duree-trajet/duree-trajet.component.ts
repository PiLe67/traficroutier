import { Component,OnInit,inject } from '@angular/core';
import { ApiService } from '../api.service';
import { apiKey } from '../apiKey';
import { Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-duree-trajet',
  templateUrl: './duree-trajet.component.html',
  styleUrl: './duree-trajet.component.css'
})
export class DureeTrajetComponent implements OnInit{
  public latDep:number = 48.49242;
  public longDep:number = 7.6665;
  public latArr:number = 0;
  public longArr:number = 0;
  public ville:string = "";
  public duree:string = "";
  public calculated:boolean = false;

  public auth = inject(Auth);
  public user = this.auth.currentUser;

  constructor(
    public apiService:ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
      
  }

  async getDuration() {
    try {
      var [lat, long] = await this.getCoord();
      console.log(lat, long);
      this.apiService.getDuree(this.latDep, this.longDep, lat, long, apiKey).subscribe((response: any) => {
        var travelTime = response.routes[0].summary.travelTimeInSeconds;
        var h = Math.floor(travelTime / 3600);
        var m = Math.floor((travelTime % 3600) / 60);
        var s = travelTime % 60;

        if (s > 30) {
            m += 1;
        }

        if (travelTime / 3600 >= 1) {
            this.duree = `${h}h${m}min`;
        } else if (travelTime / 60 >= 1) {
            this.duree = `${m}min`;
        } else {
            this.duree = `${s}s`;
        }
      });
    } catch (error) {
        console.error('Error getting duration:', error);
    }
  }

  public getCoord(): Promise<[number, number]> {
    return new Promise((resolve, reject) => {
      this.apiService.getCoord(this.ville, apiKey).subscribe(
        (response: any) => {
          var lat = parseFloat(response.results[0].position.lat);
          var long = parseFloat(response.results[0].position.lon);
          this.latArr = lat;
          this.longArr = long;
          resolve([lat, long]);
          this.calculated=true;
        },
        (error: any) => {
          console.error('Error getting coordinates:', error);
          reject(error);
        }
      );
    });
  }

  signin() {
    this.router.navigate(['sign-in'])
  }

  home() {
    this.router.navigate(['home'])
  }
}
