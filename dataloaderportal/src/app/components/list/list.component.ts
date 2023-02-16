import { Component, OnInit } from '@angular/core';
import { PatientService } from 'src/app/services/patient.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  patients: any;
  isSuccessful = false;
  isSearchFailed = false;
  errorMessage = '';
  user:any;
  isAdmin=false ;

  constructor(private patientService: PatientService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    this.list();
  }

  list() {
    this.patientService.list()?.subscribe(
      data => {
        this.patients = data;
        this.isSuccessful = true;
        this.isSearchFailed = false;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSearchFailed = true;
      })
  }


}
