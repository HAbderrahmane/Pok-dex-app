import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search', // Rename to 'app-search'
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  imports: [CommonModule, FormsModule],
})
export class SearchComponent {
  @Output() searchQuery = new EventEmitter<string>();
  searchText: string = ''; // The text input is bound to this property

  onSearch() {
    this.searchQuery.emit(this.searchText); // Emit the search text when user types
  }
}
