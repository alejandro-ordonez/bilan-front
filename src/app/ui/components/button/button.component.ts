import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Input() text: string = '';
  @Input() className: string = '';
  @Input() variant: string = '';
  @Input() isDisabled: boolean = false;

  @Output() handleOnClick = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}

  onClick() {
    this.handleOnClick.emit();
  }
}
