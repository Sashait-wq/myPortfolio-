import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { RegistrationForm } from '../../interfaces/registration.interface';
import { Store } from '@ngrx/store';
import { IRegistrationData } from '../../store/registration/registration-data.interface';
import { FormService } from '../../services/form.service';
import { register } from '../../store/registration/registration.action';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-registration',
  imports: [FormsModule, MatButton, ReactiveFormsModule, RouterLink],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent implements OnInit {
  store = inject(Store);

  form!: FormGroup<RegistrationForm>;
  formsService = inject(FormService);

  ngOnInit(): void {
    this.form = this.formsService.createForm();
  }

  public save(): void {
    const user: IRegistrationData = this.form.value as IRegistrationData;
    this.store.dispatch(register({ user }));
  }

  public isInvalid(controlName: string): boolean {
    const control: AbstractControl | null = this.form.get(controlName);
    return !!control && control.invalid && control.touched;
  }

  public getError(controlName: string, errorCode: string): boolean {
    const control: AbstractControl | null = this.form.get(controlName);
    return !!control && control.hasError(errorCode);
  }
}
