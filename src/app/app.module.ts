import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; 
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductViewerComponent } from './components/product-viewer/product-viewer.component';
import { HomeComponent } from './components/home/home.component';
import { ProductService } from './services/product.service';
import { BidViewerComponent } from './components/bid-viewer/bid-viewer.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuardService } from './services/auth-guard.service';
import { TokenStorageService } from './services/token-storage.service';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    ProductViewerComponent,
    HomeComponent,
    BidViewerComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot()
  ],
  providers: [ 
    ProductService,
    AuthGuardService,
    AuthService,
    TokenStorageService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
