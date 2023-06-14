import './App.css';
import React from 'react';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';

function App() {
  return (
    <div className="App">
      <ContactForm/>
      <hr/>
      <ContactList/>
    </div>
  );
}

export default App;
