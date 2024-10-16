import { Component, OnInit, PLATFORM_ID, inject } from '@angular/core'
import { MatButton } from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';
import { RouterLink } from '@angular/router';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent, MatCardActions } from '@angular/material/card';
import { RootStore } from '../../app.store';
import { ROUTES_PATHS, PAGES_TITLES } from '../../shared/utils/constants';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    standalone: true,
    imports: [
        MatCard,
        RouterLink,
        MatCardHeader,
        MatCardTitle,
        MatCardContent,
        MatDivider,
        MatCardActions,
        MatButton,
    ],
    providers: []
})
export class DashboardComponent implements OnInit {
  readonly platformId = inject(PLATFORM_ID);
  readonly appStore = inject(RootStore);

  // To be use in template
  ROUTES_PATHS = ROUTES_PATHS;
  PAGES_TITLES = PAGES_TITLES;

  ngOnInit(): void {
    // withComputed function of signalStore we can translate this dynamically.
    this.appStore.changePageTitle(PAGES_TITLES.dashboard);
  }
}
