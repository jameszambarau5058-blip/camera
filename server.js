const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());

app.use(express.static("public"));

app.use("/uploads",
express.static(path.join(__dirname,"uploads"))
);


const storage = multer.diskStorage({

destination:(req,file,cb)=>{
    cb(null,"uploads/");
},

filename:(req,file,cb)=>{

    let name =
    Date.now()+"-"+file.originalname;

    cb(null,name);

}

});


const upload = multer({
storage:storage
});



// receive image

app.post("/upload",
upload.single("photo"),
(req,res)=>{


console.log(
"New picture:",
req.file.filename
);


res.json({

success:true,

image:
"/uploads/"+req.file.filename

});


});



// admin page

app.get("/admin",
(req,res)=>{

res.sendFile(
path.join(
__dirname,
"admin/dashboard.html"
)
);

});



const PORT =
process.env.PORT || 3000;


app.listen(PORT,()=>{

console.log(
"Server running on port "+PORT
);

});
