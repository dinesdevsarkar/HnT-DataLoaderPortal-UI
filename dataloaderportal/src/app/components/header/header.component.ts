import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

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
