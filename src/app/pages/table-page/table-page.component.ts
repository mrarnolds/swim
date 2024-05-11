import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Account } from '../../models/account.interface';
import { AccountService } from '../../services/account.service';
import { finalize } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { CommonModule, DecimalPipe } from '@angular/common';
import { LoaderComponent } from '../../components/loader/loader.component';

/** Possible order by values */
type OrderBy = 'asc' | 'desc';

/** Possible fields for sorting */
type AccountField = keyof Omit<Account, 'hidden'>;

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

  sortBy?: AccountField;
  orderBy?: OrderBy;

  get accounts() {
    const sorted = [...this.response];

    /** Sort by field */
    if (this.sortBy) {
      sorted.sort((a, b) => {
        const valueA = a[this.sortBy as AccountField];
        const valueB = b[this.sortBy as AccountField];

        if (valueA === valueB) {
          return 0;
        }
        return valueA < valueB ? -1 : 1;
      });
    }

    /** Ascending or descending order */
    return this.orderBy === 'desc' ? sorted.reverse() : sorted;
  }

  /** Unsorted response from server */
  private response: Array<Account> = [];

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
      .subscribe((response) => (this.response = response));
  }

  /** Toggle sorting between ascending, descending and none */
  onClickToggleSortBy(field: AccountField) {
    if (this.sortBy !== field) {
      this.sortBy = field;
      this.orderBy = 'asc';
    } else if (this.orderBy === 'asc') {
      this.orderBy = 'desc';
    } else if (this.orderBy === 'desc') {
      this.orderBy = undefined;
      this.sortBy = undefined;
    }
  }

  /** Apply sorting css if same field */
  getSortingClass(field: AccountField) {
    return field === this.sortBy ? this.orderBy : null;
  }
}
