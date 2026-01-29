import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { FormFieldsListComponent } from './form-fields-list.component';
import { FormFieldComponent } from '../form-field/form-field.component';
import { IFormField } from '../../interfaces/form-field.interface';

describe('FormFieldsListComponent', () => {
  let component: FormFieldsListComponent;
  let fixture: ComponentFixture<FormFieldsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormFieldsListComponent, FormFieldComponent],
      declarations: [],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormFieldsListComponent);
    component = fixture.componentInstance;
    component.form = new FormGroup({
      testField: new FormControl(''),
    });
    component.fields = [
      { name: 'testField', type: 'text', label: 'Test Field' } as unknown as IFormField,
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit change event on form value change', (done) => {
    jest.useFakeTimers();
    const changeEmitterSpy = jest.spyOn(component.changeEmitter, 'emit');

    component.form.controls['testField'].setValue('new value');
    jest.advanceTimersByTime(1000);

    fixture.whenStable().then(() => {
      expect(changeEmitterSpy).toHaveBeenCalled();
      done();
    });
  });

  it('should unsubscribe from valueChanges on destroy', () => {
    const unsubscribeSpy = jest.spyOn(component['unsubscribe$'], 'next');
    component.ngOnDestroy();
    expect(unsubscribeSpy).toHaveBeenCalled();
  });
});
