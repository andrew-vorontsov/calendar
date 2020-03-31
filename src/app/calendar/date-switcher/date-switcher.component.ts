import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-date-switcher',
  templateUrl: './date-switcher.component.html',
  styleUrls: ['./date-switcher.component.scss']
})
export class DateSwitcherComponent implements OnInit {

  @Input() month: string;
  @Input() year: number;
  @Output() public switchDate = new EventEmitter();
  @Output() public switchHome = new EventEmitter();

  switchMonth(num) {
    this.switchDate.emit(num);
  }

  switchCurrentMonth() {
    this.switchHome.emit();
  }

  constructor() { }

  ngOnInit() {
  }

}
