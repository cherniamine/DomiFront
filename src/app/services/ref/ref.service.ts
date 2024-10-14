import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RefService {

  constructor(private http:HttpClient) { }
  getAllCodePays(){
    return this.http.get<number[]>("http://localhost:8092/api/v1/ref/Pays/allcodepays")
  }
  getAllCodeDevises(){
    return this.http.get<number[]>("http://localhost:8092/api/v1/ref/Devise/allcodedevises")
  }
  getAllNoPieceClient(){
    return this.http.get<number[]>("http://localhost:8092/api/v1/ref/Compte/allNoPiecesClients")
  }
  getAllCodeUnite(){
    return this.http.get<number[]>("http://localhost:8092/api/v1/ref/Unite/allcodeunite")
  }
  getAllCodeNgp(){
    return this.http.get<number[]>("http://localhost:8092/api/v1/ref/DonneeNgp/allcodengp")
  }
  getAllCodeModLiv(){
    return this.http.get<number[]>("http://localhost:8092/api/v1/ref/ModeDeLivraison/allmodliv")
  }
  getAllCodeModReg(){
    return this.http.get<number[]>("http://localhost:8092/api/v1/ref/ModeDeReglement/allCodeModReg")
  }
  getAllCodeDelReg(){
    return this.http.get<number[]>("http://localhost:8092/api/v1/ref/DelaisReglement/allcodedelreg")
  }
  getAllCodeRegimeStat(){
    return this.http.get<number[]>("http://localhost:8092/api/v1/ref/RegimeStat/allcoderegimestat")
  }
  getAllNumAccordBct(){
    return this.http.get<number[]>("http://localhost:8092/api/v1/ref/AccordBct/allnumaccordbct")
  }
  getAllDateAccordBct(){
    return this.http.get<Date[]>("http://localhost:8092/api/v1/ref/AccordBct/alldateaccordbct")
  }
 getNomEtPrenom(noPiecePersonne: string){
    return this.http.get<string>(`http://localhost:8092/api/v1/ref/Personne/nomPrenom/${noPiecePersonne}`);
 }
  getCompteRib(noPiecePersonne: string){
    return this.http.get<string[]>(`http://localhost:8092/api/v1/ref/Compte/getCompteRib/${noPiecePersonne}`);
  }
  uploadFile(file: File): Observable<any> {
    const apiUrl = 'http://localhost:8091/file/upload';

    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post<any>(apiUrl, formData);
  }


}
