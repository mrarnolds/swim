import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Account } from '../../models/account.interface';
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

  get filteredAccounts() {
    return this.accounts.filter(({ hidden }) => !hidden);
  }

  get areAllHidden() {
    return this.filteredAccounts.length === 0 && this.accounts.length > 0;
  }

  private get total(): number {
    return this.accounts.reduce((sum: number, account: Account) => {
      return account.hidden ? sum : sum + account.balance;
    }, 0);
  }

  getPercentage(account: Account) {
    return Math.round((account.balance / this.total) * 100);
  }
}
