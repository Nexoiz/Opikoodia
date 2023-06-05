import './App.css';
import {useState,useEffect} from 'react';
import ShoppingForm from './components/ShoppingForm';
import ShoppingList from './components/ShoppingList';
import Navbar from './components/Navbar';
import {Routes,Route,Navigate} from 'react-router-dom';

function App() {
	
	const [state,setState] = useState({
		list:[],
		isLogged:false,
		token:"",
		loading:false,
		error:"",
		user:""
	})
	
	const [urlRequest,setUrlRequest] = useState({
		url:"",
		request:{},
		action:""
	})
	
	//HELPER FUNCTIONS

	useEffect(() => {
		if(sessionStorage.getItem("state")) {
			let state = JSON.parse(sessionStorage.getItem("state"));
			setState(state);
			if(state.isLogged) {
				getList(state.token)
			}
		}
	},[])

	const saveToStorage = (state) => {
		sessionStorage.setItem("state",JSON.stringify(state));
	}

	const setLoading = (loading) => {
		setState((state) => {
			return {
				...state,
				loading:loading,
				error:""
			}
		})
	}

	const setError = (error) => {
		setState((state) => {
			let tempState = {
				...state,
				error:error
			}
			saveToStorage(tempState);
			return tempState;
		})
	}	
	
	//USEEFFECT
	
	useEffect(() => {
		
		const fetchData = async () => {
			if(!urlRequest.url) {
				return;
			}
			const response = await fetch(urlRequest.url,urlRequest.request);
			if(!response) {
				console.log("No response.");
				return;
			}
			if(response.ok) {
				switch(urlRequest.action) {
					case "getlist":
						const data = await response.json();
						if(!data) {
							return;
						}
						setState({
							list:data
						})
						return;
					case "additem":
					case "removeitem":
					case "edititem":
						getList();
						return;
					default:
						return;
				}
			} else {
				console.log("Server responded with a status "+response.status+" "+response.statusText);
			}
		}
		
		fetchData();
	},[urlRequest]);
	
	//REST API
	
	const getList = (token) => {
		let tempToken = state.token;
		if(token) {
			tempToken = token;
		}
		setUrlRequest({
			url:"/api/shopping",
			request:{
				"method":"GET",
				"headers":{
					"token":tempToken
				}
			},
			action:"getlist"			
		})
	}
	
	const addItem = (item) => {
		setUrlRequest({
			url:"/api/shopping",
			request:{
				"method":"POST",
				"headers":{
					"Content-Type":"application/json",
					"token":state.token
				},
				"body":JSON.stringify(item)
			},
			action:"additem"
		})
	}
	
	const removeItem = (id) => {
		setUrlRequest({
			url:"/api/shopping/"+id,
			request:{
				"method":"DELETE",
				"headers":{
					"token":state.token
				}
			},
			action:"removeitem"
		})
	}
	
	const editItem = (item) => {
		setUrlRequest({
			url:"/api/shopping/"+item._id,
			request:{
				"method":"PUT",
				"headers":{
					"Content-Type":"application/json",
					"token":state.token
				},
				"body":JSON.stringify(item)
			},
			action:"edititem"
		})
	}

	//LOGIN API
	const register = (user) => {
		setUrlRequest({
			url:"/register",
			request:{
				method:"POST",
				headers:{
					"Content-Type":"application/json"
				},
				body:JSON.stringify(user)
			},
			action:"register"
		})
	}

	const login = (user) => {
		setUrlRequest({
			url:"/login",
			request:{
				method:"POST",
				headers:{
					"Content-Type":"application/json"
				},
				body:JSON.stringify(user)
			},
			action:"login"
		})
	}

	const logout = () => {
		setUrlRequest({
			url:"/logout",
			request:{
				method:"POST",
				headers:{
					"token":state.token
				}
			},
			action:"logout"
		})
	}
	
	return (
		<div className="App">
			<Navbar/>
			<Routes>
				<Route path="/" element={<ShoppingList list ={state.list} removeItem={removeItem} editItem={editItem}/>}/>
				<Route path="/form" element={<ShoppingForm addItem={addItem}/>}/>
				<Route path="*" element={<Navigate to="/"/>}/>
			</Routes>
		</div>
	);
}

export default App;
