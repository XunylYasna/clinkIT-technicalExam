import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { delay } from 'rxjs';
import { PostFileRequest } from 'src/api/models';
import { FileService } from 'src/api/services';

@Component({
  selector: 'app-file-upload-modal',
  templateUrl: './file-upload-modal.component.html',
  styleUrls: ['./file-upload-modal.component.scss']
})
export class FileUploadModalComponent implements OnInit {

  @Input() isFileModalOpen = false;

  @Output() setModalOpenEvent = new EventEmitter<boolean>();

  setModalOpen() {
    this.setModalOpenEvent.emit(false)
  }

  constructor(private fileService: FileService, private formBuilder: FormBuilder) { }

  fileForm = this.formBuilder.group({
    queryName: '',
    fileSource: '',
    file: '',
  })

  fileString = '';
  queryName = ''

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0]
      this.fileForm.patchValue({
        fileSource: file
      })
    }
  }

  async onSubmit(): Promise<void> {
    // Process file post data
    let myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.fileString = myReader.result as string;
      this.queryName = this.fileForm.value.queryName
      // Post to Server
      let postRequest: PostFileRequest = {
        Name: this.queryName,
        Contents: this.fileString
      };
      this.fileService.apiFilesPost({ request: postRequest }
      ).pipe(delay(1000))
        .subscribe({
          next: (response) => {
            console.log(response)
          },
          error: (response) => {
            console.log(response)
          },
          complete: () => {
          }
        });
    };

    myReader.readAsText(this.fileForm.value.fileSource)
  }

  ngOnInit(): void {
  }

}
