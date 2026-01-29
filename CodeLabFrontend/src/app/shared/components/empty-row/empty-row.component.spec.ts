import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmptyRowComponent } from './empty-row.component';
import { MatTableModule } from '@angular/material/table';

describe('EmptyRowComponent', () => {
  let component: EmptyRowComponent;
  let fixture: ComponentFixture<EmptyRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatTableModule, EmptyRowComponent],
      declarations: []
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptyRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
