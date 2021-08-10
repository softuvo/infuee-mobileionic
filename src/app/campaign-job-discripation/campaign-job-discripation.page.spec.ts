import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CampaignJobDiscripationPage } from './campaign-job-discripation.page';

describe('CampaignJobDiscripationPage', () => {
  let component: CampaignJobDiscripationPage;
  let fixture: ComponentFixture<CampaignJobDiscripationPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignJobDiscripationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CampaignJobDiscripationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
