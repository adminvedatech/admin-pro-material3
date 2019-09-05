import { Customer } from '../customer/customer.model';

export class AccountType {
  public id: number;
  public name: string;
  public account: string;
  public balance: number;
  public subAccount: SubAccount[];
  public state: boolean;

}

export class AccountType2 {
  public id: number;
  public name: string;
  public account: string;
  public balance: number;
  // public subAccount: SubAccount[];
  public state: boolean;

}

export class SubAccount {
  public id: number;
  public nameAccount: string;
  public accountNumber: string;
  public balance: number;
  public status: boolean;
  public accountType: AccountType;
 
}
