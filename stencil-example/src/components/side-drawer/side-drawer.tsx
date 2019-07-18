import { Component, h, Prop, State, Method } from "@stencil/core";

@Component({
  tag: "sr-side-drawer",
  styleUrl: "./side-drawer.scss",
  shadow: true
})
export class SideDrawer {

  constructor() {
    this._onCloseDrawer.bind(this);
  }

  @State() showContactInfo: boolean = false;
  @Prop({ reflectToAttr: true }) headertitle: string;
  @Prop({ reflectToAttr: true, mutable: true }) opened: boolean;

  @Method()
  async open() {
    this.opened = true;
  }

  private _onCloseDrawer = () => this.opened = false;

  private _onContentChange = (content: string) => {
    this.showContactInfo = (content === "contact");
  };

  public render() {
    let content = (<slot />);

    if (this.showContactInfo === true) {
      content = (
        <div id="contact-information">
          <h2>Contact Information</h2>
          <p>You can reach us via phone and email</p>
          <ul>
            <li>Phone: <a href="tel: 07501 999 999">07501 999 999</a></li>
            <li>Email: <a href="mailto: something@somethig.com">something@something.com</a></li>
          </ul>
        </div>
      );
    }

    return [
      <div class="backdrop" />,
      <aside class="side-drawer-aside">
        <header>
          <h1>{this.headertitle}</h1>
          <button onClick={this._onCloseDrawer}>X</button>
        </header>
        <section class="tabs">
          <button
            id="navigation-btn"
            class={!this.showContactInfo && "active"}
            onClick={this._onContentChange.bind(this, "navigation")}
          >
            Navigation
        </button>
          <button
            id="contact-btn"
            class={this.showContactInfo && "active"}
            onClick={this._onContentChange.bind(this, "contact")}
          >
            Contacts
        </button>
        </section>
        <main>
          {content}
        </main>
      </aside>
    ];
  }
}
