import {Link} from 'react-router-dom';
import useAppState from '../hooks/useAppState';
const Navbar = (props) => {
	
	const {isLogged,user} = useAppState();
	
	if(isLogged) {
	return(
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
			<p className="navbar-brand" style={{marginLeft:10}}>Shopping App</p>
			<ul className="navbar-nav">
				<li className="nav-item" style={{marginLeft:10}}>
					<Link to="/" className="nav-link">Shopping List</Link>
				</li>
				<li className="nav-item" style={{marginLeft:10}}>
					<Link to="/form" className="nav-link">Add new item</Link>
				</li>
				<li className="nav-item" style={{marginLeft:10}}>
					<Link to="/" className="nav-link" onClick={props.logout}>Logout</Link>
				</li>
				<li className="nav-item" style={{marginLeft:10}}>
					<p className="nav-link" style={{color:"blue"}}>Logged in as {user}</p>
				</li>
			</ul>
		</nav>		
	)
	} else {
		return(
			<nav className="navbar navbar-expand-lg navbar-light bg-light">
				<p className="navbar-brand" style={{marginLeft:10}}>Shopping App</p>
				<ul className="navbar-nav">
				</ul>
			</nav>		
		)		
	}
	
}

export default Navbar;