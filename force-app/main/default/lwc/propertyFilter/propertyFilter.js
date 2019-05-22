import { LightningElement ,track ,wire} from 'lwc';
import {fireEvent } from 'c/pubsub';
import { CurrentPageReference } from 'lightning/navigation';
const DELAY = 350;
export default class PropertyFilter extends LightningElement {

    @track sarchvalue ='';
    @track maxPrice=1200000;
    @track bedrooms=0;
    @track bathrooms=0;
    @wire(CurrentPageReference) pageRef;
   

    handleSearchKeyChange(event) {
        this.sarchvalue = event.target.value;
        this.fireChangeEvent();
    }

    handleMaxPriceChange(event) {
        this.maxPrice = event.detail.value;
        this.fireChangeEvent();
    }

    handleMinBedroomsChange(event) {
        this.bedrooms = event.detail.value;
        this.fireChangeEvent();
    }

    handleMinBathroomsChange(event) {
        this.bathrooms = event.detail.value;
        this.fireChangeEvent();
    }

    fireChangeEvent() {
        // Debouncing this method: Do not actually fire the event as long as this function is
        // being called within a delay of DELAY. This is to avoid a very large number of Apex
        // method calls in components listening to this event.
        window.clearTimeout(this.delayTimeout);
        // eslint-disable-next-line @lwc/lwc/no-async-operation
        this.delayTimeout = setTimeout(() => {
            const filters = {
                searchKey: this.sarchvalue,
                maxPrice: this.maxPrice,
                minBedrooms: this.bedrooms,
                minBathrooms: this.bathrooms
            };
            fireEvent(this.pageRef, 'dreamhouse__filterChange', filters);
        }, DELAY);
    }
}