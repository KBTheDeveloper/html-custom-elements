export class Progress extends HTMLElement {
  constructor() {
    super();

    // get config from attributes
    this.stroke = this.getAttribute('stroke');
    this.color = this.getAttribute('color');
    this.text = this.getAttribute('text');

    // create shadow dom root
    this._root = this.attachShadow({mode: 'open'});
  }

  static get observedAttributes() {
    return ['progress'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'progress') {
      this.setProgress(newValue);
    }
  }

}

export class ProgressRing extends Progress {
  constructor() {
    super();
    const radius = this.getAttribute('radius');
    const normalizedRadius = radius - this.stroke * 2;
    this._circumference = normalizedRadius * 2 * Math.PI;
    this._root.innerHTML = `
    <div class="progress-ring">
        <svg
          height="${radius * 2}"
          width="${radius * 2}">
           <circle
             stroke="${this.color}"
             stroke-dasharray="${this._circumference} ${this._circumference}"
             style="stroke-dashoffset:${this._circumference}"
             stroke-width="${this.stroke}"
             fill="transparent"
             r="${normalizedRadius}"
             cx="${radius}"
             cy="${radius}"
          />
          <text x="50%" y="50%" text-anchor="middle" stroke="${this.color}" stroke-width="0" dy=".3em" style="color: ${this.color}">${this.text}</text>
          <circle
             id="circleBorderOuter"
             class="progress-ring__border"
             stroke="${this.color}"
             style="stroke-dashoffset:${normalizedRadius}"
             stroke-width="1"
             fill="transparent"
             r="${normalizedRadius + 2}"
             cx="${radius}"
             cy="${radius}"
          />
            <circle
             id="circleBorderInner"
             class="progress-ring__border"
             stroke="${this.color}"
             style="stroke-dashoffset:${normalizedRadius}"
             stroke-width="1"
             fill="transparent"
             r="${normalizedRadius - 2}"
             cx="${radius}"
             cy="${radius}"
          />
        </svg>
    </div>
    <style>
      circle {
        transition: stroke-dashoffset 0.35s;
        transform: rotate(-90deg);
        transform-origin: 50% 50%;
      }
    </style>
  `;
  }

  setProgress(percent) {
    const offset = this._circumference - (percent / 100 * this._circumference);
    const circle = this._root.querySelector('circle');
    circle.style.strokeDashoffset = String(offset);
  }
}

export class ProgressLine extends HTMLElement {
  constructor() {
    super();

    // get config from attributes

    // create shadow dom root
    this._root = this.attachShadow({mode: 'open'});
    this.stroke = this.getAttribute('stroke');
    this.color = this.getAttribute('color');
    this.percent = this.getAttribute('percent');
    this.text = this.getAttribute('text');
    this.progressWidth = this.getAttribute('width');
    this.height = this.getAttribute('height');
    this._root.innerHTML = `
    <div class="progress-line d-flex">
        <span class="progress-line__text">${this.text}</span>
        <div class="progress-line__track-wrapper">
            <div class="progress-line__track" style="width: ${this.percent}%"></div>
        </div>
    </div>
    <style>
      .progress-line {
        width: ${this.progressWidth};
      }
      .progress-line__text {
        color: ${this.color};
      }
      .progress-line__track-wrapper {
        border-radius: 5px;
        height: ${this.height};
        border: 1px solid ${this.color};
      }
      .progress-line__track {
        height: 100%;
        background: ${this.color};
      }

      circle {
        transition: stroke-dashoffset 0.35s;
        transform: rotate(-90deg);
        transform-origin: 50% 50%;
      }
    </style>
  `;
  }

  static get observedAttributes() {
    return ['progress'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'progress') {
      this.setProgress(newValue);
    }
  }

}
