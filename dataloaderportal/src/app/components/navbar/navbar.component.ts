import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  role: string = '';

  constructor(
    private tokenService: TokenStorageService
  ) { }

  ngOnInit(): void {
    if (this.tokenService.getUser().roles === undefined || this.tokenService.getUser().roles === null) {
      this.role = '';
    } else {
      this.role = this.tokenService.getUser().roles;
    }
  }

  signOut() {
    this.tokenService.signOut();
    this.role = '';
    // window.location.reload();
  }

}
