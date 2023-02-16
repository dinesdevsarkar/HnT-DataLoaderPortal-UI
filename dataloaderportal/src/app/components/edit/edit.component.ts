import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  patient:any;
  isSuccessful = false;
  isUpdateFailed = false;
  errorMessage='';
  constructor(private router: Router, private route: ActivatedRoute,private patientService:PatientService) {
    let id = this.route.snapshot.paramMap.get('id');
    this.loadPatient(id);
   }

  ngOnInit(): void {
  }

  loadPatient(id:any){
    this.patientService.loadPatient(id).subscribe(
      data => {
        this.patient=data;
        this.isSuccessful = false;
        this.isUpdateFailed = true;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isUpdateFailed = true;
      })
    this.errorMessage = '';
  }

  
  onSubmit(): void {
    const {name,address, dob, email,number,status} = this.patient;
    this.patientService.updatePatient(this.patient).subscribe(
      data => {
        this.patient=data;
        this.isSuccessful = true;
        this.isUpdateFailed = false;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isUpdateFailed = true;
      })
  }

}
