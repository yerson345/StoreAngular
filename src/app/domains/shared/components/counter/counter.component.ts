import { Component, Input, SimpleChanges, signal } from '@angular/core';
import { repeat } from 'rxjs';


@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css'
})

export class CounterComponent {
  // CICLO DE VIDA DE COMPONENTES
  @Input({required: true}) duration = 0;
  @Input({required: true}) message = '';

  counter = signal(0);
  couterRef: number | undefined;

  constructor() {
    // NO ASYNC
    // BEFORE RENDER
    // CORRE UNA VEZ
    console.log('constructor')
    console.log('-', repeat(5))
  }

  ngOnChanges(changes: SimpleChanges) {
    // BEFORE AND DURING RENDER
    console.log('ngOnChanges')
    console.log('-', repeat(5))
    console.log(changes)
    const duration = changes['duration']
    console.log(duration)
    if (duration && duration.currentValue !== duration.previousValue) {
      this.doSomething()
    }
  }

  ngOnInit() {
    // AFTER RENDER
    // CORRE UNA VEZ
    // ASYNC, PROMESA
    console.log('ngOnInit')
    console.log('-', repeat(5))
    console.log('Duration =>', this.duration)
    console.log('Message =>', this.message)

    this.couterRef = window.setInterval(() => {
      console.log('Run interval')
      this.counter.update(statePrev => statePrev + 1)
    }, 1000)
  }

  ngAfterViewInit() {
    // AFTER RENDER
    // HIJOS YA FUERON RENDERIZADOS
    console.log('ngAfterViewInit')
    console.log('-', repeat(5))
  }

  ngOnDestroy() {
    // REVISA CUANDO EL COMPONENTE SE DESTRUYE
    console.log('ngOnDestroy')
    console.log('-', repeat(5))
    window.clearInterval(this.couterRef)   
  }

  doSomething() {
    // ASYNC
    console.log('Change Duration')
  }

}
