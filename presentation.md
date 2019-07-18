<img src="https://www.webcomponents.org/assets/logo-192x192.png" width="200px" height="200px" />
<img src="https://pbs.twimg.com/profile_images/1135534552137510914/5ZzvOFFp_200x200.png"/>

# Web components 
## With Stencil

#### Stephen Rayner


<!-- .slide: data-transition="zoom" -->

---

## Web component specification

* The Custom Elements specification <!-- .element: class="fragment" -->
- The shadow DOM specification <!-- .element: class="fragment" -->
- The HTML Template / Slots <!-- .element: class="fragment" -->
- The ES Module specification <!-- .element: class="fragment" -->

Note:
- This allows you to register your own tags

- The shadow down allows you to scope your styles, stops them leaking into the "light" DOM

- Templates and Slots allow you to specify how dynamic should be placed within your component.

- The ES module specification is just how you actually import the web components
---

## Examples

```
<my-button text="Click me" />
```

```
this._tooltipText = this.getAttribute("text");
```


Note:
- Our tags must contain a dash, and the convention is to have some prefix that identifies your components.
- This is to stop them clashing with other peoples
- 
---

## Examples

``` 
<my-modal id="modal" open>
    <h1 slot="title">Title</h1>
    <p>Main body of text</p>
    <template id="some-template"> ... </template>
</my-modal>
```

```
<slot name="title">Default title</slot>
```
<!-- .element: class="fragment" -->

```
const template = document.getElementById("some-template");
this.shadowRoot.appendChild(template.content.cloneNode(true));
```
<!-- .element: class="fragment" -->

Note:
- Slot can have multiple slots just need to name them
- Template allow you to define content in the light DOM to then capture and display in the web component.

---

## Examples

``` 
<my-modal id="modal"> ... /my-modal>
```

```
const modal = document.getElementById("modal");
modal.open();

```
<!-- .element: class="fragment" -->

```
public open() {
    this.setAttribute( "open", "" );
    this.isOpen = true;
}
```
<!-- .element: class="fragment" -->

Note:
- We can define functions in our components and call them externally

---

## Why use Web Components

- Encapsulate logic and UI for re-use
- Portable across projects that use different frameworks <!-- .element: class="fragment" -->
- They're native no frameworks <!-- .element: class="fragment" -->
- Run time encapsulation with shadow DOM  <!-- .element: class="fragment" -->
- Ship as their own thing, even with API calls <!-- .element: class="fragment" -->

```
<stripe></stripe> 
``` 
<!-- .element: class="fragment" -->
```
const stripe = document.getElementById(...);
const transactions: Transaction[];
transactions = stripe.getTransation();
```
<!-- .element: class="fragment" -->

---

## Create new elements

```
class Tooltip extends HTMLElement {
    connectedCallback() {
        const tooltip = document.createElement("span");
        tooltip.textContent = "(?)";
        this.appendChild(tooltip);
    }
}
customElements.define(
    "my-tooltip",
    Tooltip);
```

Note:
- `connectedCallback` is a life cycle method and is called once the component is mounted.

---

## Extend existing elements

```
class ConfirmLink extends HTMLAnchorElement {
    connectedCallback() {
        this.addEventListener("click", event => {
            if (!confirm("Do you really want to leave?")) {
                event.preventDefault();
            }
        });
    }
    disconnectedCallback() { /* removeEventListener */ }
    
}

customElements.define(
    "my-confirm-link", ConfirmLink, { extends: "a" });
```

---

## Shadow DOM and styles

```
this.attachShadow({ mode: "open" });
```

```
this.shadowRoot.innerHTML = `
    <style>
        :host([open]) {
            // ...
        }
        ::slotted(h1) {
            // ...
        }
    </style>
    <span>(?)</span>
`;
```


---

## Dynamically changing attributes

```
attributeChangedCallback(
    name: string, oldValue: object, newValue: object)
```

```
static get observedAttributes() {
    return ["text"];
}
```

---

## Wasn't this a presentation on Stencil JS

- Stencil uses decorators
- Supports style sheets <!-- .element: class="fragment" -->
- Optionally publish with polyfils <!-- .element: class="fragment" -->
- Don't have to use shadow DOM <!-- .element: class="fragment" -->
- JSX no innerHtml <!-- .element: class="fragment" -->
- TypeScript out of box <!-- .element: class="fragment" -->
- Uses real Html Events <!-- .element: class="fragment" -->

---

## Creating a component in Stencil

```
class AmazingComponent extends HTMLElement { }
customElements.define("my-amazing-component", AmazingComponent)
```

```
@Component({
  tag: "sr-side-drawer",
  styleUrl: "./side-drawer.scss",
  shadow: true
})
export class AmazingComponent {}
```
<!-- .element: class="fragment" -->
---

## State, Props and Member functions

```
@State() showMenu: boolean = false;
```
```
@Prop({ reflectToAttr: true }) text: string;
```
<!-- .element: class="fragment" -->

```
const element = document.getElementById(...);
element.text = "Bob";
element.setAttribute("Bob");
```
<!-- .element: class="fragment" -->
```
@Method()
async open() {
    this.opened = true;
}
```
<!-- .element: class="fragment" -->

Note:
- We define state as normal class level member variables but add the @State() decorator
- Same with props, we can change this via setAttribute or by getting an instance of our class with getElementById() and then using .text

---

## Stencil has a render function

```
public render() {
    const text = "text";
    return [<div>{text}</div>, <div />];
}
```

---

## Web components in React?

<img src="https://i.imgur.com/5AyKWMM.png" />
https://custom-elements-everywhere.com/

---

## Conclusion?

- Stencil makes it easier to build web components
- Would be nicer if it works better with React  <!-- .element: class="fragment" -->
- It's a great tool for building self contained re-usable components.  <!-- .element: class="fragment" -->
- It isn't a framework so you still need other stuff for routing  <!-- .element: class="fragment" -->
---

## Learn more

- [Google](http://www.google.com)
---

## Learn more

- [learning-web-components-and-stenciljs](https://github.com/gruckion/learning-web-components-and-stenciljs)
- [StencilJS](https://stenciljs.com/)
