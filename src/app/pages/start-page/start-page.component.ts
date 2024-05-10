import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { TotalComponent } from '../../components/total/total.component';
import { AccountsComponent } from '../../components/accounts/accounts.component';
import { OverviewComponent } from '../../components/overview/overview.component';
import { Account } from '../../models/account.interface';
import { AccountService } from '../../services/account.service';
import { finalize } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-start-page',
  standalone: true,
  imports: [TotalComponent, AccountsComponent, OverviewComponent],
  templateUrl: './start-page.component.html',
  styleUrl: './start-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StartPageComponent implements OnInit {
  isLoading = true;
  accounts: Array<Account> = [];

  get total(): number {
    return this.accounts.reduce((sum: number, account: Account) => {
      return account.hidden ? sum : sum + account.balance;
    }, 0);
  }

  constructor(
    private accountService: AccountService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.accountService
      .getAllAccounts('SEK')
      .pipe(
        finalize(() => {
          this.isLoading = false;
          this.cd.markForCheck();
        }),
        untilDestroyed(this)
      )
      .subscribe((response) => {
        this.accounts = response;
      });
  }

  onToggleAccount(account: Account) {
    if (!this.accounts) {
      return;
    }

    const accountIndex = this.accounts.findIndex(({ id }) => id === account.id);

    const newAccounts = [...this.accounts];
    newAccounts[accountIndex] = {
      ...account,
      hidden: !account.hidden,
    };
    this.accounts = newAccounts;
  }
}
