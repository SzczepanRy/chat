import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss'],
  imports: [CommonModule],
  standalone: true,
})
export class BodyComponent {
  @Input() data: any;

  name = localStorage.getItem('name');
  current: boolean = false;
}
