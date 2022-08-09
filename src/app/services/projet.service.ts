import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Projet } from '../models/projet.model';
const baseUrl = 'http://localhost:8082/Advyteam/Projets';  
@Injectable({
  providedIn: 'root'
})
export class ProjetService {

  constructor(private http: HttpClient) { }
  getAll(): Observable<Projet[]> {
    return this.http.get<Projet[]>(`${baseUrl}/AfficheProjets`);
    
  }

  create(data: any): Observable<any> {
    
    
    return this.http.post(baseUrl+'/add-projet', data);
  }
  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/'ModifierProjet'/${id}`, data);
  }
  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/'deleteProjet'/${id}`);
  }
  findByTitle(title: any): Observable<Projet[]> {
    return this.http.get<Projet[]>(`${baseUrl}/FindBytitle/?title=${title}`);
  }

  
}
