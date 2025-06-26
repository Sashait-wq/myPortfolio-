import { Component, inject, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { LangController } from './lang-controller.service';

@Component({
  selector: 'app-switch-language',
  imports: [MatFormFieldModule, MatSelectModule, ReactiveFormsModule],
  templateUrl: './switch-language.component.html',
  styleUrl: './switch-language.component.scss'
})
export class SwitchLanguageComponent implements OnInit {
  private langControllerService = inject(LangController);
  public form = new FormControl<string>('en', { nonNullable: true });

  public list: string[] = this.langControllerService.langList;

  constructor() {
    this.form.setValue(this.langControllerService.defaultLang);
  }

  ngOnInit(): void {
    this.form.valueChanges.subscribe((value) => {
      this.langControllerService.setLang(value);
    });
  }
}
