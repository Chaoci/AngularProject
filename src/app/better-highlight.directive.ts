import { Directive, ElementRef, HostBinding, HostListener, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit{
  @Input() defaultColor:string = 'gray';

  //HostBinding可以直接用this.backgroundColor來進行調整 
  @HostBinding('style.backgroundColor') backgroundColor:string;


  constructor(private renderer: Renderer2,private elRef: ElementRef) { }
  ngOnInit(): void {
    // this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'blue');
    this.backgroundColor = this.defaultColor;
  }
  //利用HostListenr來製作屬性指令 並且設定滑鼠進出特效
  @HostListener('mouseenter') mouseover(eventData:Event){
    // this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'gray');
    this.backgroundColor = this.defaultColor;
  }
  @HostListener('mouseleave') mouseleave(eventData:Event){
    // this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'yellow');
    this.backgroundColor = 'yellow'
  }
}
