import {Component } from '@angular/core';
import { navItems } from '../../../_nav';

@Component({
  selector: 'app-sidebar-controlroom',
  templateUrl: './controlroom.component.html'
})
export class ControlRoomLayoutComponent {
  public sidebarMinimized = false;
  public navItems = navItems;

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
}
