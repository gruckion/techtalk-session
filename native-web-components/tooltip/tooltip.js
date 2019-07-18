// Custom elements are defined in javascript using the class keyword
// All  custom elements must extend the browsers built in HTMLElement class
class Tooltip extends HTMLElement {
    constructor() {
        super();
        this._tooltipVisible;
        this.tooltipIcon;
        this._tooltipText = "This is the default text if not set";
        this.attachShadow({ mode: "open" });

        // We no longer want to have our template outside of our component.
        // const template = document.querySelector("#tooltip-template");
        // // We can appendChild to the shadowRoot from the constructor but can not append to the main DOM until
        // // connectedCallback is called.
        // this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.shadowRoot.innerHTML = `
            <style>
                div {
                    background-color: black;
                    color: white;
                    position: absolute;
                    padding: 0.2rem;
                    z-index: 10;
                }
                .highlight {
                    background-color: red;
                }
                :host {
                    background-color: var(--primary-color);
                    position: relative;
                }
                :host(.red) {
                    background-color: rgb(221, 121, 96);
                }
                :host-context(p) {
                    font-weight: bold;
                }
                ::slotted(.highlight) {
                    border-bottom: 3px dotted red;
                }
                .icon {
                    background-color: rgb(166, 172, 168);
                    color: white;
                    padding: 0.15rem 0.5rem;
                    text-align: center;
                    border-radius: 50%;
                }
            </style>
            <slot>Default slot text</slot>
            <span class="icon">?</span>`;
    }

    connectedCallback() {
        if (this.hasAttribute("text")) {
            this._tooltipText = this.getAttribute("text");
        }
        this.tooltipIcon = this.shadowRoot.querySelector("span");
        this.tooltipIcon.addEventListener("mouseenter", this._showTooltiop.bind(this));
        this.tooltipIcon.addEventListener("mouseleave", this._hideTooltiop.bind(this));
        this._render();
    }

    disconnectedCallback() {
        this.tooltipIcon.removeEventListener("mouseenter", this._showTooltiop);
        this.tooltipIcon.removeEventListener("mouseleave", this._hideTooltiop);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) {
            return;
        }

        switch(name) {
            case "text":
                this._tooltipText = newValue;
                break;
        }
    }

    static get observedAttributes() {
        return ["text"];
    }

    _render() {
        let tooltipContainer = this.shadowRoot.querySelector("div");
        if (this._tooltipVisible === true) {
            tooltipContainer = document.createElement("div");
            tooltipContainer.textContent = this._tooltipText;
            this.shadowRoot.appendChild(tooltipContainer);
        } else {
            if (tooltipContainer) {
                this.shadowRoot.removeChild(tooltipContainer);
            }
        }

    }

    _showTooltiop() {
        this._tooltipVisible = true;
        this._render();
    }

    _hideTooltiop() {
        this._tooltipVisible = false;
        this._render();
    }
}

// To define our element we first give it a name and then specify the class it will render.
customElements.define("sr-tooltip", Tooltip);