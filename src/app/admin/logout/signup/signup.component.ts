import { Component  , OnInit} from '@angular/core';
import { FormGroup,FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupService } from './signup.service';
import { ToastrService } from 'ngx-toastr';
import { decryptData } from 'src/app/helper/cryptoEncryption';
@Component({
  selector: 'logout-signup',
  templateUrl: './signup.component.html',
})
export class SignupComponent implements OnInit {
  user:any;
  adminImageBase64Data: any;
  adminImageFileSize: any;
  adminImageFileType: any;
  invalidAdminImage : number = 0;
  constructor(private SignupService:SignupService,private router: Router,private toastr: ToastrService){}
  ngOnInit(): void {
  }

  adminForm = new FormGroup({
    userName: new FormControl( '',[Validators.required,Validators.pattern(/^[a-zA-Z0-9]*$/)] ),
    adminRole: new FormControl( '',[Validators.required,Validators.pattern(/^[0-9]*$/)] ),
    adminImage: new FormControl( '',[Validators.required]),
    emailId: new FormControl( '',[Validators.required,Validators.pattern(/^([\w\-\.\+]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/)] ),
    password: new FormControl( '',[Validators.required,Validators.pattern(/^[A-Za-z0-9][a-zA-Z0-9 .&,@$()?_#-\/\+[\]*]*$/)] ),
  });

  onFileChange(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      this.encodeFileBase64(file);
    }
  }

  encodeFileBase64(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      this.adminImageBase64Data = reader.result as string;
      this.adminImageFileSize = file.size,
      this.adminImageFileType = file.type.split("/")
      if((this.adminImageFileType[0] != 'image') || (this.adminImageFileSize > 204800))
      {
        this.invalidAdminImage = 1;
      }else{
        this.invalidAdminImage = 0;
      }

    };
    reader.readAsDataURL(file);
  }
  onSubmitAdmin()
  {
    if(localStorage.getItem('token')){
      this.user = {token:localStorage.getItem('token'),adminImage: this.adminImageBase64Data,adminForm:this.adminForm.value};
      this.SignupService.addAdmin(this.user).subscribe((res: any) => {
        let response = decryptData(res);
        if(response.status == true)
        {
          this.router.navigate(['/admin', 'dashboard']);
          this.toastr.success(response.message ? response.message : 'Success', 'Success', {
            positionClass: 'successMessageClass'
        });
        }else{
          this.toastr.error(response.message ? response.message : 'Error', 'Error', {
            positionClass: 'errorMessageClass'
        });
        }
      });
    }else{
      this.toastr.error('Unauthorized', 'Error', {
        positionClass: 'errorMessageClass'
    });
    }
  }

  reloadBack(){
    window.history.back();
  }
}
