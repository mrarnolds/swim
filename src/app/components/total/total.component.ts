import { AsyncPipe, DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  BehaviorSubject,
  animationFrameScheduler,
  endWith,
  interval,
  map,
  switchMap,
  takeWhile,
} from 'rxjs';

@Component({
  selector: 'app-total',
  standalone: true,
  imports: [DecimalPipe, AsyncPipe],
  templateUrl: './total.component.html',
  styleUrl: './total.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TotalComponent {
  @Input() set total(value: number) {
    this.previousTotal = this.total$.value;
    this.total$.next(value);
  }
  @Input() currency = 'SEK';

  private previousTotal = 0;
  private total$ = new BehaviorSubject<number>(0);

  counter$ = this.total$.pipe(
    switchMap((newTotal) => {
      /** Target goal to count up or down */
      const goal = newTotal - this.previousTotal;
      /** Animation speed */
      const duration = 400;
      /** Time when animation was triggered */
      const startTime = animationFrameScheduler.now();

      /** Sync rendering with browser's next repaint */
      return interval(0, animationFrameScheduler).pipe(
        // Calculate progress
        map(() => {
          const elapsedTime = animationFrameScheduler.now() - startTime;
          return elapsedTime / duration;
        }),
        // Complete when progress is greater than 1
        takeWhile((progress) => progress <= 1),
        // Calculate new value based on progress and previous value
        map((progress) => this.previousTotal + Math.round(progress * goal)),
        // Make sure it always ends with requested value
        endWith(newTotal)
      );
    })
  );
}
