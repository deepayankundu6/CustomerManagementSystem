import { Component, OnChanges } from '@angular/core';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-pagetitle',
  templateUrl: './pagetitle.component.html',
  styleUrls: ['./pagetitle.component.css']
})
export class PagetitleComponent implements OnChanges {
  time;
  date;
  constructor() {
    setInterval(() => {
      this.date = formatDate(Date(), 'dd-MMMM-yyyy', 'en-US', '+0530');
      this.time = formatDate(Date(), ' hh:mm a', 'en-US', '+0530');
    }, 1);

  }
  ngOnChanges(): void {

  }
}
