import { LightningElement, wire, track } from 'lwc';
import getProperties from '@salesforce/apex/propertyClass.getAllproperties';

export default class PropertyFinderMap extends LightningElement {

    searchKey = '';
    maxPrice = 9999999;
    minBedrooms = 0;
    minBathrooms = 0;
    @track mapMarkers=[];
     selectedproperty='';
     @track allProperties=[];
     error;
    @wire(getProperties, {
        searchKey: '$searchKey',
        maxPrice: '$maxPrice',
        minBedrooms: '$minBedrooms',
        minBathrooms: '$minBathrooms',
       
    })
    wiredProprty({ error, data }) {
        if (data) {
            //this.allProperties.push(data);
            this.allProperties = data;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.allProperties = undefined;
        }
    }
    handleMarker(event){
        const propertyId = event.detail;
        this.selectedproperty = this.allProperties.find(
            property => property.Id === propertyId
        );
          
   this.mapMarkers=this.mapMarkers.concat({
    location: {
        Street:this.selectedproperty.mahesh_space__Address__c,
        City: this.selectedproperty.mahesh_space__City__c,
        State: this.selectedproperty.mahesh_space__State__c,
    },

   title:this.selectedproperty.mahesh_space__Title__c,
    description:this.selectedproperty.mahesh_space__Description__c,
  });

  // eslint-disable-next-line no-console
  console.log('Map Markers==>'+this.mapMarkers);
    }
     /*mapMarkers = [
        { 
            location: {
                City: 'Washington',
                Country:'DC',
            },

            icon: 'custom:custom26',
            title: 'The White House',
        }
    ]*/
}