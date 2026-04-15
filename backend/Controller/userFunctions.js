import expressAsyncHandler from 'express-async-handler'

let userData = [    
    {
    userID: "USR-1",
    firstName: "Ahmed",
    lastName: "Khan",
    contactNumber: "+92-300-1234567",
    city: "Karachi",
    address: "Apartment 4C, Al-Azam Square, Gulshan-e-Iqbal"
  },
  {
    userID: "USR-2",
    firstName: "Zainab",
    lastName: "Bibi",
    contactNumber: "+92-321-9876543",
    city: "Lahore",
    address: "House 12, Street 5, Phase 4, DHA"
  },
  {
    userID: "USR-3",
    firstName: "Hamza",
    lastName: "Ali",
    contactNumber: "+92-333-5551234",
    city: "Islamabad",
    address: "Flat 102, Sector F-11/2, Silver Oaks"
  },
  {
    userID: "USR-4",
    firstName: "Sana",
    lastName: "Malik",
    contactNumber: "+92-345-6667788",
    city: "Faisalabad",
    address: "P-142, Millat Road, near University of Agriculture"
  },
  {
    userID: "USR-5",
    firstName: "Bilal",
    lastName: "Sheikh",
    contactNumber: "+92-312-4443322",
    city: "Rawalpindi",
    address: "Plot 88, Satellite Town, Block B"
  },
  {
    userID: "USR-6",
    firstName: "Ayesha",
    lastName: "Siddiqui",
    contactNumber: "+92-301-2228899",
    city: "Multan",
    address: "Bosan Road, Gulgasht Colony, House 5-A"
  },
  {
    userID: "USR-7",
    firstName: "Umer",
    lastName: "Farooq",
    contactNumber: "+92-334-1110000",
    city: "Peshawar",
    address: "Hayatabad Phase 3, Street 9, Villa 21"
  },
  {
    userID: "USR-8",
    firstName: "Fatima",
    lastName: "Shah",
    contactNumber: "+92-322-7776655",
    city: "Quetta",
    address: "Jinnah Road, Opp. Serena Hotel, Suite 3"
  },
  {
    userID: "USR-9",
    firstName: "Mustafa",
    lastName: "Raza",
    contactNumber: "+92-300-4445566",
    city: "Sialkot",
    address: "Kashmir Road, Defense View, House 19"
  },
  {
    userID: "USR-10",
    firstName: "Mariam",
    lastName: "Iqbal",
    contactNumber: "+92-315-8889900",
    city: "Gujranwala",
    address: "DC Colony, Main Boulevard, Sector G"
  }
    
]


export const testUserApi = expressAsyncHandler(async(req,res)=>{
    res.json({
        "Stauts":"OK",
        "Msg":"Api working"
    })
})


export const searchById = expressAsyncHandler(async(req,res)=>{
        const id = (req.params.id);
        if(!id){
            res.status(100)
            throw new Error("ID feild missing")
        } 
        const result = userData.filter((user)=>user.userID===id);
        if(result.length === 0){
            res.status(200);
            throw new Error("No user found by ID "+id)
        }else{
            res.json({
                "Status":"OK",
                "Message":"User found",
                "User":result
            })
        }
})


export const addNewUser = expressAsyncHandler(async(req,res)=>{
        const {firstName,lastName,contactNumber,city,address} = req.body;
        if(!firstName||!lastName||!contactNumber||!city||!address){
            res.status(100)
            throw new Error("One of feild missing")
        }else{
            let lastID = userData.findLast((usr)=>usr.userID)
            let numericalPart = 0
            if(!lastID){
                numericalPart = 0
            }else{
                console.log("Type of lastID:", typeof lastID, "Value:", lastID);
                numericalPart = parseInt(lastID.userID.slice(4))
            }
            const id = `USR-${numericalPart+1}`
            const newData = 
                {
                    "userID":id,
                    "firstName":firstName,
                    "lastName":lastName,
                    "contactNumber":contactNumber,
                    "city":city,
                    "address":address
                }
            
            userData.push(newData);
            res.json({
                "Status":"OK",
                "Message":"User added",
                "User ID":id
            })
        }
})


export const updateUserCityandAddress = expressAsyncHandler(async(req,res)=>{
    const {city,address} = req.body;
        if(!city||!address){
            res.json({
                "Status":"OK",
                "Message":"Missing update feilds"
            })
        }else{
            const id = req.params.id;
            const index = userData.findIndex((usr)=>usr.userID===id)
            if(index === -1){
                res.json({
                    "Status":"OK",
                    "Message":"User not found to update"
                })
            }else{
                const updateData = {
                    "city":city,
                    "address":address
                }
                const updated = userData.map((usr)=>usr.userID === id ?{...usr,...updateData}:usr)
                res.json({
                    "Status":"OK",
                    "Message":"User updated",
                    "Data":updated
                })
            }
        }
})