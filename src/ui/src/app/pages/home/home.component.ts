import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    searchFilter!: String;
    isAsideOpen = false;
    isFileModalOpen = false;

    setSearch(search: String) {
        this.searchFilter = search
    }


    toggleIsAsideOpen = (): void => {
        this.isAsideOpen = !this.isAsideOpen;
    }

    seteModalOpen(value: boolean) {
        this.isFileModalOpen = value;
    }

    constructor() {
    }

    ngOnInit(): void {
    }
}

