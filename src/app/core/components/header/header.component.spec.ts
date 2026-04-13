import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';

describe('HeaderComponent', () => {
  let fixture: ComponentFixture<HeaderComponent>;
  let component: HeaderComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HeaderComponent],
    });

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should render title text', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('h2')?.textContent).toContain(
      'Listagem de usuários',
    );
  });

  it('should render header icon', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('mat-icon')?.textContent).toContain(
      'account_box',
    );
  });

  it('should render theme toggle component', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    const themeToggle = compiled.querySelector('app-theme-toggle');

    expect(themeToggle).toBeTruthy();
  });
});