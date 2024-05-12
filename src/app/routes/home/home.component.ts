import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  questions = [
    {
      title: 'Comment puis-je acheter des billets pour un événement ?',
      answer:
        'Vous pouvez acheter des billets en naviguant vers la page de l\'événement et en cliquant sur le bouton "Acheter des billets". Vous serez ensuite guidé à travers le processus de paiement.',
      isOpen: false,
    },
    {
      title: 'Comment puis-je obtenir un remboursement pour mon billet ?',
      answer:
        "Les remboursements dépendent de la politique de l'événement. Veuillez consulter la page de l'événement pour plus d'informations ou contactez-nous directement.",
      isOpen: false,
    },
    {
      title: 'Comment puis-je savoir si un événement est annulé ?',
      answer:
        "Les annulations d'événements seront annoncées sur la page de l'événement et les détenteurs de billets seront informés par email.",
      isOpen: false,
    },
    {
      title:
        "Puis-je vendre mes billets si je ne peux pas assister à l'événement ?",
      answer:
        "Nous n'offrons pas actuellement de plateforme pour la revente de billets. Veuillez vérifier la politique de l'événement pour plus d'informations.",
      isOpen: false,
    },
  ];

  toggle(index: number) {
    this.questions[index].isOpen = !this.questions[index].isOpen;
  }
}
