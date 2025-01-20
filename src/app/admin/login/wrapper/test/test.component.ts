import { Component , OnInit } from '@angular/core';
import { TestService } from './test.service';
import { ToastrService } from 'ngx-toastr';
import { decryptData } from 'src/app/helper/cryptoEncryption';
import { FormGroup,FormControl,Validators } from '@angular/forms';
@Component({
  selector: 'test-wrapper',
  templateUrl: './test.component.html'
})
export class TestComponent {

  landData:any;
  sendData:any;
  token:any;
  user: any;
  deleteId:any;
  deleteEncString:any;
  editTestData:any;
  testImageBase64Data: any;
  testImageFileSize: any;
  testImageFileType: any;
  questionPaperBase64Data: any;
  questionPaperFileSize: any;
  questionPaperFileType: any;
  answerKeyBase64Data: any;
  answerKeyFileSize: any;
  answerKeyFileType: any;
  invalidTestImage : number = 0;
  invalidQuestionPaper : number = 0;
  invalidAnswerKey : number = 0;
  testSearchBar:any;
  page:any = 1;
  sideBarToggleVar:boolean = true;
  booleanValue: boolean = false;
  courseData: any;
  viewPdfUrl : any;

 constructor(private TestService:TestService,private toastr: ToastrService){}
  ngOnInit(): void {
    this.token = localStorage.getItem('token');
  this.sendData = {"token":this.token};
  this.TestService.allTestData(this.sendData).subscribe((res: any) => {
    let response = decryptData(res);
    if(response.status == true)
    {
      this.landData = response.data;
      this.courseData = response.courseData;
    }else{
      this.courseData = response.courseData;
      this.toastr.error(response.message ? response.message : 'Error', 'Error', {
        positionClass: 'errorMessageClass'
     });
    }
  });
  }
  viewPdf(base64:any){
    this.viewPdfUrl = base64;
  }
  onSearchKeyUp(event: KeyboardEvent) {
    this.token = localStorage.getItem('token');
    this.sendData = {"token":this.token,"searchVal":this.testSearchBar};
    this.TestService.testSearch(this.sendData).subscribe((res: any) => {
      let response = decryptData(res);
      if(response.status == true)
      {
        this.landData = response.data;
      }
    });
  }

  onFileChange(event: any, type: string) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      this.encodeFileBase64(file, type);
    }
  }

  encodeFileBase64(file: File, type: string) {
    const reader = new FileReader();
    reader.onload = () => {
      if(type == 'testImage')
      {
        this.testImageBase64Data = reader.result as string;
        this.testImageFileSize = file.size,
        this.testImageFileType = file.type.split("/")
        if((this.testImageFileType[0] != 'image') || (this.testImageFileSize > 204800))
        {
          this.invalidTestImage = 1;
        }else{
          this.invalidTestImage = 0;
        }
      }else if(type == 'questionPaper')
      {
        this.questionPaperBase64Data = reader.result as string;
        this.questionPaperFileSize = file.size,
        this.questionPaperFileType = file.type.split("/")
        if((this.questionPaperFileType[0] != 'application') || (this.questionPaperFileType[1] != 'pdf') || (this.questionPaperFileSize > 512000))
        {
          this.invalidQuestionPaper = 1;
        }else{
          this.invalidQuestionPaper = 0;
        }
      }else if(type == 'answerKey')
      {
        this.answerKeyBase64Data = reader.result as string;
        this.answerKeyFileSize = file.size,
        this.answerKeyFileType = file.type.split("/")
        if((this.answerKeyFileType[0] != 'application') || (this.answerKeyFileType[1] != 'pdf') || (this.answerKeyFileSize > 512000))
        {
          this.invalidAnswerKey = 1;
        }else{
          this.invalidAnswerKey = 0;
        }
      }

    };
    reader.readAsDataURL(file);
  }
  editTestForm = new FormGroup({
    testId: new FormControl('',[Validators.required,Validators.pattern(/^[0-9]*$/)]),
    testName: new FormControl( '',[Validators.required,Validators.pattern(/^[a-zA-Z0-9][a-zA-Z0-9\s]*$/)]),
    testImage: new FormControl( ''),
    testDescription: new FormControl( '',[Validators.required,Validators.pattern(/^[a-zA-Z0-9][a-zA-Z0-9\s]*$/)]),
    duration: new FormControl( '',[Validators.required,Validators.pattern(/^[0-9]*$/)]),
    testDate: new FormControl( '',[Validators.required]),
    courseName: new FormControl( '',[Validators.required,Validators.pattern(/^[a-zA-Z0-9][a-zA-Z0-9\s]*$/)] ),
    totalMarks: new FormControl('',[Validators.required,Validators.pattern(/^[0-9]*$/)]),
    passingMarks: new FormControl('',[Validators.required,Validators.pattern(/^[0-9]*$/)]),
    questionPaper: new FormControl(''),
    answerKey: new FormControl(''),
  });
  addTestForm = new FormGroup({
    testName: new FormControl( '',[Validators.required,Validators.pattern(/^[a-zA-Z0-9][a-zA-Z0-9\s]*$/)]),
    testImage: new FormControl( '',[Validators.required]),
    testDescription: new FormControl( '',[Validators.required,Validators.pattern(/^[a-zA-Z0-9][a-zA-Z0-9\s]*$/)]),
    duration: new FormControl( '',[Validators.required,Validators.pattern(/^[0-9]*$/)]),
    testDate: new FormControl( '',[Validators.required]),
    courseName: new FormControl( '',[Validators.required,Validators.pattern(/^[a-zA-Z0-9][a-zA-Z0-9\s]*$/)] ),
    totalMarks: new FormControl('',[Validators.required,Validators.pattern(/^[0-9]*$/)]),
    passingMarks: new FormControl('',[Validators.required,Validators.pattern(/^[0-9]*$/)]),
    questionPaper: new FormControl('',[Validators.required]),
    answerKey: new FormControl('',[Validators.required]),
  });

onSubmitAddTest()
{
  if(localStorage.getItem('token')){
    this.user = {token:localStorage.getItem('token'),questionPaper:this.questionPaperBase64Data,answerKey:this.answerKeyBase64Data,testImage: this.testImageBase64Data,addForm:this.addTestForm.value};
    this.TestService.saveAddTestData(this.user).subscribe((res: any) => {
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

getDeleteData(id: any,encString: any)
{
  this.deleteId = id;
  this.deleteEncString = encString;
}
getEditData(id: any,encString: any)
{
  this.token = localStorage.getItem('token');
  if(id != null && encString != null && this.token != null)
  {
    this.sendData = {"token":this.token,"editId":id,"editEncString":encString};
    this.TestService.getEditTestData(this.sendData).subscribe((res: any) => {
      let response = decryptData(res);
      if(response.status == true)
      {
        this.editTestData = response.data;
        this.editTestForm.setValue({
          testId:this.editTestData.id,
          testName:this.editTestData.testName,
          testImage:null,
          testDescription:this.editTestData.testDescription,
          duration:this.editTestData.duration,
          testDate:this.editTestData.testDate,
          courseName:this.editTestData.courseId,
          totalMarks:this.editTestData.totalMarks,
          passingMarks:this.editTestData.passingMarks,
          questionPaper:null,
          answerKey:null,
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


onSubmitEditTest()
{
  if(localStorage.getItem('token')){
    this.user = {token:localStorage.getItem('token'),questionPaper:this.questionPaperBase64Data,answerKey:this.answerKeyBase64Data,testImage: this.testImageBase64Data,editForm:this.editTestForm.value};
    this.TestService.saveEditTestData(this.user).subscribe((res: any) => {
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

deleteTest(isValid:any)
{
  if(isValid && this.deleteEncString != localStorage.getItem('token'))
  {
    this.sendData = {"token":this.token,"deleteId":this.deleteId,"deleteEncString":this.deleteEncString};
    this.TestService.deleteTestData(this.sendData).subscribe((res: any) => {
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
    this.toastr.error('Can`t Delete Admin You Are Logged In From!', 'Error', {
      positionClass: 'errorMessageClass'
   });
  }
}
  sort(colName: string | number,boolean: boolean) {
    if (boolean == true){
      this.landData.sort((a: { [x: string]: number; }, b: { [x: string]: number; }) => a[colName] > b[colName] ? 1 : a[colName] < b[colName] ? -1 : 0);
      this.booleanValue = !this.booleanValue;
    }else{
      this.landData.sort((a: { [x: string]: number; }, b: { [x: string]: number; }) => a[colName] < b[colName] ? 1 : a[colName] > b[colName] ? -1 : 0);
      this.booleanValue = !this.booleanValue;
    }
}

  sideBarToggleEvent(event:any)
  {
    this.sideBarToggleVar = !this.sideBarToggleVar;
  }
}
