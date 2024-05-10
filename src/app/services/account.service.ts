import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Account from '../models/account.interface';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private get endpoint(): string {
    return 'https://private-9b37c2-wlb.apiary-mock.com';
  }

  constructor(private http: HttpClient) {}

  getAllAccounts(currency: 'SEK'): Observable<Array<Account>> {
    const params = { ccy: currency };

    return this.http.get<Array<Account>>(`${this.endpoint}/accounts`, {
      params,
    });
  }
}
