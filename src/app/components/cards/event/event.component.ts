import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ClubEvent } from 'src/app/classes/club-event';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
})
export class EventComponent implements OnInit {

  @Input() event: ClubEvent;
  @Input() userGroup: string;
  @Output() editEventID = new EventEmitter();

  constructor() { }

  ngOnInit() {
    console.log(this.event, this.userGroup);
  }

  userAdmin(event) {
    console.log(event, 'uA'); 
  }

  viewEvent(event) {
    console.log(event, 'vE'); 
  }

  editEvent() {
    console.log(this.event, 'eE'); 
    this.editEventID.emit(this.event)
  }
}
