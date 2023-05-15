import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-textfield',
  templateUrl: './textfield.component.html',
  styleUrls: ['./textfield.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextfieldComponent),
      multi: true,
    },
  ],
})
export class TextfieldComponent implements ControlValueAccessor, OnInit {
  @Input() placeholder = '';
  @Input() type: string = 'text';
  @Input() value: string = '';
  @Input() label: string = '';
  @Input() id: string = '';
  @Input() pattern: string = '';

  constructor() {}

  ngOnInit(): void {}

  writeValue(value: any) {
    if (!!value) {
      this.value = value;
    }
  }

  onChange(value: string) {
    this.value = value;
    this.propagateChange(this.value);
  }

  propagateChange = (_: any) => {};

  registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  registerOnTouched() {}
}
