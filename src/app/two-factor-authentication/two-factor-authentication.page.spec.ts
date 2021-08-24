import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TwoFactorAuthenticationPage } from './two-factor-authentication.page';

describe('TwoFactorAuthenticationPage', () => {
  let component: TwoFactorAuthenticationPage;
  let fixture: ComponentFixture<TwoFactorAuthenticationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwoFactorAuthenticationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TwoFactorAuthenticationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
