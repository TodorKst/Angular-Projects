import {Component, DestroyRef, effect, inject, OnInit, signal} from '@angular/core';
import {toObservable, toSignal} from "@angular/core/rxjs-interop";
import {interval, Observable} from "rxjs";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  clickCount = signal(0);
  clickCount$ = toObservable(this.clickCount);
  interval$ = interval(1000);
  intervalSignal = toSignal(this.interval$);
  customInterval$ = new Observable((subscriber) => {
    let timesExecuted = 0;
    const interval = setInterval(() => {
      timesExecuted++;
      if (timesExecuted > 4) {
        clearInterval(interval);
        subscriber.complete();
        return;
      }
      console.log('Emitting new value');
      subscriber.next({message: 'New value'})
    }, 1000);
  });

  private destroyRef = inject(DestroyRef);

  constructor() {
    effect(() => {
      console.log(`Click count: ${this.clickCount()}`);
    });
  }

  ngOnInit() {
    // const subscription = interval(1000).pipe(map(val => val * 2)).subscribe({
    //   next: (value) => {
    //     console.log(value);
    //   }
    // });
    //
    // this.destroyRef.onDestroy(() => {
    //   subscription.unsubscribe();
    // });
    this.customInterval$.subscribe({
      next: (value) => {
        console.log(value);
      },
      complete: () => {
        console.log('Completed');
      }
    })

    const subscription = this.clickCount$.subscribe({
      next: (value) => {
        console.log(value);
      }
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  onClick() {
    this.clickCount.update(prevCount => prevCount + 1);
  }

  protected readonly interval = interval;
}
