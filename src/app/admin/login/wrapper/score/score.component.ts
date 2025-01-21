import { Component , OnInit } from '@angular/core';
import { ScoreService } from './score.service';
import { ToastrService } from 'ngx-toastr';
import { decryptData } from 'src/app/helper/cryptoEncryption';
import { FormGroup,FormControl,Validators } from '@angular/forms';

@Component({
  selector: 'score-wrapper',
  templateUrl: './score.component.html'
})
export class ScoreComponent {


    landData:any;
    sendData:any;
    token:any;
    deleteId:any;
    deleteEncString:any;
    editScoreData:any;
    user:any;
    scoreSearchBar: any;
    page:number = 1;
    sideBarToggleVar:boolean = true;
    testData: any;
    studentData: any;
    maxScoreObj:any;
    maxScore:any;
    score:any;
    percentage:any;
    grade:any;
    isReadonly:boolean = true;
    booleanValue: boolean = false;
    constructor(private ScoreService:ScoreService,private toastr: ToastrService){}

      ngOnInit(): void {
        this.token = localStorage.getItem('token');
        this.sendData = {"token":this.token};
        this.ScoreService.allStudentsScore(this.sendData).subscribe((res: any) => {
          let response = decryptData(res);
          if(response.status == true)
          {
            this.landData = response.data;
            this.testData = response.testData;
            this.studentData = response.studentData;
          }else{
            this.testData = response.testData;
            this.studentData = response.studentData;
            this.toastr.error(response.message ? response.message : 'Error', 'Error', {
              positionClass: 'errorMessageClass'
           });
          }
        });
      }
      editScoreForm = new FormGroup({
        scoreId: new FormControl('',[Validators.required,Validators.pattern(/^[0-9]*$/)]),
        studentName: new FormControl( '',[Validators.required,Validators.pattern(/^[a-zA-Z0-9][a-zA-Z0-9\s]*$/)]),
        testName: new FormControl( '',[Validators.required,Validators.pattern(/^[a-zA-Z0-9][a-zA-Z0-9\s]*$/)]),
        score: new FormControl('',[Validators.required,Validators.pattern(/^[0-9]*$/)]),
        maxScore: new FormControl('',[Validators.required,Validators.pattern(/^[0-9]*$/)]),
        percentage: new FormControl('',[Validators.required,Validators.pattern(/^\d+(\.\d{1,2})?$/)]),
        grade: new FormControl('',[Validators.required,Validators.pattern(/^[a-zA-Z0-9]*$/)]),
      });

      addScoreForm = new FormGroup({
        studentName: new FormControl( '',[Validators.required,Validators.pattern(/^[a-zA-Z0-9][a-zA-Z0-9\s]*$/)]),
        testName: new FormControl( '',[Validators.required,Validators.pattern(/^[a-zA-Z0-9][a-zA-Z0-9\s]*$/)]),
        score: new FormControl('',[Validators.required,Validators.pattern(/^[0-9]*$/)]),
        maxScore: new FormControl('',[Validators.required,Validators.pattern(/^[0-9]*$/)]),
        percentage: new FormControl('',[Validators.required,Validators.pattern(/^\d+(\.\d{1,2})?$/)]),
        grade: new FormControl('',[Validators.required,Validators.pattern(/^[a-zA-Z0-9]*$/)]),
      });
      getEditData(id: any,encString: any)
      {
        this.token = localStorage.getItem('token');
        if(id != null && encString != null && this.token != null)
        {
          this.sendData = {"token":this.token,"editId":id,"editEncString":encString};
          this.ScoreService.getEditScoreData(this.sendData).subscribe((res: any) => {
            let response = decryptData(res);
            if(response.status == true)
            {
              this.editScoreData = response.data;
              this.editScoreForm.setValue({
                scoreId: this.editScoreData.id,
                studentName: this.editScoreData.studentName,
                testName: this.editScoreData.testName,
                score: this.editScoreData.score,
                maxScore: this.editScoreData.maxScore,
                percentage: this.editScoreData.percentage,
                grade: this.editScoreData.grade,
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

      changeTest(event:any,type:any) {
        this.maxScoreObj = this.testData.filter((item: { id: any; }) => item.id == event.target.value);
        this.maxScore = this.maxScoreObj[0].totalMarks;
        if(type == 'edit'){
        this.editScoreForm.patchValue({
          maxScore: this.maxScore,
          score: null,
          percentage: null,
          grade: null,
        });
        }else{
          this.addScoreForm.patchValue({
            maxScore: this.maxScore,
            score: null,
            percentage: null,
            grade: null,
          });
          this.isReadonly = false;
        }
      }

      calculateData(event:any,type:any) {
        this.score = event.target.value;
        this.maxScore = type == 'edit' ? this.editScoreForm.value.maxScore : this.addScoreForm.value.maxScore;
        this.percentage = ((this.score / this.maxScore)* 100).toFixed(2);
        this.grade = this.percentage >= 90 ? 'A' : this.percentage >= 80 ? 'B' : this.percentage >= 70 ? 'C' : this.percentage >= 60 ? 'D' : this.percentage >= 50 ? 'E' : 'F';
        if(this.percentage <= 100){
          if(type == 'edit'){
          this.editScoreForm.patchValue({
            percentage: this.percentage,
            grade: this.grade,
          });
          }else{
            this.addScoreForm.patchValue({
              percentage: this.percentage,
              grade: this.grade,
            });
          }
        }else{
          if(type == 'edit'){
            this.editScoreForm.patchValue({
              percentage: null,
              grade: null,
            });
            }else{
              this.addScoreForm.patchValue({
                percentage: null,
                grade: null,
              });
            }
        }
      }

      onSubmitEditScore()
      {
        if(localStorage.getItem('token')){
          this.user = {token:localStorage.getItem('token'),editForm:this.editScoreForm.value};
          this.ScoreService.saveEditScoreData(this.user).subscribe((res: any) => {
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

      onSubmitAddScore()
      {
        if(localStorage.getItem('token')){
          this.user = {token:localStorage.getItem('token'),addForm:this.addScoreForm.value};
          this.ScoreService.saveAddScoreData(this.user).subscribe((res: any) => {
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

      deleteScore(isValid:any)
      {
        if(isValid && this.deleteEncString != localStorage.getItem('token'))
        {
          this.sendData = {"token":this.token,"deleteId":this.deleteId,"deleteEncString":this.deleteEncString};
          this.ScoreService.deleteScoreData(this.sendData).subscribe((res: any) => {
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
          this.toastr.error('Can`t Delete Score!', 'Error', {
            positionClass: 'errorMessageClass'
         });
        }
      }

      onSearchKeyUp(event: KeyboardEvent) {
        this.token = localStorage.getItem('token');
        this.sendData = {"token":this.token,"searchVal":this.scoreSearchBar};
        this.ScoreService.scoreSearch(this.sendData).subscribe((res: any) => {
          let response = decryptData(res);
          if(response.status == true)
          {
            this.landData = response.data;
          }
        });
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
