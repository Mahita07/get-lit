let globalTaskData = [];
const addcard = ()=> {
  const newTaskDetails = {   //object to hold details of card created by user
      id:`${Date.now()}`,   //primary key is the date on which the task is created because no tasks can be created on the same day
      url:document.getElementById("imageURL").value,
      title:document.getElementById("TaskTitle").value,
      author:document.getElementById("TaskAuthor").value,
      type:document.getElementById("TaskType").value,
      description:document.getElementById("TaskDescription").value,
      cardlink:document.getElementById("TaskLink").value
  };
  taskContents=document.getElementById("taskContentsrow");      //to make task contents appear
  taskContents.insertAdjacentHTML('beforeend' , createTaskCard(newTaskDetails));    //createTaskCard returns details ,used beforeeand to ensure that a fresh card is displayed after an older one
  //four properties are beforebegin beforeend afterbegin afteend
  globalTaskData.push(newTaskDetails);
  saveToLocalStorage();
}
  const createTaskCard = ({id, url, title, author, type, description,cardlink}) => //ES6 destructuring 
    `<div class="col-md-6 col-lg-4 mt-3" id=${id} key=${id} >
   <div class="card">
     <div class="card-header"> 
         <div class="card-header d-flex justify-content-end"><!--for showing the icons towards right and making it look aligned-->
          <button type="button" class="btn btn-outline-danger" name = ${id} onclick="deleteTask(this)"> 
             <i class="fa fa-trash" name = ${id} onclick="deleteTask(this)" aria-hidden="true"></i>
          </button>
         </div>
     </div>
     <div>
        <img src = ${url} class="card-img-top" alt="image"/>
     </div> 
     <div class="card-body">
       <h5 class="card-title">${title}</h5>
       <p class="card-author">${author}
       <p class="card-text">${description}</p>
       <span class="badge  badge-dark">${type}</span>
     </div>
     <div class="card-footer">
     <div class="card_footer_container">
     <a href="${cardlink}" class="link_for_button"> 
     <button id = "link-button"  class="btn btn-outline-info float-end">READ NOW</button>
     </a>
     <!--button class="btn btn-outline-primary btn_edit float-end">SAVE EDITS</button-->
     </div>
     </div>
 </div> 
</div>` 
const saveToLocalStorage = () => {
  console.log("hi")
  localStorage.setItem("tasky", JSON.stringify({tasks:globalTaskData}));  //JSON - Java Script Object Notation JSON.stringify - converts JSON to string format
  console.log(globalTaskData)
  console.log("bye")
}    

const retrieveTaskCard = () => {      //retrieves from local storage to the page  
  const localStorage1 = JSON.parse(localStorage.getItem("tasky"));   //JSON.parse converts from string to js object 
  console.log(localStorage1);
  if(localStorage1) {
    globalTaskData = localStorage1.tasks;
  }
  globalTaskData.map((cardData) => {
    taskContentsrow.insertAdjacentHTML('beforeend' , createTaskCard(cardData)); //each component of the array is mapped

  })
} 

const deleteTask =(e) => {
  console.log(e);  //current object ie the button 
  const targetID = e.getAttribute("name"); //in line 25 name holds the id , passes it to deleteTask() , name is the id of that particular task passed when the function is called , in line 25 name holds the id , passes it to deleteTask()
  console.log(targetID);
  globalTaskData = globalTaskData.filter((card) => card.id !== targetID);  // the id which matches with that of the task that has to be deleted is filtered rest of the data is stored in globalTaskData
  console.log(globalTaskData);
  saveToLocalStorage();
  window.location.reload(); //after reloading the deletion made is reflected
} 

