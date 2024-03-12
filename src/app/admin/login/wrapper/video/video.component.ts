import { Component , OnInit } from '@angular/core';
import { VideoService } from './video.service';
import { ToastrService } from 'ngx-toastr';
import { decryptData } from 'src/app/helper/cryptoEncryption';
import { FormGroup,FormControl,Validators } from '@angular/forms';
@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
})
export class VideoComponent {
  landData:any;
  sendData:any;
  token:any;
  deleteId:any;
  videoBase64Data:any;
  altVideoBase64Data:any;
  videoFileSize:any;
  videoFileType:any;
  invalidVideoUrl: number = 0;
  invalidAltVideo: number = 0;
  editVideoData:any;
  user:any;

  constructor(private VideoService:VideoService,private toastr: ToastrService){}

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.sendData = {"token":this.token};
    this.VideoService.allVideoData(this.sendData).subscribe((res: any) => {
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
  editVideoForm = new FormGroup({
    videoId: new FormControl('',[Validators.required,Validators.pattern(/^[0-9]*$/)]),
    videoTag: new FormControl( '',[Validators.required,Validators.pattern(/^[a-zA-Z0-9]*$/)]),
    videoUrl:  new FormControl( '',[Validators.required]),
    videoText:  new FormControl( '',[Validators.required,Validators.pattern(/^[a-zA-Z0-9 ]*$/)]),
    altVideo:  new FormControl( '',[Validators.required]),
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
      if(type == 'videoUrlBase64'){
        this.videoBase64Data = reader.result as string;
      }else if(type == 'altVideoBase64'){
        this.altVideoBase64Data = reader.result as string;
      }
      this.videoFileSize = file.size,
      this.videoFileType = file.type.split("/")
      if((this.videoFileType[0] != 'image') || (this.videoFileSize > 2048000))
      {
        if(type == 'videoUrlBase64'){
          this.invalidVideoUrl = 1;
        }else if(type == 'altVideoBase64'){
          this.invalidAltVideo = 1;
        }
      }else{
        if(type == 'videoUrlBase64'){
          this.invalidVideoUrl = 0;
        }else if(type == 'altVideoBase64'){
          this.invalidAltVideo = 0;
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
      this.VideoService.getEditVideoData(this.sendData).subscribe((res: any) => {
        let response = decryptData(res);
        if(response.status == true)
        {
         this.editVideoData = response.data;
         this.editVideoForm.setValue({
           videoId: this.editVideoData.id,
           videoTag: this.editVideoData.videoName,
           videoText: this.editVideoData.videoText,
           videoUrl: null,
           altVideo: null
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

  onSubmitEditVideo()
  {
    if(localStorage.getItem('token')){
      this.user = {token:localStorage.getItem('token'),videoUrl: this.videoBase64Data,altVideo: this.altVideoBase64Data,editForm:this.editVideoForm.value};
      this.VideoService.saveEditVideoData(this.user).subscribe((res: any) => {
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



  deleteVideo(isValid:any)
  {
    if(isValid)
    {
      this.sendData = {"token":this.token,"deleteId":this.deleteId};
      this.VideoService.deleteVideoData(this.sendData).subscribe((res: any) => {
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
      this.toastr.error('Can`t Delete Video!', 'Error', {
        positionClass: 'errorMessageClass'
     });
    }
  }
}
