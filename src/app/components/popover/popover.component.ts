import { Component, OnInit, Input} from '@angular/core';
import { PopoverController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})

export class PopoverComponent implements OnInit {
  @Input("data") data;
  @Input("popOverType") popOverType;

  constructor(
    private popoverController: PopoverController,
  ) {
  }

  ngOnInit() {
   
  }

  popOver(_d?: any){
    this.popoverController.dismiss();
  }

  
}

