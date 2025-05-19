import { FormControl } from '@angular/forms';

export interface ProfileForm {
  yourName: FormControl<string | null>;
  email: FormControl<string | null>;
  dataBirth: FormControl<string | null>;
  address: FormControl<string | null>;
  postalCode: FormControl<string | null>;
  userName: FormControl<string | null>;
  password: FormControl<string | null>;
  presentAddress: FormControl<string | null>;
  city: FormControl<string | null>;
  country: FormControl<string | null>;
}
