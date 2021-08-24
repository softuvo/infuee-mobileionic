import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent, MenuController } from '@ionic/angular';
import { UtilityService } from '../services/utility.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  @ViewChild(IonContent) content: IonContent;
  constructor(
    private menu: MenuController,
    public utility: UtilityService,
    public router: Router
  ) {}

  ngOnInit() {
    this.utility.sideMenuHandler.subscribe((res: any) => {
      if (res && res == this.router.url) {
        if (this.content != undefined) {
          this.content.scrollToTop(400);
        }
      }
    });
  }

  openMenu() {
    this.menu.toggle();
  }
}
