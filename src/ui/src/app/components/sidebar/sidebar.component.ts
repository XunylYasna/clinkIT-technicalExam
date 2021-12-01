import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { delay } from 'rxjs';
import { GetFilesResponse, GetFleetsRequest } from 'src/api/models';
import { FleetsService } from 'src/api/services';
import { FileService } from 'src/api/services';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @ViewChild('searchFilterField') searchInput!: ElementRef<HTMLInputElement>;
  @Output() setSearchFilterEvent = new EventEmitter<string>();
  @Input() isAsideOpen = true;
  @Output() setModalOpenEvent = new EventEmitter<boolean>();

  // UI functions
  setSearchFilter(event: any) {
    this.setSearchFilterEvent.emit(event.target.value)
  }

  setModalOpen() {
    this.setModalOpenEvent.emit(true)
  }

  // Fleets
  fleets: any = [];
  activeFleet: number | undefined = undefined;
  fleetsLoading: boolean = false;

  // Files
  files: any = [];
  activeFile: string | undefined = undefined;
  filesLoading: boolean = false;

  constructor(
    private fleetsService: FleetsService,
    private filesService: FileService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    // For UI Highlighting
    this.activatedRoute.queryParams.subscribe(params => {
      let fleetId = params['fleet'];
      let fileId = params['file'];
      if (fleetId) {
        this.activeFleet = parseInt(fleetId);
      }
      else if (fileId) {
        this.activeFile = fileId
      }
      else {
        this.activeFile = undefined
        this.activeFleet = undefined
      }
    });

    // Getting List of Fleets
    let requestFleet: GetFleetsRequest = {};
    this.fleetsLoading = true;
    this.fleetsService.apiFleetsGet$Json({ request: requestFleet })
      .pipe(delay(1000))
      .subscribe({
        next: (response) => {
          if (response.fleets == null) return;

          this.fleets = response.fleets;
        },
        error: (response) => {
          this.fleetsLoading = false;
        },
        complete: () => {
          this.fleetsLoading = false;
        }
      });
    // Getting List of Files
    let requestFiles: GetFilesResponse = {};
    this.filesLoading = true;
    this.filesService.apiFilesGet$Json({ request: requestFiles })
      .pipe(delay(1000))
      .subscribe({
        next: (response) => {
          if (response.files == null) return;
          this.files = response.files;
        },
        error: (response) => {
          this.filesLoading = false;
        },
        complete: () => {
          this.filesLoading = false;
        }
      });

  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown($event: KeyboardEvent): void {
    if ($event.getModifierState && $event.getModifierState('Control') && $event.keyCode === 70) {
      $event.preventDefault();
      this.searchInput.nativeElement.focus();
    }
  }
}
