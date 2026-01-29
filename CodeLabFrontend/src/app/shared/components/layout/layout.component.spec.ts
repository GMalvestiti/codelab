import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { LayoutComponent } from './layout.component';
import { HeaderComponent } from '../header/header.component';
import { MenuComponent } from '../menu/menu.component';
import { FooterComponent } from '../footer/footer.component';
import { By } from '@angular/platform-browser';

describe('LayoutComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HeaderComponent,
        MenuComponent,
        FooterComponent,
        LayoutComponent
      ],
    }).compileComponents();
  });

  it('should create the layout component', () => {
    const fixture = TestBed.createComponent(LayoutComponent);
    const layout = fixture.componentInstance;
    expect(layout).toBeTruthy();
  });

  it('should render the header component', () => {
    const fixture = TestBed.createComponent(LayoutComponent);
    fixture.detectChanges();
    const headerElement = fixture.debugElement.query(By.directive(HeaderComponent));
    expect(headerElement).toBeTruthy();
  });

  it('should render the menu component', () => {
    const fixture = TestBed.createComponent(LayoutComponent);
    fixture.detectChanges();
    const menuElement = fixture.debugElement.query(By.directive(MenuComponent));
    expect(menuElement).toBeTruthy();
  });

  it('should render the footer component', () => {
    const fixture = TestBed.createComponent(LayoutComponent);
    fixture.detectChanges();
    const footerElement = fixture.debugElement.query(By.directive(FooterComponent));
    expect(footerElement).toBeTruthy();
  });
});
