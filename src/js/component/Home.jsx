import React, {useEffect, useState} from "react";



const Home = () => {
	const apiUrl = "https://playground.4geeks.com/todo"
	const [task, setTask] = useState("");
	const [taskList, setTaskList] = useState([]);

	const createUser = async () =>{
		try{
			const response = await fetch(`${apiUrl}/users/Mitronios`, {
				method: "POST"
			})
			if(!response.ok){
				console.log("Error, try again", response.status)
				return;
			}
			const data = await response.json()
			console.log("Im getting this:", data)
		}
		catch(error){
			console.log(error)
		}
	}

	const getToDos = async () =>{
		try{
			const response = await fetch(apiUrl+"/users/Mitronios")
			if(!response.ok){
				console.log("No tasks", response.status)
				return;
			}
			const data = await response.json()
			console.log("Im getting this:", data)
			setTaskList(data.todos)
		}
		catch(error){
			console.log(error)
		}
	}
	
	const addToDo = async () =>{
		try{
			const response = await fetch(apiUrl+"/todos/Mitronios", {
				method: "POST",
				body: JSON.stringify({
					"label": task,
  					"is_done": false
				}),
				headers: {
					"Content-Type": "application/json",
				}
			})
			if(!response.ok){
				console.log("Oh no! no task added", response.status)
				return;
			}
			const data = await response.json()
			console.log("Im getting this:", data)
			setTaskList([...taskList, data])
			setTask("")
		}
		catch(error){
			console.log(error)
		}
	}

	const deleteToDo = async (id) =>{
		try{
			const response = await fetch(`${apiUrl}/todos/${id}`,
			{method: "DELETE"})
			if(!response.ok){
				console.log("Task cannot be deleted", response.status)
				return;
			}
			const data = await response
			console.log("Im getting this:", data)
			const newList = taskList.filter(item => item.id != id) 
			setTaskList(newList)
		}
		catch(error){
			console.log(error)
		}
	}

	const deleteUser = async () =>{
		try{
			const response = await fetch(apiUrl+"/users/Mitronios", 
			{method: "DELETE"})
			if(!response.ok){
				console.log("Task cannot be deleted", response.status)
				return;
			}
			const data = await response
			console.log("Im getting this:", data)
			setTaskList([])
			createUser()
		}
		catch(error){
			console.log(error)
		}
	}
	
	useEffect(() => {
		createUser()
		getToDos()
	},[]) 

	return (
		<React.Fragment>
			<div className="container text-center">
				<h1>todos</h1>
			</div>
			<ul className="container list-group w-50 shadow p-3 mb-5 bg-body rounded">
				<input type="text"
					onChange={(event) => setTask(event.target.value)}
					value={task}
					onKeyDown={(event) => {
						if (event.key === "Enter") {
							if
								(task.trim() !== "") {
								addToDo()
							}
						}
					}
					}
					className="form-control shadow  bg-body rounded px-5"
					placeholder="What needs to be done?"
					aria-label="Username"
				/>
				{taskList.length === 0
					? (<li className="d-flex 
				justify-content-center 
				text-muted list-group-item 
				shadow  
				bg-body rounded px-5"
					>No tasks, add a task</li>
					)
					: (taskList.map((task) => (
						<li key={task.id} className="d-flex 
						justify-content-between 
						list-group-item shadow 
						bg-body rounded 
						px-5">
							{task.label} {""}
							<span><i className="fa-solid fa-x text-danger delete-icon" onClick={() =>deleteToDo(task.id)}></i></span>
						</li>)
					))}
				<div className="text-muted my-1">{taskList.length} tasks</div>
			<button className="container d-flex w-25 text-center btn btn-danger" 
			onClick={()=> deleteUser() }>Delete User</button>
			</ul>
		</React.Fragment >
	);
};

export default Home;
