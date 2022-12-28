import { Component } from '@angular/core';
import { SidenavService } from './services/sidenav.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'pokedex';

  constructor(public sidenavService: SidenavService) {}
}
