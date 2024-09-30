import { Component } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css'
})
export class AlertComponent {

    isVisible: boolean = false; // Controlla la visibilità dell'alert
    alertMessage: string = 'Allert Message'; // Messaggio predefinito

    // Funzione per mostrare l'alert
    showAlert(message: string) {
      this.alertMessage = message;
      this.isVisible = true;
    }

    // Funzione per chiudere l'alert
    closeAlert() {
      this.isVisible = false;
    }


}
