import { Component, Input, Output, EventEmitter,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { SharedDataService } from '../../services/shared-data.service';
@Component({
  selector: 'app-poke-card',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './poke-card.component.html',
  styleUrls: ['./poke-card.component.scss'],
})
export class PokeCardComponent implements OnInit {
  @Input() pokemon: any;
  @Output() cardClick = new EventEmitter<string>();

  constructor(private router: Router, private sharedDataService : SharedDataService) {}

  onCardClick(): void {
    this.cardClick.emit(this.pokemon.id);
    this.router.navigate(['pokemon-details', this.pokemon.id]);
    console.log(this.pokemon.id);
  }

  ngOnInit() {}
}
