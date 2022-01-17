//dt162g projekt administration av client Alice Fagerberg HT21

import React, { Component } from "react";
import { useNavigate } from 'react-router-dom';

//funktion returnera admin sidans komponenter/funktioner
const AdminPage = () => {
    return (
        <div className="admin">
            <Logout></Logout>
            <AddTopic></AddTopic>
            <Titlelist></Titlelist>
            <AdminTopiclist></AdminTopiclist>
        </div>
    )
}

//////////////////////////////

//Logga ut
function Logout() {

    const nav = useNavigate();

    function Redirect(){
        //rensa Username och Password från local storage
        localStorage.removeItem('Username');
        localStorage.removeItem('Password');
        //Redirecta och ladda om till inloggsida
        nav("/")
        window.location.reload();
    }
        //returna logga ut-knapp
        return(
            <div className="logout">
                <button onClick={Redirect}>Logga ut</button>
            </div>

        );
    
}

/////////////////////////////////

//KOMPONENT Lista med topics och beydelser
class AdminTopiclist extends Component {

    //Constructor med state-objekt
    constructor(props){
      super(props);
      this.state = {
        items: [],
        isLoaded: false,
        deleted: false,
        status: null,
      }
      
    }
    
    //Funktion för att hämta data
   getData(){
    //Fetch get metod - hämtar lista med topics
    fetch('https://dreamcatcher-restapi.herokuapp.com/dreamtopics')
    .then(res => res.json())
    .then(json => {
      this.setState({
        isLoaded: true,
        items: json,
      })
    })
    
   }

  //Mounta till träd
  componentDidMount() {
    // Kör funktion hämta data
    this.getData();
    
  }
    
    //Funktion radera - lyssnar på knapp i listan
    myDelete(arg) {
      fetch("https://dreamcatcher-restapi.herokuapp.com/dreamtopics/" + arg, {
        method: 'DELETE',
  
    })
  
    
      .then(response =>{ 
  
          response.json()
          this.setState({// state är true
            deleted: true,
            status: "Topic raderas..."
          })
  
          setTimeout(() => {
            window.location.reload();
          }, 2000)
          
      })
  
      .catch(error => {
          console.log('Error', error);
      })
  }

    render () {
  
      // Använder state-objekt
      const { isLoaded, items, status} = this.state;
      // om listan inte är redo
      if (!isLoaded) {
        return <div className="loading">List loading...</div>;
      }
      // Ladda lista när den är redo
      else {

        items.sort((a, b) => (a.topic > b.topic) ? 1 : -1);
        return (
          <div id= "topicitems">
            <h2>Topiclista</h2>
            <div>{status} </div>
          <ul>
            {items.map(item => (
              <li key={item._id} id={item._id}><strong>{item.topic} </strong><p>{item.tMeaning}</p>  {new Date(item.created).toDateString()} <button onClick = { () => this.myDelete(item._id) }>Radera</button></li>
            ))} 
            
          </ul>
          </div>
        )
      }
  
      
    }
  }

  ///////////////////////

  //KOMPONENT Topiclista titlar
  class Titlelist extends Component {

    //Constructor med state-objekt
    constructor(props){
      super(props);
      this.state = {
        items: [],
        isLoaded: false,
  
      }
      
    }
    
    //Funktion för att hämta data
  getData(){
    //Fetch get metod - hämtar lista med topics
    fetch('https://dreamcatcher-restapi.herokuapp.com/dreamtopics')
    .then(res => res.json())
    .then(json => {
      this.setState({
        isLoaded: true,
        items: json,
      })
    })
    
  }

  //Mounta till träd
  componentDidMount() {
    // Kör funktion hämta data
    this.getData();
    
  }
  
   
  
    render () {
  
      //Använder state objekt
      const { isLoaded, items } = this.state;
      // Om listan inte är redo
      if (!isLoaded) {
        return <div className="loading">List loading...</div>;
      }
      // Ladda när listan är redo
      else {

        items.sort((a, b) => (a.topic > b.topic) ? 1 : -1);
        return (
          <div id= "titlelist">
          <h2>Välj och gå till topic</h2>
          <ul>
            {items.map(item => (
          
              <li key={item._id}><a href={`#${item._id}`}>{item.topic} </a></li>
            ))} 
            
          </ul>
          </div>
        )
      }
  
      
    }
  }

  /////////////////////////////////////////
  
  //KOMPONENT Lägg till en topic med betydelse - formulär
  class AddTopic extends Component{
    constructor(props){
      super(props)
      this.state = { topic:'',meaning:'', message: null}
      this.handleChange = this.handleChange.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
    }
    
    // Form submit, prevent default page refresh 
    handleSubmit(event){
      event.preventDefault();
      const { topic, meaning } = this.state
        
      //Array med data 
      const data = {"topic": topic, "tMeaning": meaning, "created": new Date() }

      // Kontroll input - skrivit i eller inte
      if(topic === "" || meaning ===""){// 
        this.setState({message: "Alla fält måste fyllas i!"})
      }else {
        // Lägg till vid rätt input
        fetch('https://dreamcatcher-restapi.herokuapp.com/dreamtopics/', { 
            method: 'POST', 
            body: JSON.stringify(data),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then(response => {
                
            response.json()
            this.setState({message: "Ett topic läggs till!"})

              setTimeout(() => {
                window.location.reload();
              }, 2000)
        })

       }
    }
    
    // target/spara alla värden i handler
    handleChange(event){
      this.setState({

        [event.target.name] : event.target.value
         
      })
  
      
    }
    
    // Returnera lägga till formulär med inställningar
    render(){
        // state-objekt med meddelande vid input
        const {message} = this.state;

      return(
        <div className="addbox">
            <div className="message">{message}</div>
        <form id="addTopic" onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor='topic'>Skriv ditt drömtopic</label>
            <input 
              name='topic'
              placeholder='En sak...' 
              value = {this.state.topic}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label htmlFor='meaning'>Skriv betydelsebeskrivnng</label>
            <textarea
              rows = "6"
              name='meaning' 
              placeholder='Det handlar om...'
              value={this.state.meaning}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <button>Lägg till ett topic</button>
          </div>
        </form>
        </div>
      )
    }
  }

export default AdminPage;

