import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BidViewerComponent } from '../bid-viewer/bid-viewer.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  @ViewChild(BidViewerComponent) bidViewerComponent : BidViewerComponent | undefined;

  constructor(private router: Router) { }

  logout() {
    window.sessionStorage.clear()
    this.router.navigate(['/login'])
  }

  selectedProductEvent($event : any) {
    this.bidViewerComponent?.getBidsOnProduct($event)
  }

}
