import { LightningElement, api, wire } from 'lwc';
import { getRecord ,getFieldValue  } from 'lightning/uiRecordApi';
import { CurrentPageReference } from 'lightning/navigation';
import { registerListener, unregisterAllListeners } from 'c/pubsub';
import NAME_FIELD from '@salesforce/schema/Property__c.Name';
import MAIN_THUMB_FIELD from '@salesforce/schema/Property__c.Thumbnail__c';
import BEDS_FIELD from '@salesforce/schema/Property__c.Beds__c';
import BATH_FIELD from '@salesforce/schema/Property__c.Baths__c';
import BROKER_FIELD from '@salesforce/schema/Property__c.Broker__c';
import ASKINGPRICE_FIELD from '@salesforce/schema/Property__c.Price__c';

export default class WireGetRecordDynamicContact extends LightningElement {
    @api recordId='a0W6F00000mCX2oUAG';

    @wire(CurrentPageReference) pageRef;
 selected_fields=[BEDS_FIELD,BATH_FIELD,BROKER_FIELD,ASKINGPRICE_FIELD];
    @wire(getRecord, { recordId: '$recordId', fields: [NAME_FIELD,MAIN_THUMB_FIELD,BEDS_FIELD,BATH_FIELD] })
    property;

    get name() {
        return getFieldValue(this.property.data, NAME_FIELD);
    }
    get mainThumb(){
      return getFieldValue(this.property.data, MAIN_THUMB_FIELD);
    }
    get beds(){
      return getFieldValue(this.property.data, BEDS_FIELD);
    }
    get bath(){
      return getFieldValue(this.property.data, BATH_FIELD);
    }
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
      this.recordId = property.Id;
  }

}