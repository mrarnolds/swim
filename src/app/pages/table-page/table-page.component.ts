import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Account } from '../../models/account.interface';
import { AccountService } from '../../services/account.service';
import { finalize } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { CommonModule, DecimalPipe } from '@angular/common';
import { LoaderComponent } from '../../components/loader/loader.component';

@UntilDestroy()
@Component({
  selector: 'app-table-page',
  standalone: true,
  imports: [CommonModule, DecimalPipe, LoaderComponent],
  templateUrl: './table-page.component.html',
  styleUrl: './table-page.component.scss',
})
export class TablePageComponent implements OnInit {
  isLoading = true;
  accounts: Array<Account> = [];

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
}
