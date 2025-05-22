import { FormControl } from '@angular/forms';

export interface RegistrationForm {
  username: FormControl<string | null>;
  password: FormControl<string | null>;
  email: FormControl<string | null>;
  fullName: FormControl<string | null>;
  dateOfBirth: FormControl<string | null>;
  presentAddress: FormControl<string | null>;
  address: FormControl<string | null>;
  city: FormControl<string | null>;
  postalCode: FormControl<string | null>;
  country: FormControl<string | null>;
}
