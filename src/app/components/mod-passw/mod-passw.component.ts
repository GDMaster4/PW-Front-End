import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { interval, Subscription, take } from 'rxjs';

@Component({
  selector: 'app-mod-passw',
  templateUrl: './mod-passw.component.html',
  styleUrl: './mod-passw.component.css'
})
export class ModPasswComponent implements OnInit, OnDestroy
{
  passwForm = this.fb.group({
    nuovaPassw: ['', [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]],
    Conferma: ['', Validators.required]
  });
  errPassw:string="";
  errConferma:string="";
  countdown: number = 30;  // Numero di secondi del countdown
  private countdownSubscription!: Subscription;

	closeResult = '';
  constructor(protected modalService: NgbModal, protected fb: FormBuilder, protected authSrv:AuthService,
    protected router:Router){}
    
  ngOnInit(): void
  {
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
    this.router.navigate(['/home']);
  }

  open(content: TemplateRef<any>)
  {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
    .result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;       
      },
    );
  }

	private getDismissReason(reason: any): string
  {
		switch (reason)
    {
			case ModalDismissReasons.ESC:
				return 'by pressing ESC';
			case ModalDismissReasons.BACKDROP_CLICK:
				return 'by clicking on a backdrop';
			default:
				return `with: ${reason}`;
		}
	}
  controlloPassw()
  {
    const nuovaPassw = this.passwForm.getRawValue().nuovaPassw;
    const conferma = this.passwForm.getRawValue().Conferma;
    if(this.passwForm.get("nuovaPassw")?.errors)
    {
      this.errPassw="La password deve contenere almeno 8 caratteri, 1 "+
                      "maiuscola, 1 minuscola, 1 numero e 1 carattere speciale "+
                      "(#?!$%^&*-)";
    }
    else {
      this.errPassw="";
    }
  }

  controlloTesto()
  {
    const nuovaPassw = this.passwForm.getRawValue().nuovaPassw;
    const conferma = this.passwForm.getRawValue().Conferma;
    if(nuovaPassw != conferma) {
      this.errPassw="La password non è uguale";
    }
    else {
      this.errPassw="";
    }
  }

  nuovaPassw()
  {
    if(this.passwForm.valid)
    {
      const {nuovaPassw}= this.passwForm.value!;
      this.authSrv.modPassw(nuovaPassw!);
      this.passwForm.reset();
      this.modalService.dismissAll();
      this.router.navigate(['/home']);
    }
  }
}