import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DureeTrajet } from './duree-trajet';
import { Coord } from './coord';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public baseurl = "https://api.tomtom.com";

  constructor(private http:HttpClient) { }

  getCoord(ville:string,apiKey:string): Observable<Coord> {
    return this.http.get<Coord>(this.baseurl+"/maps/orbis/places/geocode/"+ville+".json?key="+apiKey+"&apiVersion=1")
  }

  getDuree(latDep:number,longDep:number,latArr:number,longArr:number,apiKey:string): Observable<DureeTrajet> {
    return this.http.get<DureeTrajet>(this.baseurl+"/routing/1/calculateRoute/"+latDep.toString()+"%2C"+longDep.toString()+"%3A"+latArr.toString()+"%2C"+longArr.toString()+"/json?travelMode=car&key="+apiKey)
  }
}
