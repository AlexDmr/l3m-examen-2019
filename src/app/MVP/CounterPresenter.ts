import {CounterService} from '../counter.service';
import {toUINT, UINT} from '../data/definitions';

const CS = new CounterService();

const view = `
  <button class="start">Start</button>
  <button class="pause">Pause</button>
  Compteur binaire = <label></label>
`;
export class CounterPresenter {
  constructor(private root: HTMLElement, private cs: CounterService) {
    root.innerHTML = view;
    const btStart = document.querySelector('button.start') as HTMLButtonElement;
    const btPause = document.querySelector('button.pause') as HTMLButtonElement;
    btStart.onclick = () => cs.start();
    btPause.onclick = () => cs.pause();
    const label = document.querySelector('label') as HTMLLabelElement;
    cs.valueObs.subscribe(
      v => label.textContent = toUINT(v, 8).bits.map( b => b ? '1' : '0').join('')
    );
  }
}

const section = document.querySelector('#MVP') as HTMLElement;

const P = new CounterPresenter(section, CS);

declare function getDecomposition(n: number): Promise<number[]>;
declare function getImage(uint: UINT): Promise<ImageData>;
declare function getDocument(images: ImageData[]): Promise<ImageData>;
