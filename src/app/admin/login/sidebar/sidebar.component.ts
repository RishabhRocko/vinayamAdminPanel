import { Component,OnInit} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  PageActive : any ;
  constructor(private router: Router){}
  ngOnInit(): void {
    switch (this.router.url) {
      case '/admin/dashboard':
          this.PageActive = 'dashboard';
          break;
      case '/admin/student':
        this.PageActive = 'student';
          break;
      case '/admin/image':
        this.PageActive = 'image';
          break;
      case '/admin/video':
        this.PageActive = 'video';
          break;
      case '/admin/course':
        this.PageActive = 'course';
          break;
      case '/admin/fee':
        this.PageActive = 'fee';
          break;
      case '/admin/test':
        this.PageActive = 'test';
          break;
      case '/admin/score':
        this.PageActive = 'score';
          break;
      default:
          break;
    }
  }
}
