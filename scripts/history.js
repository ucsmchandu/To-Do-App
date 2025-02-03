//this function is for get the data from the local storage
//that means it carries the local storage
 export function getHistoryList() {
    return JSON.parse(localStorage.getItem("historyList")) || [];
  }

  //this function is update the local storage 
  //that means it manipulates the data
  //it takes takes new data through parameter and update that data into local storage
  export function updateHistoryList(newList) {
    localStorage.setItem("historyList", JSON.stringify(newList));
  }

  function displayHistory(){
    const historyList=getHistoryList(); //here we calls the function to get the data in local storage
    let listHistory="";
    const emptyMessage = document.getElementById("empty-message");
    if (historyList.length == 0) {
        if(emptyMessage)
        emptyMessage.innerHTML = `<div class="text-3xl text-gray-400 text-center">No History Available!</div>`;
    } else {
        if(emptyMessage)
        emptyMessage.innerHTML = ""; // Clear message when history exists
    }
    historyList.forEach((data,index)=>{
        listHistory+=`
        <div class="grid sm:grid-cols-3 grid-cols-1 gap-5 items-center p-5 bg-gray-800 rounded-2xl shadow-md border border-gray-600">
        <p class="text-2xl text-white break-words">Task : ${data.name}</p>
        <p class="text-2xl text-white break-words">Done : ${data.date}</p>
        <div class="flex justify-center space-x-15 sm:space-x-8 lg:space-x-5">
        <button class="cursor-pointer rounded-2xl transition " onclick="deleteHistory(${index});"><img class="h-15" src="photos/bin.png"/></button>
        </div>
        </div>
        `;
    });
    const tempData=document.getElementById("history-list");
    if(tempData){
        tempData.innerHTML=listHistory;
    }
}

window.deleteAll=function(){
    const decision=confirm("Clear History?");
    if( decision){
        updateHistoryList([]);
        displayHistory();
    }
};

window.deleteHistory=function(index){
    let historyList=getHistoryList(); //here again we call the function to get the data on local storage
    historyList.splice(index,1);
    updateHistoryList(historyList); //updates the deleted data on local storage
   displayHistory(); //then it calls the display function
};

displayHistory();//first displays the whats in the local storage
