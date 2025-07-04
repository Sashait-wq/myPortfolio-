import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { RouterOutlet } from '@angular/router';
import { SideBarComponent } from '../../components/side-bar/side-bar.component';
import { ToastMessageComponent } from '../../components/toast-message/toast-message.component';

@Component({
  selector: 'app-app-wrapper',
  imports: [HeaderComponent, RouterOutlet, SideBarComponent, ToastMessageComponent],
  templateUrl: './app-wrapper.component.html',
  styleUrl: './app-wrapper.component.scss'
})
export class AppWrapperComponent {}
