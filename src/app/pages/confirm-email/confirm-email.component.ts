import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { ContoService } from '../../services/conto.service';
import { MovimentiService } from '../../services/movimenti.service';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrl: './confirm-email.component.css'
})
export class ConfirmEmailComponent implements OnInit,OnDestroy
{
  countdown: number = 5;  // Numero di secondi del countdown
  private countdownSubscription!: Subscription;

  constructor(private router: Router, protected contoSrv:ContoService,protected movSrv:MovimentiService) {}

  ngOnInit()
  {
    const id= this.router.url.split("=")[1];
    this.movSrv.aperturaConto(id);
    // Intervallo di 1 secondo
    this.countdownSubscription = interval(1000)
      .pipe(take(this.countdown))  // Limita l'intervallo alla durata del countdown
      .subscribe({
        next: (value) => this.countdown -= 1,
        complete: () => this.redirect()
      });
  }

  ngOnDestroy()
  {
    if (this.countdownSubscription) {
      this.countdownSubscription.unsubscribe();
    }
  }

  redirect()
  {
    // Reindirizza alla pagina desiderata
    this.router.navigate(['/login']);
  }

}