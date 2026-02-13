import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appBackGroundColor]',
  standalone: true
})
export class BackGroundColorDirective implements OnInit {


  @Input('appBackGroundColor') temperature : number = 0;
  constructor(private el: ElementRef) { }
  ngOnInit(): void {
    this.setBackgroundColor();
  }

  private setBackgroundColor() {
    if (this.temperature < 20) {
      this.el.nativeElement.style.backgroundColor = 'lightblue';
    }
    else if (this.temperature >= 20 && this.temperature <= 30) {
      this.el.nativeElement.style.backgroundColor = 'lightgreen';
    }
    else {
      this.el.nativeElement.style.backgroundColor = 'lightcoral';
    }
  }
}
