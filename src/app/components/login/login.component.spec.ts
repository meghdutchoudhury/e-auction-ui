import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { HomeComponent } from '../home/home.component';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent, HomeComponent],
      imports: [RouterTestingModule.withRoutes([
        { path: 'home', component: HomeComponent }
      ]), HttpClientTestingModule, FormsModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set isLoggedIn if session token is already present during page load', () => {
    let service = fixture.debugElement.injector.get(TokenStorageService)
    spyOn(service, 'getToken').and.returnValue('123')
    component.ngOnInit()
    expect(component.isLoggedIn).toBeTrue()
  });

  it('should set isLoggedIn if new session token was retrieved successfully', () => {
    let service = fixture.debugElement.injector.get(AuthService)
    spyOn(service, 'login').and.returnValue(of({ 'token': '123' }))
    //spyOn(window.location, 'reload')
    component.onSubmit()
    expect(component.isLoggedIn).toBeTrue()
    expect(component.isLoginFailed).toBeFalse()
  });

  it('should set isLoginFailed if new session token was not retrieved', () => {
    let service = fixture.debugElement.injector.get(AuthService)
    component.isLoginFailed = component.isLoggedIn = false
    spyOn(service, 'login').and.returnValue(throwError('service failure'))
    component.onSubmit()
    expect(component.isLoggedIn).toBeFalse()
    expect(component.isLoginFailed).toBeTrue()
  });

});
