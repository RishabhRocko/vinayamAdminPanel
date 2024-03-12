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
  imageBase64Data:any;
  altImageBase64Data:any;
  imageFileSize:any;
  imageFileType:any;
  invalidImageUrl: number = 0;
  invalidAltImage: number = 0;
  editImageData:any;
  user:any;

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

  editImageForm = new FormGroup({
    imageId: new FormControl('',[Validators.required,Validators.pattern(/^[0-9]*$/)]),
    imageTag: new FormControl( '',[Validators.required,Validators.pattern(/^[a-zA-Z0-9]*$/)]),
    imageUrl:  new FormControl( ''),
    imageText:  new FormControl( '',[Validators.required,Validators.pattern(/^[a-zA-Z0-9 ]*$/)]),
    altImage:  new FormControl( ''),
  });

  getDeleteData(id: any)
  {
    this.deleteId = id;
  }

  onFileChange(event: any,type:any) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      this.encodeFileBase64(file,type);
    }
  }

  encodeFileBase64(file: File,type:any) {
    const reader = new FileReader();
    reader.onload = () => {
      if(type == 'imageUrlBase64'){
        this.imageBase64Data = reader.result as string;
      }else if(type == 'altImageBase64'){
        this.altImageBase64Data = reader.result as string;
      }
      this.imageFileSize = file.size,
      this.imageFileType = file.type.split("/")
      if((this.imageFileType[0] != 'image') || (this.imageFileSize > 512000))
      {
        if(type == 'imageUrlBase64'){
          this.invalidImageUrl = 1;
        }else if(type == 'altImageBase64'){
          this.invalidAltImage = 1;
        }
      }else{
        if(type == 'imageUrlBase64'){
          this.invalidImageUrl = 0;
        }else if(type == 'altImageBase64'){
          this.invalidAltImage = 0;
        }
      }

    };
    reader.readAsDataURL(file);
  }

  getEditData(id: any)
  {
    this.token = localStorage.getItem('token');
    if(id != null && this.token != null)
    {
      this.sendData = {"token":this.token,"editId":id};
      this.ImageService.getEditImageData(this.sendData).subscribe((res: any) => {
        let response = decryptData(res);
        if(response.status == true)
        {
         this.editImageData = response.data;
         this.editImageForm.setValue({
           imageId: this.editImageData.id,
           imageTag: this.editImageData.imageName,
           imageText: this.editImageData.imageText,
           imageUrl: null,
           altImage: null
         });
        }else{
          this.toastr.error(response.message ? response.message : 'Error', 'Error', {
            positionClass: 'errorMessageClass'
         });
        }
      });
    }else{
      this.toastr.error('Empty Data Error!', 'Error', {
        positionClass: 'errorMessageClass'
     });
    }
  }

  onSubmitEditImage()
  {
    if(localStorage.getItem('token')){
      this.user = {token:localStorage.getItem('token'),imageUrl: this.imageBase64Data,altImage: this.altImageBase64Data,editForm:this.editImageForm.value};
      this.ImageService.saveEditImageData(this.user).subscribe((res: any) => {
        let response = decryptData(res);
        if(response.status == true)
        {
          this.toastr.success(response.message ? response.message : 'Success', 'Success', {
            positionClass: 'successMessageClass'
        });
        window.location.reload();
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



  deleteImage(isValid:any)
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
