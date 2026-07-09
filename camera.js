const video =
document.getElementById("video");


navigator.mediaDevices
.getUserMedia({

video:true

})

.then(stream=>{

video.srcObject=stream;

})

.catch(err=>{

alert(
"Camera permission required"
);

});




function capture(){


const canvas =
document.getElementById("canvas");


canvas.width=400;

canvas.height=300;



const ctx =
canvas.getContext("2d");



ctx.drawImage(
video,
0,
0,
400,
300
);



canvas.toBlob(blob=>{


let form =
new FormData();



form.append(
"photo",
blob,
"capture.jpg"
);



fetch("/upload",{

method:"POST",

body:form


})


.then(response=>response.json())


.then(data=>{


alert(
"Picture sent successfully"
);


});


});


}