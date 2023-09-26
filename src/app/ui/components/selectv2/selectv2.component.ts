import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Option } from '../select/select.component';

@Component({
  selector: 'app-selectv2',
  templateUrl: './selectv2.component.html',
  styleUrls: ['./selectv2.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Selectv2Component),
      multi: true,
    },
  ],
})
export class Selectv2Component implements OnInit, ControlValueAccessor {

  @Input()
  options: Option[];

  @Input()
  label: string;

  default: Option = { key: '0', value: 'Selección'};
  selectedOption: Option = this.default;
  
  onChange: (option: Option) => {};
  onTouched = () => {};

  constructor() {} 

  selectChanged(value: Option) {
    this.selectedOption = value;
    this.onChange(this.selectedOption);
  }

  writeValue(obj: Option): void {
    this.selectedOption = obj;
    this.onTouched();
  }

  registerOnChange(fn: (option: Option)=>{}): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
  }

}
