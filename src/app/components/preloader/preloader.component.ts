import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-preloader',
  templateUrl: './preloader.component.html',
  styleUrls: ['./preloader.component.scss'],
})
export class PreloaderComponent implements OnInit {
  public row: any = [1, 2, 3];
  @Input() rowNumber: any;
  constructor() { }

  ngOnInit() {
    
    if(this.rowNumber && this.rowNumber != undefined && this.rowNumber > 0) {
      this.row = [];
      for(let i =1; i<= this.rowNumber;i++) {
        this.row.push(i);
      }
    }
    
  }

}
