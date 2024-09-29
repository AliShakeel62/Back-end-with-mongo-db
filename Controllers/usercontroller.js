//const UserModel = require("moongose/models/user_model");
const usermodel = require("../Model/Usermodel");

const Usercontroller = {
  Get: async (req, res) => {
    try {
      // Data ko retrieve karne ka kaam
      const result = await usermodel.find();
      res.send({
        isSuccessfull: true,
        data: result,
      });
    } catch (err) {
      // Error handling agar find operation mein koi issue aata hai
      res.status(500).send({
        isSuccessfull: false,
        data: null,
        error: err.message,
      });
    }
  },

  add: async (req, res) => {
    try {
      // Insert karne ka code 
      const body = req.body; // Body ko correctly access karna

      const obj = {
        firstname: body.firstname,
        lastname: body.lastname,
        email:body.email,
        password:body.password
      };
let existinguser = await usermodel.findOne({
  email:body.email,
})
if(existinguser){
  res.status(409).send({
    isSuccessful:false,
    data:null,
    message:"User already exists with this email"
  })
  return ;
}
      const UserObj = new usermodel(obj); // Model ka naya instance banana

      // Data ko save karna
      await UserObj.save()
        .then((result) => {
          // Send response if save is successful
          res.status(201).send({
            isSuccessfull: true,
            data: result,
            message: "User added successfully",
          });
        })
        .catch((err) => {
          // Error handling if save fails
          res.status(400).send({
            isSuccessfull: false,
            data: null,
            error: err,
            message: "Internal Server Error",
          });
        });
    } catch (err) {
      // Error handling agar save operation mein koi issue aata hai
      res.status(500).send({
        isSuccessfull: false,
        data: null,
        error: err.message,
        message: "Internal Server Error",
      });
    }
  },

  Put: async (req, res) => {
    try {
      // Insert karne ka code 
      const body = req.body; // Body ko correctly access karna

      const obj = {
        age: body.age,
        firstname: body.firstname,
        lastname: body.lastname,
      };

      const UserObj = new usermodel(obj); // Model ka naya instance banana

      // Data ko save karna
      await UserObj.save()
        .then((result) => {
          // Send response if save is successful
          res.status(201).send({
            isSuccessfull: true,
            data: result,
          });
        })
        .catch((err) => {
          // Error handling if save fails
          res.status(400).send({
            isSuccessfull: false,
            data: null,
            error: err,
          });
        });
    } catch (err) {
      // Error handling agar save operation mein koi issue aata hai
      res.status(500).send({
        isSuccessfull: false,
        data: null,
        error: err.message,
      });
    }
  },
  getbyid:async (req,res)=>{
 try{
  const id = req.params.id;
  const result = await usermodel.findById(id)
res.status(200).send({
  isSuccessful:true,
  data:result,
  message:"data os id sccesssful come"
})  
 } catch(error){
  res.status(500).send({
    isSuccessful:false,
  data:null,
  message:`data not found ${error}`
  }
    
  )
}
},


update:async (req,res)=>{
  try{
    let id = req.params.id ; 
    let obj = {
      ...req.body,
      update_at : new Date(),
    }
    
    usermodel.findByIdAndUpdate(id , obj , {new : true}).then((result)=>{
      res.status(200).send({
        isSuccessfull:true,
        data:result,
        message: "User updated successfully",
      })
    }).catch((err)=>{
throw err ;
    })
    
  }catch (error) {
    res.status(200).send({
      isSuccessfull:true,
      data:error,
      message: "Internal Server Error",
      error : errror.message ,
    })
  }
},

del : async (req,res)=>{
  try{
    let id = req.params.id ;
    usermodel.findByIdAndDelete(id).then((result)=>{
     res.status(200).send({
       isSuccessfull:true,
       data:null,
       message:"data delet successfully"
     })
    }).catch((error)=>{
     res.status(500).send({
       isSuccessfull:false,
       data:null,
       message:"Internal error",
       err:error,
     })
    })
  }catch(error){
    res.status(500).send({
      isSuccessfull: false,
      data: error,
      message: "Internal Server Error",
      error: error.message,
  });
  }
}

  }
module.exports = Usercontroller;
