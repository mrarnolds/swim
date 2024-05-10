import { DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-total',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './total.component.html',
  styleUrl: './total.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TotalComponent {
  @Input() total = 0;
  @Input() currency = 'SEK';
}
