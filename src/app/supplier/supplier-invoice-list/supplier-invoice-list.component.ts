import { Component, OnInit, ViewChild } from '@angular/core';
import { SupplierService } from '../service/supplier.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { SnackbarService } from '../../snackbar/snackbar.service';
import { Invoice } from 'src/app/customer/customer.model';
import { Subject } from 'rxjs';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-supplier-invoice-list',
  templateUrl: './supplier-invoice-list.component.html',
  styleUrls: ['./supplier-invoice-list.component.css']
})
export class SupplierInvoiceListComponent implements OnInit {

  progress: { percentage: number } = { percentage: 0 };
  selectedFile: File = null;
  name = '';
  currentFileUpload: File = null;
  invoices: Invoice[];
  invoice: Subject<Invoice[]> = new Subject();
  listData: MatTableDataSource<any>;
  total = 0.00;
  displayedColumns: string[] = ['folio', 'cliente', 'sucursal', 'fecha', 'fechaPago', 'Total', 'Pago', 'Acciones'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;


  constructor(private supplierService: SupplierService,
              private snackbar: SnackbarService) { }

  ngOnInit() {
  }


   /*----------- Selecciona Archivo AccountType en formato CSV para ser Enviado -------------*/
   onFileSelected(event) {
    this.progress.percentage = 0;
    this.selectedFile = <File>event.target.files[0];
    try {
      this.name = this.selectedFile.name;
      console.log(this.selectedFile.name.split('.'));
      if ( this.name.split('.')[1] !== 'xml') {
        console.log('ERROR!');
        this.cancelFile();
      // swal('Error!', 'Cancelar y seleccionar un archivo con formato XML', 'warning');

      } else {
        console.log('go ahead');

      }
    } catch (error) {
      console.log(error);
      this.cancelFile();
      // swal('Error!', 'Cancelar y seleccionar un archivo nuevo!', 'warning');
    }
}


/*----------- Cancela enviar Archivo -------------*/
cancelFile() {
  this.selectedFile = null;
  this.name = null;
  console.log('Cancel File', this.selectedFile);
}


/*----------- Envia Archivo en formato XML al Servidor -------------*/
onUploadTxtFile() {
  const fd = new FormData();
  try {
    fd.append('file', this.selectedFile, this.selectedFile.name);
    this.progress.percentage = 0;
    this.currentFileUpload = this.selectedFile;
    this.supplierService.sendXmlSupplierInvoice(this.currentFileUpload).subscribe(event => {

      if (event.type === HttpEventType.UploadProgress) {
          this.progress.percentage = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          console.log('File is completely uploaded!');
          // swal('Mensaje del Servidor...', `La transaccion fue exitosa`, 'success');

          this.selectedFile = null;
          this.name = null;
          this.loadInvoice();
          this.progress.percentage = 0;

            // this.router.navigate(['/suppliers']);
        }

      }, error => {
         console.log(error, '/', error.error);
        this.snackbar.warn('Es posible que la factura ya exista, favor de verificar');
          // swal('Mensaje del Servidor:', `Error!!...El numero de la Factura ya existe `, 'error');
       }
      );


  } catch (error) {
    // swal('Error!', 'Seleccionar un archivo XML para ser enviado!', 'warning');
  }

}


/*----------------------- Http carga la Invoice que fue enviada -----------------------*/
loadInvoice() {
  this.supplierService.getAllInvoiceSupplier().subscribe(resp => {
    this.invoices = resp;
    if (resp !== null ) {

      this.invoice.next(this.invoices);
      console.log('INVOICES ', this.invoices);
      this.listData = new MatTableDataSource(this.invoices);
      this.calcTotal(this.listData.filteredData);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;
      this.progress.percentage = 0;
    } else {
      // swal('Error!', 'No Existen facturas!', 'warning');
    }
  });

}


calcTotal(obj: any) {
  console.log('OBJ ', obj);
  this.total = 0;
  for (let i = 0; i < obj.length; i++) {
    this.total = this.total + obj[i].total;
  }
  console.log('TOTAL ', this.total);
}




}
