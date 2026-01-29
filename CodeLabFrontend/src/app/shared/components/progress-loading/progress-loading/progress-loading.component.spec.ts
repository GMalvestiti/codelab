import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProgressLoadingComponent } from './progress-loading.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';

describe('ProgressLoadingComponent', () => {
  let component: ProgressLoadingComponent;
  let fixture: ComponentFixture<ProgressLoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, MatProgressBarModule, ProgressLoadingComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not display progress bar when loading is false', () => {
    component.loading = false;
    fixture.detectChanges();
    const progressBar = fixture.debugElement.query(By.css('mat-progress-bar'));
    expect(progressBar).toBeNull();
  });

  it('should display progress bar when loading is true', () => {
    component.loading = true;
    fixture.detectChanges();
    const progressBar = fixture.debugElement.query(By.css('mat-progress-bar'));
    expect(progressBar).not.toBeNull();
  });
});
