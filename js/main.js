// -----------------------------------------------
// LOGIN FORM
// ------------------------------------------------
let frm = document.getElementById("form-login");
let username = document.getElementById("username");
let password = document.getElementById("password");
let btnLogin = document.getElementById("btn-login");


let validated = async () => {
    if(username.value == "Admin" && password.value == "Admin") {
        return true
    } else {
        if(username.value.length >= 1 && password.value.length >= 1){
            alert("Invalid Username or Password");
            return false;
        }
    }
}




// -----------------------------------------------
// PATIENT FORM
// ------------------------------------------------

let array_info = new Array();
let medRecord = new Array();
let currentSymp = new Array();

let gender = Array.from(document.getElementsByName("Gender"));
let medicalHistory = Array.from(document.getElementsByName("medRec"));
let curSymp = Array.from(document.querySelector("#symptoms"));
let takingMed = Array.from(document.getElementsByName("taking-medicine"));
let btnSubmit = document.getElementById("btn-submit");
let btnReset = document.getElementById("btn-reset");

let fname = document.getElementById("fname");
let mname = document.getElementById("mname");
let lname = document.getElementById("lname");
let address = document.getElementById("address");
let dob = document.getElementById("dob");
let contactNo = document.getElementById("contactNo");
let medText = document.getElementById("txt-medication");

let selectedGender = "";
let taking_med = "";
medText.style.visibility = "hidden";



    // if (!regContact.test(contactNo.value)) 
    //     // document.querySelector("#erContact").textContent = "Please enter a valid contact number";
    //     alert("Invalid Contact");
    // // else 
    // //     document.querySelector("#erContact").textContent = "";



//Medication toggle
takingMed.map((event) => {
    event.addEventListener("click", (e) => {
        if(e.target.value == "Yes") {
            medText.style.visibility = "visible";
        } else {
            medText.value = "";
            medText.style.visibility = "hidden";
        }
    });
});

//Saving information
btnSubmit.addEventListener("submit", (ev) => {
    ev.preventDefault();


    let gendr = document.querySelectorAll("input[name = 'Gender']:checked");
    selectedGender = [...gendr].map(val => val.value).join("");

    for (let x = 0; x < medicalHistory.length; x++) {
        if(medicalHistory[x].checked)
             medRecord.push(medicalHistory[x].value);
     }


     for (let p = 0; p < curSymp.length; p++) {
        if(curSymp[p].selected)
            currentSymp.push(curSymp[p].value);
    } 


    try {
        
        if(fname.value.length > 1 || lname.value.length > 1 || address.value.length > 1){
            let info = {
                id: Date.now(),
                firstName: fname.value,     
                middleName: mname.value,
                lastName: lname.value,
                address: address.value,
                dob: dob.value,
                gender: selectedGender,
                contactNum: contactNo.value,
                medicalHistory: medRecord,
                currentSymptoms: currentSymp,
                takingMedication: (medText.value.length > 0) ? medText.value : "No",
            };
    
            array_info.push(info);
            let toStoreData = JSON.stringify(array_info, null, 2);
            localStorage.setItem("patient-info", toStoreData);
            document.querySelector("#patient-form").reset();
            medText.style.visibility = "hidden";
        } 
    } catch (error) {
        throw ("Error: " + error);
    }
});

//Clearing Form
btnReset.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector("#patient-form").reset();
});


