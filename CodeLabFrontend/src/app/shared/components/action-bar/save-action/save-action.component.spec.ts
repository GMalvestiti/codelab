import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SaveActionComponent } from './save-action.component';
import { By } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';

describe('SaveActionComponent', () => {
  let component: SaveActionComponent;
  let fixture: ComponentFixture<SaveActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [MatButtonModule, SaveActionComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit save event when save method is called', () => {
    jest.spyOn(component.saveEmitter, 'emit');

    component.save();

    expect(component.saveEmitter.emit).toHaveBeenCalled();
  });

  it('should call save method when button is clicked', () => {
    jest.spyOn(component, 'save');

    const button = fixture.debugElement.query(By.css('button'));
    button.triggerEventHandler('click', null);

    expect(component.save).toHaveBeenCalled();
  });

  it('should not emit save event before save method is called', () => {
    jest.spyOn(component.saveEmitter, 'emit');

    expect(component.saveEmitter.emit).not.toHaveBeenCalled();
  });
});
