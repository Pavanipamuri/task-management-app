const API =
"http://localhost:5000/api/tasks";


const token =
localStorage.getItem("token");


if(!token){

    window.location.href="login.html";

}



const taskForm =
document.getElementById("taskForm");


const taskList =
document.getElementById("taskList");





async function getTasks(){


    const response = await fetch(API,{

        headers:{
            "Authorization":
            `Bearer ${token}`
        }

    });


    const tasks =
    await response.json();


    displayTasks(tasks);

}







function displayTasks(tasks){


    taskList.innerHTML="";


    let completed=0;
    let pending=0;



    tasks.forEach(task=>{


        if(task.status==="Completed")
            completed++;

        else
            pending++;



        taskList.innerHTML += `


        <div class="task-card">


        <h4>${task.title}</h4>


        <p>
        ${task.description}
        </p>


        <p>
        Priority: ${task.priority}
        </p>


        <p>
        Status: ${task.status}
        </p>


        <button 
        class="btn btn-danger"
        onclick="deleteTask('${task._id}')">

        Delete

        </button>


        </div>


        `;


    });



    document.getElementById("totalTasks").innerHTML =
    tasks.length;


    document.getElementById("completedTasks").innerHTML =
    completed;


    document.getElementById("pendingTasks").innerHTML =
    pending;


}






taskForm.addEventListener("submit",async(e)=>{


e.preventDefault();



const task={


title:title.value,

description:description.value,

priority:priority.value,

status:status.value,

dueDate:dueDate.value


};



await fetch(API,{

method:"POST",

headers:{

"Content-Type":"application/json",

"Authorization":
`Bearer ${token}`

},

body:JSON.stringify(task)

});



taskForm.reset();


getTasks();


});








async function deleteTask(id){


await fetch(
`${API}/${id}`,
{

method:"DELETE",

headers:{
"Authorization":
`Bearer ${token}`
}

});


getTasks();


}








function logout(){


localStorage.clear();

window.location.href="login.html";


}



getTasks();
