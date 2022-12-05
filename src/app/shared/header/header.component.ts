import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  IsLoged: any;
  @Output() childToParent = new EventEmitter<String>();

  constructor(private authSer: AuthService, private router: Router) { }
  ngOnInit() {
    this.IsLoged = this.authSer.isLoggedIn.value // to check user status
  }
  
  // Logiut user
  logOut() {
    this.authSer.logOut()
    this.router.navigate([''])
  }
  // To send user fillter from here to orders component
  SetfillterProduct(value: any) {
    this.childToParent.emit(value)
  }
}
