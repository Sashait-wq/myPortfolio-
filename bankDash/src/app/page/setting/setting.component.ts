import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { PreferencesComponent } from '../../components/settings/preferences/preferences.component';
import { ProfileComponent } from '../../components/settings/profile/profile.component';
import { SecurityComponent } from '../../components/settings/security/security.component';

@Component({
  selector: 'app-setting',
  imports: [MatTabsModule, PreferencesComponent, ProfileComponent, SecurityComponent],
  templateUrl: './setting.component.html',
  styleUrl: './setting.component.scss'
})
export class SettingComponent {}
