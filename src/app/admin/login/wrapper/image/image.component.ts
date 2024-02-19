import { Component , OnInit } from '@angular/core';
import { ImageService } from './image.service';
import { ToastrService } from 'ngx-toastr';
import { decryptData } from 'src/app/helper/cryptoEncryption';
import { FormGroup,FormControl,Validators } from '@angular/forms';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
})
export class ImageComponent {
  landData:any;
  sendData:any;
  token:any;
  deleteId:any;

  constructor(private ImageService:ImageService,private toastr: ToastrService){}

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.sendData = {"token":this.token};
    this.ImageService.allImageData(this.sendData).subscribe((res: any) => {
      let response = decryptData(res);
      if(response.status == true)
      {
        this.landData = response.data;
      }else{
        this.toastr.error(response.message ? response.message : 'Error', 'Error', {
          positionClass: 'errorMessageClass'
       });
      }
    });
  }

  getDeleteData(id: any)
  {
    this.deleteId = id;
  }

  deleteAdmin(isValid:any)
  {
    if(isValid)
    {
      this.sendData = {"token":this.token,"deleteId":this.deleteId};
      this.ImageService.deleteImageData(this.sendData).subscribe((res: any) => {
        let response = decryptData(res);
        if(response.status == true)
        {
          this.toastr.success(response.message ? response.message : 'Success', 'Success', {
            positionClass: 'successMessageClass'
         });
         this.ngOnInit();
        }else{
          this.toastr.error(response.message ? response.message : 'Error', 'Error', {
            positionClass: 'errorMessageClass'
         });
        }
      });
    }else{
      this.toastr.error('Can`t Delete Image!', 'Error', {
        positionClass: 'errorMessageClass'
     });
    }
  }
}
