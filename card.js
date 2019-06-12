import { url } from './services.js';

class CardComponent extends HTMLElement {
    constructor (){
        super();
        const shadow = this.attachShadow({mode: 'open'});
       
        // Clone the template so that it can be attched to the shadowroot                     
        const template = document.createElement('template');
        template.innerHTML = `
            <h1>Web Component</h1>
            <p id="card-title">Example</p>
            <img id="gif-view"/>
        `;
        const templateInstance = template.content.cloneNode(true);
        shadow.appendChild(templateInstance);
    
    }

    render(shadowElem, data){
        const shadowRoot = shadowElem.shadowRoot;
        shadowRoot.getElementById('card-title').innerHTML = data.name;
        shadowRoot.getElementById('gif-view').src = data.url;
    }
    
    async fetchFromGiphy (){
      const res = await fetch(url);
      const json = await res.json();
      console.log(json);
      const gifUrl = json['data']['0'].images['fixed_height_small'].url;
      const gifName = json['data']['0'].title;
      const gifObject = {
         name: gifName,
         url: gifUrl
      }
      return gifObject;
    }

    async connectedCallback (){
        this.gifObj = await this.fetchFromGiphy();
        this.render(this, this.gifObj);
    }
}

customElements.define('card-component', CardComponent);