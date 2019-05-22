import { LightningElement, api } from 'lwc';

export default class PropertyTile extends LightningElement {
    @api perporty;

    selected(event){

        event.preventDefault();
      this.dispatchEvent(new CustomEvent('childevent',{bubbles: true}));
    }
}