const { recordDataRequestSchema } = require('../schemas');


class RecordService{

    constructor({ db, services }) {
		this.db = db;
		this.services = services;
    }
    
    async getData(payload){
        
        try{

         const {error, data} = await recordDataRequestSchema.validate(payload);
         const {orderBy} = payload;
         const {skip, limit} = payload; 

         const filter = payload.filters ? payload.filters : [];

         const queryFilters = filter.map(filter => {

            return {

              [filter.column]:{
                  [`$${filter.constraint}`] : filter.value
              }

            };

         });
        
        // console.log(JSON.stringify({$and: [...queryFilters]}, null, 2));
        // console.log();

         const accidents = await this.db.accidents.find({

         $and: [...queryFilters]
        

         })
           .sort({[orderBy.column] : orderBy.order})
           .limit(limit)
           .skip(skip)
          ;

         // console.log(accidents);

          return {
            success : true,
            data :  {accidents}
          }

        }catch(error){
          console.log(error)

          return {
            success : false,
            error: { message: error.message },
          }

        }
      
    }


};

module.exports = RecordService;

