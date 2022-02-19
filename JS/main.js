var signUPnameInput = document.getElementById("signUPname");
var signUPemailInput = document.getElementById("signUPemail");
var signUPpasswordInput = document.getElementById("signUPpassword");
var logINemailInput = document.getElementById("logINemail");
var logINpasswordInput = document.getElementById("logINpassword");
var signUPBtn = document.getElementById("signUPBtn");
var logINBtn = document.getElementById("logINBtn");
var mainPath = "";
console.log(location.pathname);
console.log("tttttttttttt");
var path = location.pathname.split('/');

for (var i = 0; i < path.length - 1; i++) {
   mainPath += '/' + path[i];
   console.log(mainPath);
}

var loggedinUserName = localStorage.getItem('UsernameList')

var Users = [];
var inputs = document.getElementsByClassName("form-control");

if (localStorage.getItem('UsersList') == null) {
   Users = []
} else {
   Users = JSON.parse(localStorage.getItem('UsersList'))
}

signUPBtn.onclick = function () {
   addUser();
   clearForm();
}


function checkEmailExistence() {
   for (var i = 0; i < Users.length; i++) {
      if (Users[i].email.toLowerCase() == signUPemailInput.value.toLowerCase()) {
         return false;
      }

   }
}
function requiredSignINInputs() {
   if (logINemailInput.value == "" || logINpasswordInput.value == "") {
      return false;
   }
   else {
      return true;
   }
}

function requiredSignUPInputs() {
   if (signUPnameInput.value == "" || signUPemailInput.value == "" || signUPpasswordInput.value == "") {
      return false;
   }
   else {
      return true;
   }
}
function addUser() {
   var userInfo =
   {
      name: signUPnameInput.value,
      email: signUPemailInput.value,
      password: signUPpasswordInput.value,
   }
   
   if (requiredSignUPInputs() == false) {
      document.getElementById("requiredSignUPInputs").classList.remove("d-none");
   }
   else {
      if (checkEmailExistence() == false) {
         document.getElementById("requiredSignUPInputs").classList.remove("d-none");
         document.getElementById("requiredSignUPInputs").innerHTML = "Email alreay exists!";
      }
      else {
         Users.push(userInfo);
         localStorage.setItem("UsersList", JSON.stringify(Users));
         document.getElementById("requiredSignUPInputs").classList.remove("d-none");
         document.getElementById("requiredSignUPInputs").classList.remove("alert-danger");
         document.getElementById("requiredSignUPInputs").classList.add("alert-success");
         document.getElementById("requiredSignUPInputs").innerHTML = "Success";
      }
   }
}


function loginUser() {

   if (requiredSignINInputs() == false) {
      document.getElementById("requiredSignINInputs").classList.remove("d-none");
   }
   else {
      for (var i = 0; i < Users.length; i++) {
         if (Users[i].email.toLowerCase() == logINemailInput.value.toLowerCase() && Users[i].password.toLowerCase() == logINpasswordInput.value.toLowerCase()) {
            localStorage.setItem('UsernameList', Users[i].name);

            if (mainPath == '/') {
               location.replace('https://' + location.hostname + '/home.html');
               document.getElementById('loggedinUserName').innerHTML = "Welcome " + loggedinUserName;///this is statement

            } else {
               location.replace(mainPath + '/home.html')

            }
         } else {

            document.getElementById("requiredSignINInputs").classList.remove("d-none");
            document.getElementById('requiredSignINInputs').innerHTML = "incorrect email or password";
         }
      }
   }
}

function logout() {
   localStorage.removeItem('UsernameList')
}

function clearForm() {
   for (var i = 0; i < inputs.length; i++) {
      inputs[i].value = "";
   }

}




