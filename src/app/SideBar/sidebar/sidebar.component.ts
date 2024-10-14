import { Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  constructor(private renderer: Renderer2) {}

  toggleSidebar(): void {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
      if (sidebar.style.display === 'none' || sidebar.style.display === '') {
        this.renderer.setStyle(sidebar, 'display', 'block');
      } else {
        this.renderer.setStyle(sidebar, 'display', 'none');
      }
    }
  }

}
