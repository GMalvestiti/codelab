import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { FormFieldComponent } from './form-field.component';
import { EFieldType } from '../../enums/field-type.enum';
import { IFormField } from '../../interfaces/form-field.interface';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CommonModule } from '@angular/common';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('FormFieldComponent', () => {
  let component: FormFieldComponent;
  let fixture: ComponentFixture<FormFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatInputModule,
        MatFormFieldModule,
        MatIconModule,
        MatCheckboxModule,
        MatSelectModule,
        MatButtonModule,
        MatSlideToggleModule,
        CommonModule,
        FormFieldComponent,
        NoopAnimationsModule
      ],
      declarations: []
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormFieldComponent);
    component = fixture.componentInstance;
    component.field = {
      label: 'Test Field',
      formControlName: 'testField',
      type: EFieldType.INPUT
    } as IFormField;
    component.form = new FormGroup({
      testField: new FormControl('', Validators.required)
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the label with asterisk if required', () => {
    const label = component.label;
    expect(label).toBe('Test Field *');
  });

  it('should return the correct control', () => {
    const control = component.control;
    expect(control).toBeTruthy();
    expect(control?.validator).toBeTruthy();
  });

  it('should return an error message if control is touched and invalid', () => {
    const control = component.control;
    control?.markAsTouched();
    fixture.detectChanges();
    const error = component.error;
    expect(error).toBeTruthy();
  });

  it('should not return an error message if control is not touched', () => {
    const error = component.error;
    expect(error).toBe('');
  });

  it('should not return an error message if control is valid', () => {
    const control = component.control;
    control?.setValue('Valid Value');
    fixture.detectChanges();
    const error = component.error;
    expect(error).toBe('');
  });
});
