import { Component, OnInit } from '@angular/core';
import { FileuploadService } from './fileupload.service';
import { Store, select } from '@ngrx/store';
import {
  LoaderType,
  LoaderThemeColor,
  LoaderSize,
} from "@progress/kendo-angular-indicators";
import { updateStatus } from '../State/student.actions';

@Component({
  selector: 'app-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.component.css']
})
export class FileuploadComponent implements OnInit {
  public buttonenable = true
  public message = ""
  public updatestatus$ = 0;

  constructor(private fileuploadService: FileuploadService, private store: Store<{ student: number }>) {
    store.pipe(select('student')).subscribe((value) => {
      console.log("value", value["updatestatus"])
      this.updatestatus$ = value["updatestatus"]
    })
  }


  public loader =   {
      type: <LoaderType>"infinite-spinner",
      themeColor: <LoaderThemeColor>"tertiary",
      size: <LoaderSize>"medium",
    }




  ngOnInit(): void {

  }

  async onClick(): Promise<any> {
    console.log("file upload called")
    this.store.dispatch(updateStatus({value:2}))
    this.fileuploadService.readFile()
    this.buttonenable = false
    this.message = "File is processing.You can shift to other pages while process is running"
  }


}
