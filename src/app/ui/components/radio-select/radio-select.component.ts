import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';
import { Option } from '../select/select.component';

@Component({
  selector: 'app-radio-select',
  templateUrl: './radio-select.component.html',
  styleUrls: ['./radio-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioSelectComponent),
      multi: true,
    },
  ],
})
export class RadioSelectComponent implements OnInit, ControlValueAccessor {
  @Input() id: string = '';
  @Input() value: string = '';
  @Input() label: string = '';
  @Input() options: Option[] = [];
  @Input() styleVariant: string = '';

  constructor() {}

  ngOnInit(): void {}

  writeValue(value: any) {
    if (value !== undefined) {
      this.value = value;
    }
  }

  onChange(change: MatRadioChange) {
    this.value = change.value;
    this.propagateChange(this.value);
  }

  propagateChange = (_: any) => {};

  registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  registerOnTouched() {}
}
