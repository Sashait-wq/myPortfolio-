import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-preferences',
  imports: [ReactiveFormsModule, MatSlideToggle, MatButton],
  templateUrl: './preferences.component.html',
  styleUrl: './preferences.component.scss'
})
export class PreferencesComponent {
  form = new FormGroup({
    currency: new FormControl<string | null>(null, Validators.required),
    timeZone: new FormControl<string | null>(null, Validators.required),
    notifyCurrency: new FormControl<boolean>(false),
    notifyOrder: new FormControl<boolean>(false),
    notifyRecommendation: new FormControl<boolean>(false)
  });

  public submit(): void {
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }
}
