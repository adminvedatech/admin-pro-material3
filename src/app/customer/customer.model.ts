
export class Customer {
  public id: number;
  public company: string;
  public customerRfc: string;
  public storeNum: string;
  public balance: number;
  public budget: number;
  public status: boolean;
  public subAccount: string;
}

export class Invoice {

  public id: number;
  public customerName;
  public storeNum;
  public fecha: Date;
  public fechaPago: Date;
  public condicionesDePago: string;
  public  subTotal: number;
  public  total: number;
  public  pago: number;
  public folio: string;
  public customer: Customer;
  public invoiceItems: InvoiceItems;


  }

  export class InvoiceItems {
    public cantidad: number;
    public descripcion: string;
    public valorUnitario: number;
    public importe: number;
}

