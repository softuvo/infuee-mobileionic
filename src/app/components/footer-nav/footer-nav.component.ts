import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer-nav',
  templateUrl: './footer-nav.component.html',
  styleUrls: ['./footer-nav.component.scss'],
})
export class FooterNavComponent implements OnInit {
  @Output() footerEvent: EventEmitter<string> = new EventEmitter();
  constructor(private router: Router) {}

  ngOnInit() {}

  goPage(p: any) {
    if (this.router.url == '/' + p) {
      //
      this.footerEvent.emit('scrollTop');
    } else {
      this.router.navigate(['/' + p]);
    }
  }
}
