import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {

  constructor(private router: Router, private location: Location) { }

  showAnswer = false;
  openedCard = -1;

  ngOnInit(): void {
  }

  toggleAnswer(cardId: number) {
    this.openedCard = cardId;
  }

  closeCard() {
    this.openedCard = -1;
  }

  navigateBack() {
    this.location.back();
  }
}