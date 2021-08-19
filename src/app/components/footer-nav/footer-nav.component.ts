import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer-nav',
  templateUrl: './footer-nav.component.html',
  styleUrls: ['./footer-nav.component.scss'],
})
export class FooterNavComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  goHome() {
    this.router.navigate(['/browse-influencers']);
  }

  goChat() {
    this.router.navigate(['/chat']);
  }

  goNotification() {
    this.router.navigate(['/notification']);
  }

  goProfile() {
    this.router.navigate(['/profile']);
  }
}
