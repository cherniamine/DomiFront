import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {DepotDomiciliationTitre} from "../models/depotDomiciliationTitre";

@Injectable({
  providedIn: 'root'
})
export class DepotDomiciliationTitreService {

  constructor(private http:HttpClient) { }
    createDepotDomiciliationTitre(body:DepotDomiciliationTitre){
    return this.http.post<DepotDomiciliationTitre>("http://localhost:8091/api/v1/domi/DepotDomiciliationTitre/create",body);
    }
  getDepotDomiciliationTitre(){
    return this.http.get<DepotDomiciliationTitre[]>("http://localhost:8091/api/v1/domi/DepotDomiciliationTitre/all");
  }
  getEtatVerif(id: number){
    return this.http.post<void>(`http://localhost:8091/api/v1/domi/DepotDomiciliationTitre/verifEtat/${id}`,null);
  }
  getModifEtat(id: number){
    return this.http.post<void>(`http://localhost:8091/api/v1/domi/DepotDomiciliationTitre/updateEtat/${id}`,null);
  }
  AddObservation(id: number,msg:string){
    return this.http.post<void>(`http://localhost:8091/api/v1/domi/DepotDomiciliationTitre/observation/${id}/${msg}`,null);
  }
    DeleteDomi(id: number){
        return this.http.delete<void>(`http://localhost:8091/api/v1/domi/DepotDomiciliationTitre/delete/${id}`);
    }
}
