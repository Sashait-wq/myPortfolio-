import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { AuthService } from '../../guards/auth.service';

@Component({
  selector: 'app-side-bar',
  imports: [RouterLink, RouterLinkActive, CommonModule, MatButton],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent {
  authService = inject(AuthService);

  exit(): void {
    this.authService.logout();
  }
}
