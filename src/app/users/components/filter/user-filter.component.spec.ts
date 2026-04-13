import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersFilterComponent } from './user-filter.component';

describe('UsersFilterComponent', () => {
  let fixture: ComponentFixture<UsersFilterComponent>;
  let component: UsersFilterComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UsersFilterComponent],
    });

    fixture = TestBed.createComponent(UsersFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit searchChange when input is valid', (done) => {
    jest.useFakeTimers();

    component.searchChange.subscribe((value) => {
      expect(value).toBe('john');
      done();
    });

    component.search.setValue('john');

    jest.advanceTimersByTime(300);
  });

  it('should NOT emit when input is invalid', (done) => {
    jest.useFakeTimers();

    const emitSpy = jest.fn();
    component.searchChange.subscribe(emitSpy);

    component.search.setValue('john123'); // inválido (regex só letras)

    jest.advanceTimersByTime(300);

    expect(emitSpy).not.toHaveBeenCalled();
    done();
  });


  it('should set isTyping to true while typing', () => {
    component.search.setValue('a');

    expect(component.isTyping()).toBe(true);
  });


  it('should reset typing state after debounce', () => {
    jest.useFakeTimers();

    component.search.setValue('john');

    expect(component.isTyping()).toBe(true);

    jest.advanceTimersByTime(300);

    expect(component.isTyping()).toBe(false);
  });

  it('should mark control invalid for numbers', () => {
    component.search.setValue('123');

    expect(component.search.invalid).toBe(true);
  });
});