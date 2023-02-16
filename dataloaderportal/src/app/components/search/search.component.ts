import { Component, OnInit } from '@angular/core';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  form: any;
  patients:any[]=[];
  searchElement:any;
  isSuccessful = false;
  isSearchFailed = false;
  errorMessage = '';
  submitted = false;

  constructor(private patientService:PatientService) {
    this.loadSearchElement();
  }

  loadSearchElement() {
    
    this.patientService.list().subscribe(
      data => {
        console.log(data);
        this.searchElement=data;
      },
      err => {
        
      })
  }

  ngOnInit(): void {
    this.searchPage();
  }

  onSubmit(): void {

  //   this.submitted = true;
  //   if (this.submitted) {
  //     this.loadPatient(id);
  //   }
  // }

  const {name} = this.form;
  this.patientService.getPatient(name).subscribe(
    data => {
      this.patients=data;
      this.isSuccessful = true;
      this.isSearchFailed = false;
    },
    err => {
      this.errorMessage = err.error.message;
      this.isSearchFailed = true;
    })
}
  // loadPatient(id: number){
  //   this.patientService.loadPatient(id).subscribe(
  //     data => {
  //       this.patients=data;
  //       this.isSuccessful = true;
  //       this.isSearchFailed = false;
  //     },
  //     err => {
  //       this.errorMessage = err.error.message;
  //       this.isSearchFailed = true;
  //     })
  // }

  searchPage():void{
    this.form = {
      name:null
    };
    this.patients=[];
    this.isSuccessful = false;
    this.isSearchFailed = false;
    this.errorMessage = '';
  }

}
