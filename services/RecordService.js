

class RecordService{

    constructor({ db, services }) {
		this.db = db;
		this.services = services;
    }
    
    async getData(payload){

        try{
          
          
          const accidents = await this.db.accidents.find({}).limit(payload.limit);
          console.log(accidents);
          
        }catch(error){
          console.log(error)
        }

    }


};

module.exports = RecordService;

