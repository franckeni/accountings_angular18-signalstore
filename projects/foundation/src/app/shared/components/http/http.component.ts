import { Component, Input } from '@angular/core';
import { MatCard, MatCardHeader, MatCardAvatar, MatCardTitle, MatCardSubtitle, MatCardContent } from '@angular/material/card';

@Component({
  selector: 'app-http-error',
  templateUrl: './http.component.html',
  styleUrl: './http.component.scss',
  standalone: true,
  imports: [MatCard, MatCardHeader, MatCardAvatar, MatCardTitle, MatCardSubtitle, MatCardContent],
})
export class HttpErrorComponent {
  /*error$: Observable<ErrorType | undefined>;
  routeParams: Params;*/

  @Input() status!: number;
  @Input() statusText?: string;
  @Input() message!: string;
  @Input() height?: boolean;
}
