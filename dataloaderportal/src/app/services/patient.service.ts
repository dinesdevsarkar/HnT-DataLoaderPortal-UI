import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import patient from '../models/patient';
import { TokenStorageService } from './token-storage.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const BASE_URL = "http://localhost:8081/api";

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  loadSearchValue() {
    throw new Error('Method not implemented.');
  }
  // httpOptions = {
  //   headers: new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': 'Bearer ' + this.tokenService.getToken()
  //   })
  // };

  user:any;
  patient:any;
  constructor(
    private http: HttpClient,
    private tokenService: TokenStorageService,
  ) { }


  upload(file: File): Observable<HttpEvent<any>> {

    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `${BASE_URL}/excel/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    return this.http.get(`${BASE_URL}/files`);
  }

  // getPatient(name: any) {
  //     return this.http.get(BASE_URL + "/patientbyname/" + name, { responseType: 'json' });
  // }

  getPatient(name: string): Observable<any> {
    let urlParam = '';
    if (name != undefined) {
      urlParam += urlParam.length > 0 ? "&name=" + name : "?name=" + name;
    }
    return this.http.get(BASE_URL + '/patientbyname/' +urlParam, { responseType: 'json' });
  }


  loadPatient(id: number){
    return this.http.get(BASE_URL + "/patientbyid/" +id, { responseType: 'json' });
  }

  updatePatient(patient: any) {
    return this.http.patch(BASE_URL + '/patient/update' + patient.id, patient, httpOptions);
  }

  updateStatus(patient: any) {
    return this.http.patch(BASE_URL + '/patient/status/update'+ patient.id, patient, httpOptions);
  }

  list() {
      return this.http.get(BASE_URL + "/allpatients", { responseType: 'json' });
  }

  deletePatient(patient: any) {
    return this.http.delete(BASE_URL + "/remove/" + patient.id);
  }

}
