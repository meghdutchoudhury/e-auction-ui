import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BidViewerComponent } from '../bid-viewer/bid-viewer.component';
import { LoginComponent } from '../login/login.component';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent, LoginComponent ],
      imports: [RouterTestingModule.withRoutes([
        { path: 'home', component: HomeComponent },
        { path: 'login', component: LoginComponent }
      ]), HttpClientTestingModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call get bids on product for child component', () => {
    const bidViewerComponent = jasmine.createSpyObj('BidViewerComponent', ['getBidsOnProduct'])
    component.bidViewerComponent = bidViewerComponent
    component.selectedProductEvent('1')
    expect(component.bidViewerComponent?.getBidsOnProduct).toHaveBeenCalled();
  });

  it('should clear session storage if logging out', () => {
    spyOn(window.sessionStorage, 'clear').and.stub()
    component.logout()
    expect(window.sessionStorage.clear).toHaveBeenCalled()
  });

});
