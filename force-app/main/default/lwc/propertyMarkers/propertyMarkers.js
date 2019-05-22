import { LightningElement,api } from 'lwc';

export default class PropertyMarkers extends LightningElement {
    @api property;
    connectedCallback(){
       /*this.marker=[
        {
            location: {
                Street:this.property.mahesh_space__Address__c,
                City: this.property.mahesh_space__City__c,
                State: this.property.mahesh_space__State__c,
            },

            title:this.property.mahesh_space__Title__c,
            description:this.property.mahesh_space__Description__c,
        },
       ];*/

       const selectEvent = new CustomEvent('marker', {
        detail: this.property.Id
     });
    // 3. Fire the custom event
    this.dispatchEvent(selectEvent);
    }
}