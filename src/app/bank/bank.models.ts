import { SubAccount } from '../account/account.model';

export class Bank {

  public id: number;
  public nameBank: string;
  public accountNumber: number;
  public balance: number;
  public balanceToday: number;
  public subAccount: SubAccount;

}
