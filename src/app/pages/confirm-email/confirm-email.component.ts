import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrl: './confirm-email.component.css'
})
export class ConfirmEmailComponent {


  countdown: number = 5;  // Numero di secondi del countdown
  private countdownSubscription!: Subscription;

  constructor(private router: Router) {}

  ngOnInit() {
    // Intervallo di 1 secondo
    this.countdownSubscription = interval(1000)
      .pipe(take(this.countdown))  // Limita l'intervallo alla durata del countdown
      .subscribe({
        next: (value) => this.countdown -= 1,
        complete: () => this.redirect()
      });
  }

  redirect() {
    // Reindirizza alla pagina desiderata
    this.router.navigate(['/login']);
  }

  ngOnDestroy() {
    if (this.countdownSubscription) {
      this.countdownSubscription.unsubscribe();
    }
  }

}
