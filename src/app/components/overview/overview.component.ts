import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import Account from '../../models/account.interface';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [CommonModule, LoaderComponent],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverviewComponent {
  @Input() isLoading = false;
  @Input() accounts: Array<Account> = [];

  private get total(): number {
    return this.accounts.reduce((sum: number, account: Account) => {
      return sum + account.balance;
    }, 0);
  }

  getPercentage(account: Account) {
    const percent = Math.round((account.balance / this.total) * 100);
    return percent;
  }
}
