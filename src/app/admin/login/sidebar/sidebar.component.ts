import { Component,OnInit} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  dashboardPageActive : number = 0;
  studentPageActive : number = 0;
  imagePageActive : number = 0;
  VideoPageActive : number = 0;
  constructor(private router: Router){}
  ngOnInit(): void {
    this.dashboardPageActive = 0;
    this.studentPageActive = 0;
    this.imagePageActive = 0;
    this.VideoPageActive = 0;
    switch (this.router.url) {
      case '/admin/dashboard':
          this.dashboardPageActive = 1;
          break;
      case '/admin/student':
        this.studentPageActive = 1;
          break;
      case '/admin/image':
        this.imagePageActive = 1;
          break;
      case '/admin/video':
        this.VideoPageActive = 1;
          break;
      default:
          break;
    }
  }
}
