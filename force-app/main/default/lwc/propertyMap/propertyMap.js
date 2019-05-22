import { LightningElement, api,wire } from 'lwc';
import { registerListener, unregisterAllListeners } from 'c/pubsub';
import { CurrentPageReference } from 'lightning/navigation';
export default class PropertyMap extends LightningElement {

    @wire(CurrentPageReference) pageRef;

   @api mapMarkers=[];
    connectedCallback() {
        registerListener(
            'propertyselected',
            this.handlePropertySelected,
            this
        );
    }
    disconnectedCallback() {
        unregisterAllListeners(this);
    }
    handlePropertySelected(property) {

        this.mapMarkers=[
            { 
                location: {
                    Street:property.mahesh_space__Address__c,
                    City: property.mahesh_space__City__c,
                    State: property.mahesh_space__State__c,
                },
    
                title: property.mahesh_space__Title__c,
                description:property.mahesh_space__Description__c,
            },
        ];
    }
}