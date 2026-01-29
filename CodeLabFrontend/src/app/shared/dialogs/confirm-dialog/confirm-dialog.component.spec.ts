import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './confirm-dialog.component';
import { IConfirmDialogData } from '../../interfaces/confirm-dialog-data.interface';
import { By } from '@angular/platform-browser';

describe('ConfirmDialogComponent', () => {
  let component: ConfirmDialogComponent;
  let fixture: ComponentFixture<ConfirmDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatDialogModule, ConfirmDialogComponent],
      declarations: [],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            titleText: 'Custom Title',
            contentText: 'Custom Content',
            confirmText: 'Yes',
            cancelText: 'No',
          } as IConfirmDialogData,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display custom title text', () => {
    const titleElement = fixture.debugElement.query(By.css('h2'));
    expect(titleElement.nativeElement.textContent).toContain('Custom Title');
  });

  it('should display custom content text', () => {
    const contentElement = fixture.debugElement.query(By.css('.confirm-dialog-text'));
    expect(contentElement.nativeElement.textContent).toContain('Custom Content');
  });
});
