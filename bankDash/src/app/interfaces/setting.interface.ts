import { FormControl } from '@angular/forms';

export interface ProfileForm {
  fullName: FormControl<string | null>;
  email: FormControl<string | null>;
  dateOfBirth: FormControl<string | null>;
  permanentAddress: FormControl<string | null>;
  postalCode: FormControl<string | null>;
  username: FormControl<string | null>;
  password: FormControl<string | null>;
  presentAddress: FormControl<string | null>;
  city: FormControl<string | null>;
  country: FormControl<string | null>;
}
