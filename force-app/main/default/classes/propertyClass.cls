public with sharing class propertyClass {
    
    @AuraEnabled(cacheable=true)
    public static List<mahesh_space__Property__c> getAllproperties(String searchKey, Decimal maxPrice, Integer minBedrooms, Integer minBathrooms){
        String key = '%' + searchKey + '%';



        List<mahesh_space__Property__c> allPropeties =[select Name,Id,mahesh_space__Address__c,mahesh_space__Price__c,mahesh_space__Baths__c,
                         mahesh_space__Beds__c,mahesh_space__Broker__c,mahesh_space__City__c,mahesh_space__Location__c,
                         mahesh_space__Picture_IMG__c,mahesh_space__Main_Thumbnail__c,mahesh_space__Picture__c,mahesh_space__Status__c
                         ,mahesh_space__Thumbnail__c,mahesh_space__Title__c,mahesh_space__State__c,mahesh_space__Description__c FROM mahesh_space__Property__c
                      WHERE (mahesh_space__Title__c LIKE :key OR mahesh_space__City__c LIKE :key OR Name LIKE :key)
					  AND mahesh_space__Price__c <= :maxPrice
                      AND mahesh_space__Beds__c >= :minBedrooms
                      AND mahesh_space__Baths__c >= :minBathrooms
                      ORDER BY mahesh_space__Price__c LIMIT 100];
         

     return allPropeties;
    }
}
