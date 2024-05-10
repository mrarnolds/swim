import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import Account from '../../models/account.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountsComponent {
  @Input() isLoading = true;
  @Input() accounts: Array<Account> = [];

  trackById = (_index: number, account: Account) => account.id;

  trackByIndex = (index: number) => index;
}
