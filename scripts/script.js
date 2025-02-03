//we exporting the two functions from the history.js 
import { getHistoryList, updateHistoryList } from './history.js';
//this is for nav bar
const navToggle = document.getElementById("three-lines");
const mobileMenu = document.getElementById("mobile");

if (navToggle && mobileMenu) {
  navToggle.addEventListener("click", function () {
    mobileMenu.classList.toggle("hidden");
  });
}


//for history array
export let historyList=JSON.parse(localStorage.getItem("historyList")) || [];
if(historyList===null)[
  {
  //   name:chandu,
  //   date:1000
  }
];
 
//initialize the data which has to be using
let activityArray = JSON.parse(localStorage.getItem("activityArray")); //retriving the data which is stored
if (activityArray === null) {
  //checking the local storage if it is null then we are asigning the value
  activityArray = [
    // {
    //   name: "chandu",
    //   date: 1000,
    // },
    // {
    //   name: "sai",
    //   date: 2000,
    // },
    // {
    //   name: "mahesh",
    //   date: 3000,
    // },
  ];
}

//function to display the data on the page
//when we click  the add button then the operation should be work
function displayData() {
  let addWork = "";
  activityArray.forEach((data, index) => {
    addWork+= `
          <div class=" grid sm:grid-cols-3 grid-cols-1 gap-5 items-center p-5 bg-gray-800 rounded-lg shadow-md border border-gray-600">
           <p class="text-2xl text-white break-words edit-${index}">Task : ${data.name}</p>
         <p class=" text-2xl  text-white editDate-${index}">Due : ${data.date}</p>
         <div class="flex justify-center space-x-15 sm:space-x-8 lg:space-x- editButton-${index}">
          <button class="  cursor-pointer  " onclick="window.deleteData(${index});"><img class="h-15" src="photos/done1.png"/></button>
          <button class="   cursor-pointer  " onclick="window.todoEdit(${index});"><img class="h-15" src="photos/edit.png"/></button>
        </div>
          </div>
     `;
  });
  const todoList=document.getElementById("todo-list");
 if(todoList){
  todoList.innerHTML=addWork;
}
}
 
window.deleteData=function(index) {
  //deletedData gets the deleted task from the splice
  const deletedData = activityArray.splice(index, 1)[0]; //delete the task from the home page
  localStorage.setItem("activityArray", JSON.stringify(activityArray)); //then we are updates the original array which displays the data on home page
  displayData();//then displays the data on home page
  const currentHistory = getHistoryList(); //here we are getting the data from the local storage (array)
  currentHistory.push(deletedData); //in that array we are inserting a task which is deleted 
  updateHistoryList(currentHistory); //then we are updates the data on local storage
}

 window.todoEdit=function(index){
  const textData = document.querySelector(`.edit-${index}`);
  const dateData=document.querySelector(`.editDate-${index}`);
  const changeBtn=document.querySelector(`.editButton-${index}`);
  textData.innerHTML = `<input class="p-2 bg-gray-700 text-white border border-gray-600 rounded-md outline-none focus:ring-2 focus:ring-orange-500 w-full" type="text" id="edit-Text-${index}" value="${activityArray[index].name}"/>`;
  dateData.innerHTML = `<input class="p-2 bg-gray-700 text-white border border-gray-600 rounded-md outline-none focus:ring-2 focus:ring-orange-500 w-full" type="date" id="edit-Date-${index}" value="${activityArray[index].date}"/>`;
  changeBtn.innerHTML = `
     <button class="  cursor-pointer " onclick="window.saveEdit(${index});"><img class="h-15" src="photos/checkmark.png"/></button>
     <button class="  cursor-pointer " onclick="window.cancelEdit(${index});"><img class="h-15" src="photos/letter-x.png"/></button>
  `;
}

window.saveEdit=function (index){
  const textValue=document.getElementById(`edit-Text-${index}`).value;
  const dateValue=document.getElementById(`edit-Date-${index}`).value;
  if(textValue.trim()===""||dateValue.trim()===""){
    alert("Enter valid data");
    return;
  }
  activityArray[index].name=textValue;
  activityArray[index].date=dateValue;
  localStorage.setItem("activityArray",JSON.stringify(activityArray));
  displayData();
}

window.cancelEdit=function (index){
  displayData();
}

window.addList=function () {
  const Data = document.querySelector(".text-btn");
  const Date = document.querySelector(".date-btn");
  if (Data.value === "" || !Date.value) {
    alert("Enter Valid Data");
  } else {
    activityArray.push({
      name: Data.value,
      date: Date.value
    });
    localStorage.setItem("activityArray", JSON.stringify(activityArray));
    Data.value = "";
    Date.value = null;
    displayData();
  }
}
window.addDataByEnter=function (event) {
  if (event.key === "Enter") {
   window.addList();
  }
}
displayData();
