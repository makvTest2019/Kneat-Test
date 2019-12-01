import { async, ComponentFixture, TestBed, fakeAsync, flush } from '@angular/core/testing';

import { InputDistanceComponent } from './input-distance.component';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('InputDistanceComponent', () => {
  let component: InputDistanceComponent;
  let fixture: ComponentFixture<InputDistanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule,BrowserAnimationsModule , ToastrModule.forRoot()  ],
      declarations: [ InputDistanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputDistanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it(` should be called validate method`, fakeAsync(() => {
    let spyobj= spyOn(component, 'validate').and.callThrough(); 
    component.calculate();
    flush();
    fixture.detectChanges();
    expect(spyobj).toHaveBeenCalledTimes(1);
  }));

  it(` should not be called calculateStops if distance is null/undefined`, fakeAsync(() => {
    let spyobj= spyOn(component.calculateStops, 'emit');
    component.calculate();
    flush();
    fixture.detectChanges();
    expect(spyobj).toHaveBeenCalledTimes(0);
  }));

  it(` should not be called calculateStops if distance is less than 1`, fakeAsync(() => {
    let spyobj= spyOn(component.calculateStops, 'emit');
    component.planetDistance = 0;
    component.calculate();
    flush();
    fixture.detectChanges();
    expect(spyobj).toHaveBeenCalledTimes(0);
  }));

  it(` should be called calculateStops if distance is greater than 0`, fakeAsync(() => {
    let spyobj= spyOn(component.calculateStops, 'emit');
    component.planetDistance = 1;
    component.calculate();
    flush();
    fixture.detectChanges();
    expect(spyobj).toHaveBeenCalledTimes(1);
  }));

});
