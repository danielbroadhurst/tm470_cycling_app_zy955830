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
  @Output() viewEventID = new EventEmitter();

  constructor() { }

  ngOnInit() { }

  userAdmin(event) {
    console.log(event, 'uA'); 
  }

  viewEvent() {
    console.log(this.event, 'vE'); 
    this.viewEventID.emit(this.event)
  }

  editEvent() {
    console.log(this.event, 'eE'); 
    this.editEventID.emit(this.event)
  }

  convertDifficulty(difficulty) {    
    if (difficulty < 30) return "Easy";
    else if (difficulty < 60) return "Medium";
    else return "Hard";
  }
}
