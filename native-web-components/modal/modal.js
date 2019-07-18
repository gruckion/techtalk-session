class Modal extends HTMLElement {
    constructor () {
        super();
        this.attachShadow( { mode: "open" } );
        this.isOpen = false;
        this.shadowRoot.innerHTML = `
            <style>
                :host([open]) #backdrop {
                    opacity: 1;
                    pointer-events: all;
                }
                :host([open]) #modal {
                    opacity: 1;
                    pointer-events: all;
                }
                :host([open]) #modal {
                    top: 15vh;
                }
                #backdrop {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100vh;
                    background: rgba(0, 0, 0, 0.75);
                    z-index: 10;
                    opacity: 0;
                    pointer-events: none;
                }
                #modal {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    position: fixed;
                    top: 10vh;
                    left: 25%;
                    width: 50%;
                    z-index: 100;
                    background: white;
                    border-radius: 3px;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
                    opacity: 0;
                    pointer-events: none;
                    transition: all 0.3s ease-out;
                }
                #actions {
                    border-top: 1px solid #ccc;
                    padding: 1rem;
                    display: flex;
                    justify-content: flex-end;
                }
                header {
                    padding: 1rem;
                    border-bottom: 1px solid #ccc;
                }
                ::slotted(h1) {
                    font-size: 1.25rem;
                    margin: 0;
                }
                #actions button {
                    margin: 0 0.25rem;
                }
                #main {
                    padding: 1rem;
                }
            </style>
            <div id="backdrop"></div>
            <div id="modal">
                <header>
                    <slot name="title">Default Title</slot>
                </header>
                <section id="main">
                    <slot name="main"></slot>
                </section>
                <section id="actions">
                    <button id="cancel-btn">Cancel</button>
                    <button id="confirm-btn">Confirm</button>
                </section>
            </div>
        `;
        const slots = this.shadowRoot.querySelectorAll( "slot" );
        slots[ 1 ].addEventListener( "slotchange", event => {
            console.dir( slots[ 1 ].assignedNodes() );
        } );
        const cancelButton = this.shadowRoot.getElementById( "cancel-btn" );
        cancelButton.addEventListener("click", this._cancel.bind(this));

        const confirmButton = this.shadowRoot.getElementById( "confirm-btn" );
        confirmButton.addEventListener("click", this._confirm.bind(this));

        const backdrop = this.shadowRoot.getElementById( "backdrop" );
        backdrop.addEventListener("click", this._cancel.bind(this));
    }

    connectedCallback() {
        this._render();
    }

    disconnectedCallback() {

    }

    attributeChangedCallback( name, newValue, oldValue ) {
        if ( newValue === oldValue ) {
            return;
        }

        switch ( name ) {
            case "open":
                this.isOpen = this.hasAttribute( "open" );
                break;
            default:
                console.log( "name: ", name );
                break;
        }
    }

    static get observedAttributes() {
        return [];
    }

    _render() {
        //
    }

    open() {
        this.setAttribute( "open", "" );
        this.isOpen = true;
    }

    hide() {
        if ( this.hasAttribute( "open" ) ) {
            this.removeAttribute( "open" );
        }
        this.isOpen = false;
    }

    _cancel(event) {
        this.hide();
        const cancelEvent = new Event("cancel", { bubbles: false, composed: true });
        event.target.dispatchEvent(cancelEvent);
    }

    _confirm() {
        this.hide();
        const confirmEvent = new Event("confirm");
        this.dispatchEvent(confirmEvent);
    }
}
customElements.define( "sr-modal", Modal );