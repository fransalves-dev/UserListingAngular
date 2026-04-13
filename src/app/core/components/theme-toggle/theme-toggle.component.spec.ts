import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ThemeToggleComponent } from './theme-toggle.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { selectTheme } from '../../store/ui-control.selectors';
import { UIControlActions } from '../../store/ui-control.actions';
import { initialUIControlState } from '../../store/ui-control.state';

describe('ThemeToggleComponent', () => {
  let fixture: ComponentFixture<ThemeToggleComponent>;
  let component: ThemeToggleComponent;
  let store: MockStore;

  const createComponent = (theme: 'light' | 'dark') => {
    TestBed.configureTestingModule({
      imports: [ThemeToggleComponent],
      providers: [
        provideMockStore({
          selectors: [
            {
              selector: selectTheme,
              value: theme,
            },
          ],
        }),
      ],
    });

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(ThemeToggleComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  };

  it('should create component', () => {
    createComponent('light');
    expect(component).toBeTruthy();
  });

  it('should initialize theme signal with store value', () => {
    createComponent('dark');

    expect(component.theme()).toBe('dark');
  });

  it('should dispatch setTheme with dark when current is light', () => {
    createComponent('light');

    const dispatchSpy = jest.spyOn(store, 'dispatch');

    component.toggleTheme();

    expect(dispatchSpy).toHaveBeenCalledWith(
      UIControlActions.setTheme({ theme: 'dark' }),
    );
  });

  it('should dispatch setTheme with light when current is dark', () => {
    createComponent('dark');

    const dispatchSpy = jest.spyOn(store, 'dispatch');

    component.toggleTheme();

    expect(dispatchSpy).toHaveBeenCalledWith(
      UIControlActions.setTheme({ theme: 'light' }),
    );
  });

  it('should render correct icon based on theme', () => {
    createComponent('light');

    const compiled = fixture.nativeElement as HTMLElement;
    const icon = compiled.querySelector('mat-icon')?.textContent?.trim();

    expect(icon).toBe('dark_mode');
  });
});