import { Component } from '@angular/core';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  role: string = '';

  constructor(
    private tokenService: TokenStorageService
  ) { }

  ngOnInit(): void {
    if (this.tokenService.getUser().role === undefined || this.tokenService.getUser().role === null) {
      this.role = '';
    } else {
      this.role = this.tokenService.getUser().role;
    }
  }

  signOut() {
    this.tokenService.signOut();
    this.role = '';
    // window.location.reload();
  }

}
