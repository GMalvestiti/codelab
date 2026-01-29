import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBarModule, MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { SnackbarComponent } from './snackbar.component';
import { ISnackBarData } from '../../interfaces/snackbar-data.interface';
import { By } from '@angular/platform-browser';
import { ESnackbarType } from '../../enums/snackbar-type.enum';

describe('SnackbarComponent', () => {
  let component: SnackbarComponent;
  let fixture: ComponentFixture<SnackbarComponent>;
  let snackBarRefMock: Partial<MatSnackBarRef<SnackbarComponent>>;
  const data: ISnackBarData = { message: 'Test message', buttonText: 'Close', type: ESnackbarType.success };

  beforeEach(async () => {
    snackBarRefMock = {
      dismissWithAction: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [MatSnackBarModule, SnackbarComponent],
      providers: [
        { provide: MatSnackBarRef, useValue: snackBarRefMock },
        { provide: MAT_SNACK_BAR_DATA, useValue: data },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the message', () => {
    const messageElement = fixture.debugElement.query(By.css('.snackbar-message')).nativeElement;
    expect(messageElement.textContent).toContain(data.message);
  });

  it('should display the button text', () => {
    const buttonElement = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(buttonElement.textContent).toContain(data.buttonText);
  });

  it('should call dismissWithAction when close is called', () => {
    component.close();
    expect(snackBarRefMock.dismissWithAction).toHaveBeenCalled();
  });

  it('should call close method when button is clicked', () => {
    jest.spyOn(component, 'close');
    const buttonElement = fixture.debugElement.query(By.css('button')).nativeElement;
    buttonElement.click();
    expect(component.close).toHaveBeenCalled();
  });
});
