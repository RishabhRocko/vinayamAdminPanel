import { Component , OnInit} from '@angular/core';
import { FormGroup,FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WebService } from './web.service';
import { ToastrService } from 'ngx-toastr';
import { decryptData } from 'src/app/helper/cryptoEncryption';
@Component({
  selector: 'app-web',
  templateUrl: './web.component.html',
})
export class WebComponent implements OnInit{
  user: any;
  constructor(private WebService:WebService,private router: Router,private toastr: ToastrService){}
  ngOnInit(): void {
    localStorage.removeItem("token");
  }
  onAdmin()
  {
    this.router.navigate(['/admin']);
  }
}
