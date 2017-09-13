import { Component } from '@angular/core';
import { RoutingService } from './routing/routing.service';

@Component({
  selector: 'app-root',
  template: `
    <app-header></app-header>

    <div class="app-content">
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // inject RoutingService to activate redirects
  constructor(private routingService: RoutingService) {
  }
}
