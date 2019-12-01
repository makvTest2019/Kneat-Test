import { async, ComponentFixture, TestBed, fakeAsync, flush } from '@angular/core/testing';

import { StapshipListComponent } from './stapship-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StarShipsService } from '../services/starships.service';
import { HttpClientModule } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { of } from 'rxjs';
import { StarShipVM } from '../viewModels/starship.vm';

describe('StapshipListComponent', () => {
  let component: StapshipListComponent;
  let fixture: ComponentFixture<StapshipListComponent>;
  let starShipsService: StarShipsService;
  let debugElement: DebugElement;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ NgbModule,HttpClientModule ],
      declarations: [ StapshipListComponent ],
      providers:[StarShipsService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StapshipListComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    starShipsService = debugElement.injector.get(StarShipsService);
   
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should be called getStarShips method if pagenumber is numeric`, fakeAsync(() => {

    const results = new Array<any>();
    results.push( {name : 'starship1', model:'starship1', mglt:10,consumables:'1 day' });
    const data = {count:10, results:results};

    let spyobj=spyOn(starShipsService, 'getStarShips').and.callFake(() => {
      return of(data);
  });

    component.onPageChange(2);
    flush();
    expect(spyobj).toHaveBeenCalledTimes(1);
  }));

  it(`should be called getStarShips method if pagenumber is zero`, fakeAsync(() => {

    const results = new Array<any>();
    results.push( {name : 'starship1', model:'starship1', mglt:10,consumables:'1 day' });
    const data = {count:10, results:results};

    let spyobj=spyOn(starShipsService, 'getStarShips').and.callFake(() => {
      return of(data);
  });

    component.onPageChange(0);
    flush();
    expect(spyobj).toHaveBeenCalledTimes(1);
  }));
});
