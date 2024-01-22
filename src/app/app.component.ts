import { Component , OnInit} from '@angular/core';
import { Router , NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
   constructor(private router:Router){}
  ngOnInit(): void {
    const user = localStorage.getItem("user");
    if (user && user == '1') {
      this.router.navigate(['/admin', 'dashboard']);
    }else{
      this.router.navigate(['/admin']);
    }
  }
}

