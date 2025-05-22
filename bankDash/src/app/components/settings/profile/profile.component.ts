import { Component, inject, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AbstractControl, FormGroup, isFormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormService } from '../../../services/form.service';
import { RegistrationForm } from '../../../interfaces/registration.interface';
import { Store } from '@ngrx/store';
import { registerSelector } from '../../../store/registration/registration.selectors';
import { RegistrationService } from '../../../services/registration.service';

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

    this.store
      .select(registerSelector)
      .pipe()
      .subscribe((value) => {
        this.form.patchValue(value);
      });

    this.profileService.getProfile().subscribe((profile) => {
      this.form.patchValue(profile);
    });
  }

  public save(): void {
    console.log(this.form.value);
    this.form.reset();
  }

  public isInvalid(controlName: string): boolean {
    const control: AbstractControl | null = this.form.get(controlName);
    return !!control && control.invalid && control.touched;
  }

  public getError(controlName: string, errorCode: string): boolean {
    const control: AbstractControl | null = this.form.get(controlName);
    return !!control && control.hasError(errorCode);
  }

  protected readonly isFormControl = isFormControl;
}
