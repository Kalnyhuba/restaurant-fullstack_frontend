import { HomeService } from './home.service';
import { Component, ElementRef, OnInit, ViewEncapsulation } from "@angular/core";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

    constructor(private homeService: HomeService) {    }

    ngOnInit(): void {
        this.homeService.onLoadingState.subscribe(value => {
            this.changeLoadingState(value.isLoading, value.elements.button, value.elements.spinner, value.elements.buttonText);
        });
    }

    changeLoadingState(isLoading: boolean, button: ElementRef, spinner: ElementRef, buttonText: ElementRef) {
        if (isLoading) {
            button.nativeElement.disabled = true;
            spinner.nativeElement.classList.remove("hidden");
            buttonText.nativeElement.classList.add("hidden");
        } else {
            button.nativeElement.disabled = false;
            spinner.nativeElement.classList.add("hidden");
            buttonText.nativeElement.classList.remove("hidden");
        }
    }
}