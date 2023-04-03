const respons = (statuscode,data,message,res)=>{
    res.status(statuscode).json({
        Payload: data,
        status_code: statuscode,
        message:message,
        
        pagination:{
            prev:"",
            next:"",
            max:""
        }
    })
}
module.exports = respons