import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Account } from '../../models/account.interface';
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

  @Output() toggleChange = new EventEmitter<Account>();

  trackById = (_index: number, account: Account) => account.id;

  trackByIndex = (index: number) => index;

  toggleValue(account: Account): void {
    this.toggleChange.emit(account);
  }
}
