import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {FileUploader} from 'ng2-file-upload';
import { MatTableDataSource, MatSort, MatPaginator, MatDialogConfig, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { HttpEventType, HttpResponse, HttpClient } from '@angular/common/http';
import { AccountService } from '../service/account.service';
import { AccountType } from '../account.model';
import { SnackbarService } from 'src/app/snackbar/snackbar.service';
import { SubaccountFormService } from '../service/subaccount-form.service';
import { SubaccountFormComponent } from '../subaccount-form/subaccount-form.component';
import { SubaccountNewComponent } from '../subaccount-new/subaccount-new.component';


@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnInit {

title = 'Angular File Upload';
hidefooter = 1;
uploadForm: FormGroup;
public uploader: FileUploader = new FileUploader({
    isHTML5: true
  });

  selectedFile: File = null;
  name = '';
  nameZip = '';
  progress: { percentage: number } = { percentage: 0 };
  currentFileUpload: File = null;
  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'name', 'account', 'balance', 'state', 'Acciones'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  // accounting: Supplier[];
  accounting: AccountType[];
  accountChanges: Subject<AccountType[]> = new Subject();

  constructor(private accountService: AccountService,
    private subaccountService: SubaccountFormService,
    private subaccountformService: SubaccountFormService,
    private dialog: MatDialog,
    private fb: FormBuilder, private http: HttpClient, private snackbarService: SnackbarService,
              private router: Router  ) {
                this.accounting = null;
                 this.loadAccounting();
               }

               uploadSubmit() {
                for (let i = 0; i < this.uploader.queue.length; i++) {
                  const fileItem = this.uploader.queue[i]._file;
                  if (fileItem.size > 10000000) {
                    alert('Each File should be less than 10 MB of size.');
                    return;
                  }
                }
                for (let j = 0; j < this.uploader.queue.length; j++) {
                  const data = new FormData();
                  const fileItem = this.uploader.queue[j]._file;
                  console.log(fileItem.name);
                  data.append('file', fileItem);
                  data.append('fileSeq', 'seq' + j);
                  data.append( 'dataType', this.uploadForm.controls.type.value);
                  this.uploadFile(data).subscribe(data => alert(data.message));
                }
                this.uploader.clearQueue();
          }


          uploadFile(data: FormData): Observable<any> {
            return this.http.post('http://localhost:8080/api/invoice/upload', data);
          }


  ngOnInit() {
    this.uploadForm = this.fb.group({
      document: [null, null],
      type:  [null, Validators.compose([Validators.required])]
    });

    this.accountService.refreshNeeded$
      .subscribe(() => {
        this.loadAccounting();
      });
    this.loadAccounting();
  }

  /*----------- Selecciona Archivo AccountType en formato CSV para ser Enviado -------------*/
  onFileSelected(event) {
    this.progress.percentage = 0;
    this.selectedFile = <File>event.target.files[0];
    try {
      this.name = this.selectedFile.name;
      console.log(this.selectedFile.name.split('.'));
      if ( this.name.split('.')[1] !== 'csv') {
        console.log('ERROR!');
        this.cancelFile();
        this.snackbarService.warn(':: Error! Seleccione un archivo XML ');
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


 /*----------- Envia Archivo AccountType en formato CSV al Servidor -------------*/
 onUploadTxtFile() {
  const fd = new FormData();
  try {
    fd.append('file', this.selectedFile, this.selectedFile.name);
    this.progress.percentage = 0;
    this.currentFileUpload = this.selectedFile;
    this.accountService.pushFileToStorage(this.currentFileUpload).subscribe(event => {

      if (event.type === HttpEventType.UploadProgress) {
          this.progress.percentage = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          console.log('File is completely uploaded!');
          this.snackbarService.success(':: Proceso exitoso!');
          this.selectedFile = null;
          this.name = null;
          this.loadAccounting();
          this.progress.percentage = 0;

        }
      }, error => {
        this.snackbarService.fail(':: Error en el Servidor!');

        // console.log(error, '/', error.error);
          // swal('Mensaje del Servidor:', `Error!!...El numero de la Factura ya existe `, 'error');
       }
      );
  } catch (error) {
    // swal('Error!', 'Seleccionar un archivo XML para ser enviado!', 'warning');
  }
}


/*----------- Envia Archivo AccountType en formato ZIP al Servidor -------------*/
onUploadZipFile() {
  const fd = new FormData();
  try {
    fd.append('file', this.selectedFile, this.selectedFile.name);
    fd.append('type', 'zip');
    this.progress.percentage = 0;
    this.currentFileUpload = this.selectedFile;
    this.accountService.pushFileToStorage(this.currentFileUpload).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
          this.progress.percentage = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          console.log('File is completely uploaded!');
          // swal('Mensaje del Servidor...', `La transaccion fue exitosa`, 'success');

          this.selectedFile = null;
          this.name = null;
          // this.loadInvoice();
          this.progress.percentage = 0;

            // this.router.navigate(['/suppliers']);
        }
      });
  } catch (error) {
    // swal('Error!', 'Seleccionar un archivo en Format CSV para ser enviado!', 'warning');
  }
}



/*----------------------- Http carga la Invoice que fue enviada -----------------------*/
    loadAccounting() {
      this.accountService.getAllAccountsType().subscribe(resp => {
        this.accounting = resp;
        if (resp !== null ) {

          this.accountChanges.next(this.accounting);
          console.log('INVOICES ', this.accounting);
          console.log('acc length ', this.accounting.length);
          console.log('acc length ', this.accounting[0].subAccount.length);

          for ( let i = 0; i < this.accounting.length; i++) {
            for (let j = 0; j < this.accounting[i].subAccount.length; j++) {
              this.accounting[i].balance = this.accounting[i].balance + this.accounting[i].subAccount[j].balance;
              console.log('ACCOUNT ', this.accounting[i].balance);
            }
          }
          console.log('Despues del loop ', this.accounting);
          this.listData = new MatTableDataSource(this.accounting);
          this.listData.sort = this.sort;
          this.listData.paginator = this.paginator;
          console.log('List Data ', this.listData.data.length);
          this.progress.percentage = 0;
        } else {
          // swal('Error!', 'No Existen facturas!', 'warning');
        }
      });

    }



 /*----------- Cancela enviar Archivo -------------*/
 cancelFile() {
  this.selectedFile = null;
  this.name = null;
  console.log('Cancel File', this.selectedFile);
}

applyFilter() {
  this.listData.filter = this.searchKey.trim().toLowerCase();
}

onSearchClear() {
  this.searchKey = '';
  this.applyFilter();
}

onCreate() {
  // this.subaccountformService.initializeFormGroup(row);
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  dialogConfig.width = '60%';
  this.dialog.open(SubaccountNewComponent, dialogConfig);
}

verDetalle(element) {
console.log('Element ', element.id);
this.router.navigate(['/account/subaccount', element.id]);

}


}
