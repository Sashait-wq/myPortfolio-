import { Component, inject, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormService } from '../../../services/form.service';
import { RegistrationForm } from '../../../interfaces/registration.interface';
import { Store } from '@ngrx/store';
import { RegistrationService } from '../../../request-service/registration.service';
import { registerSelector } from '../../../store/registration/registration.selectors';

@Component({
  selector: 'app-profile',
  imports: [MatFormFieldModule, ReactiveFormsModule, MatButton, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  form!: FormGroup<RegistrationForm>;
  formsService = inject(FormService);

  store = inject(Store);
  profileService = inject(RegistrationService);

  ngOnInit(): void {
    this.form = this.formsService.createForm();

    this.store.select(registerSelector).subscribe((value) => {
      this.form.patchValue(value);
    });

    this.profileService.getProfile().subscribe((profile) => {
      this.form.patchValue(profile);
    });

    (this.form.get('password') as FormControl).disable();
  }

  public save(): void {
    console.log(this.form.value);
    this.form.reset();
  }
}
