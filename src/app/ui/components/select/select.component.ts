import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export type Option = {
  value: string;
  key: string | number;
};

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
})
export class SelectComponent implements OnInit, ControlValueAccessor {
  @Input() value: any = '';
  @Input() label: string = '';
  @Input() id: string = '';
  @Input() options: Option[] = [];

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
