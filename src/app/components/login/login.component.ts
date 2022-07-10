import { Component, OnInit } from '@angular/core'
import { AuthService } from 'src/app/services/auth.service'
import { TokenStorageService } from 'src/app/services/token-storage.service'
import {Router} from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  }
  isLoggedIn = false
  isLoginFailed = false
  isLoginInProgress = false
  constructor(private router: Router, private authService: AuthService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true
      this.router.navigate(['/home'])
    }
  }

  onSubmit(): void {
    this.isLoginInProgress = true
    const { username, password } = this.form
    this.authService.login(username, password).subscribe({
      next: data => {
        this.tokenStorage.saveToken(data.access_token)
        this.isLoginFailed = false
        this.isLoggedIn = true
        this.isLoginInProgress = false
        this.router.navigate(['/home'])
      },
      error: err => {
        this.isLoginFailed = true
        this.isLoginInProgress = false
        console.log(err)
      }
    })
  }
}