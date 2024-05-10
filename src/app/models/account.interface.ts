export interface Account {
  id: string;
  accountId: string;
  bank: string;
  balance: number;
  currency: 'SEK';

  /** Hide account from page and table overview */
  hidden?: boolean;
}
