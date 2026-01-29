import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';
import { CommonModule } from '@angular/common';
const expectedVersion = require('../../../../../package.json').version;

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, FooterComponent],
      declarations: []
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct version', () => {
    expect(component.version).toBe(expectedVersion);
  });

  it('should have the current year', () => {
    const currentYear = new Date().getFullYear();
    expect(component.year).toBe(currentYear);
  });
});
