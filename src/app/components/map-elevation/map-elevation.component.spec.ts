import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MapElevationComponent } from './map-elevation.component';

describe('MapElevationComponent', () => {
  let component: MapElevationComponent;
  let fixture: ComponentFixture<MapElevationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapElevationComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MapElevationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
