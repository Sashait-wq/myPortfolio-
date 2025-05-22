import { Component, inject, OnInit } from '@angular/core';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { HeaderComponent } from './components/header/header.component';
import { RouterOutlet } from '@angular/router';
import { LoginService } from './services/login.service';
import { RegistrationComponent } from './components/registration/registration.component';

@Component({
  selector: 'app-root',
  imports: [SideBarComponent, HeaderComponent, RouterOutlet, RegistrationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'bankDash';

  loginService = inject(LoginService);

  ngOnInit(): void {
    this.loginService.qetLogin().subscribe((s) => {
      console.log(s);
    });
  }
}
