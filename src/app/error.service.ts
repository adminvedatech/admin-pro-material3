import { Injectable, ErrorHandler, Injector, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { SnackbarService } from './snackbar/snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorService implements ErrorHandler {
  constructor(private ngZone: NgZone, private injector: Injector, private sanckbar: SnackbarService) { }

  handleError(error: any): void {
    const router = this.injector.get(Router);
    // console.log('ERROR EN ERROR SERVICE ', error);

    if (error.status === 401 || error.status === 403) {
      this.ngZone.run(() => router.navigate(['login']));
  }

  if (error.status === 404) {
    console.log('ERROR 404 ', error);
    // swal('Mensaje del Servidor:', `El Cliente no existe ${error.error.nameCustomer} desea darlo de alta`, 'error');

  }

  if (error.status === 417) {
    console.log('ERROR 417 ', error);
    this.sanckbar.warn('Error al enviar datos');
    // router.navigate(['/catalogs']);
  }

  if (error.status === 204) {
    // A client-side or network error occurred.
    console.error('An error occurred:', error);
    //  router.navigate(['/login']);
  }
  // if (error.status === 409) {
  //   // A client-side or network error occurred.
  //   console.error('An error occurred:', error);
  //   this.sanckbar.fail(error.error);
  //   //  router.navigate(['/login']);
  // }


}

}
