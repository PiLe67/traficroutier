import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { apiKey } from '../apiKey';
import tt from '@tomtom-international/web-sdk-maps'

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent  implements OnInit{
  public x:string = "66";
  public y:string = "44";
  
  public latDep:number = 48.49242;
  public longDep:number = 7.6665;
  public latArr:number = 0;
  public longArr:number = 0;
  public ville:string = "";
  public duree:string = "";

  public selestat:any;
  public strasbourg:string = "";
  public colmar:string = "0";
  public haguenau:string = "0";
  public mulhouse:string = "0";

  constructor(
    public apiService:ApiService,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    const map = tt.map({
      key: apiKey,
      container: "map",
      center: [7.5870375, 48.3],
      zoom: 8,
      bearing: 90
    });

    map.on('load', function() {

      map.showTrafficFlow();
      map.showTrafficIncidents();
 
    });
    
    this.getDuration(48.817222,7.788611,"haguenau");
    this.getDuration(47.749444,7.340000,"mulhouse");
    this.getDuration(48.081667,7.355556,"colmar");
    this.getDuration(48.259590,7.446544, "selestat");
    this.getDuration(48.58295,7.74375, "strasbourg");
  }

  async getDuration(lat:number,long:number, ville:string) {
    try {
      this.apiService.getDuree(this.latDep, this.longDep, lat, long, apiKey).subscribe((response: any) => {
        var travelTime = response.routes[0].summary.travelTimeInSeconds;
        var h = (travelTime-(travelTime%3600))/3600;
        var m = (travelTime-(travelTime%60))/60-h*60;
        var s = travelTime-h*3600-m*60;

        if (s > 30) {
            m += 1;
        }

        if (travelTime/3600 >= 1) {
          switch(ville){
            case 'selestat':
              this.selestat = h.toString()+"h"+m.toString()+"min";
              break;
            case 'haguenau':
              this.haguenau = h.toString()+"h"+m.toString()+"min";
              break;
            case 'strasbourg':
              this.strasbourg = h.toString()+"h"+m.toString()+"min";
              break;
            case 'colmar':
              this.colmar = h.toString()+"h"+m.toString()+"min";
              break;
            case 'mulhouse':
              this.mulhouse = h.toString()+"h"+m.toString()+"min";
              break;
          }
          
        }
        else if(travelTime/3600 < 1 && travelTime/60 >= 1) {
          switch(ville){
            case 'selestat':
              this.selestat =  m.toString()+"min";
              break;
            case 'haguenau':
              this.haguenau =  m.toString()+"min";
              break;
            case 'strasbourg':
              this.strasbourg =  m.toString()+"min";
              break;
            case 'colmar':
              this.colmar =  m.toString()+"min";
              break;
            case 'mulhouse':
              this.mulhouse =  m.toString()+"min";
              break;
          }
        }
        else {
          switch(ville){
            case 'selestat':
              this.selestat = s.toString()+"s";
              break;
            case 'haguenau':
              this.haguenau = s.toString()+"s";
              break;
            case 'strasbourg':
              this.strasbourg = s.toString()+"s";
              break;
            case 'colmar':
              this.colmar = s.toString()+"s";
              break;
            case 'mulhouse':
              this.mulhouse = s.toString()+"s";
              break;
          }
        }
      });
    } catch (error) {
        console.error('Error getting duration:', error);
    }
  }

  home() {
    this.router.navigate(['home'])
  }

  
}