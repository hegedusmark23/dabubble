import { Component } from '@angular/core';

@Component({
  selector: 'app-search-field',
  standalone: true,
  imports: [],
  templateUrl: './search-field.component.html',
  styleUrl: './search-field.component.scss'
})
export class SearchFieldComponent {

  constructor() { }

  onSearch(event: any) {
    const searchTerm = event.target.value;
    console.log(searchTerm);
    
  }

}

