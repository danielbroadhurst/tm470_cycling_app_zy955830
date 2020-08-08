import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EventMapComponent } from './event-map.component';

describe('EventMapComponent', () => {
  let component: EventMapComponent;
  let fixture: ComponentFixture<EventMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventMapComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EventMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
