import { LightningElement, wire } from 'lwc';
import getProperties from '@salesforce/apex/propertyClass.getAllproperties';
import {fireEvent } from 'c/pubsub';
import { CurrentPageReference } from 'lightning/navigation';
import { registerListener, unregisterAllListeners } from 'c/pubsub';
export default class PropertiesList extends LightningElement {
    searchKey = '';
    maxPrice = 9999999;
    minBedrooms = 0;
    minBathrooms = 0;
    @wire(CurrentPageReference) pageRef;
    @wire(getProperties, {
        searchKey: '$searchKey',
        maxPrice: '$maxPrice',
        minBedrooms: '$minBedrooms',
        minBathrooms: '$minBathrooms',
       
    })
     allProperties;

    handleselectedchild(event){
       
        fireEvent(this.pageRef, 'propertyselected', event.target.perporty);
    }
    connectedCallback() {
        registerListener(
            'dreamhouse__filterChange',
            this.handleFilterChange,
            this
        );
    }
  
    disconnectedCallback() {
        unregisterAllListeners(this);
    }
  
    handleFilterChange(filters) {
        this.searchKey = filters.searchKey;
        this.maxPrice = filters.maxPrice;
        this.minBedrooms = filters.minBedrooms;
        this.minBathrooms = filters.minBathrooms;
    }
  
}