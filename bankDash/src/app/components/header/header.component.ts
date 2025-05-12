import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [MatFormFieldModule, MatIconButton, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  routes = inject(Router);
  route = inject(ActivatedRoute);
  dataTitle: string = '';
  constructor() {
    this.routes.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.route),
        map((route: any) => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),

        mergeMap((route: any) => route.data)
      )
      .subscribe((data: any) => {
        this.dataTitle = data.title;
      });
  }
}
