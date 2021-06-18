class MiniChat extends React.Component {
    constructor(props) {
        super(props)
      this.state = { Login: "",connexion : false , Tabuser:[] , TabMess:[]}
      this.chgLogin=this.chgLogin.bind(this)
      this.ChgStatutConnect=this.ChgStatutConnect.bind(this)
    }
    render(){
        return (

<div className="container">

<Head etat={this.state.Login} connec={this.state.connexion} chg={this.chgLogin} click={this.ChgStatutConnect}></Head>
  

<div className="corps">
   
<Menu TabUtilisa={this.state.Tabuser} ></Menu>

    <div id="Message">

     <Tchat></Tchat>
       <Redac connec={this.state.connexion}></Redac> 

    </div>
</div>
<Foot></Foot>

</div>

        )
    
}

chgLogin(event) {
    this.setState({ Login: event.target.value })

}

ChgStatutConnect(event){
    event.preventDefault()
    this.setState({connexion : !this.state.connexion})
    if(this.state.connexion == false){
        this.setState({Tabuser:[this.state.Login]})
    }else{
        this.setState({Tabuser :[]})
    }
}

AfficheUtilisateur(){
    let TabUtilisateur=[]

}

}

function Head(props){
    return(
<div className="header">

<h1>MiniChat</h1>
<div className="flex">
    {(props.connec == true)?(
        <form onSubmit={props.click}>
        <p className="MessLog">Bonjour {props.etat} </p>
        <button  className="bout" onClick={props.click}>Log OUT</button>
        </form>
    ): (
    <form onSubmit={props.click}>
        <input type="text" name="connexion" id="connexion" value={props.etat} onChange={props.chg} />
        <button  className="bout" onClick={props.click}>Log in</button>
    </form>
)}
    
</div>
</div>
    )

}


function Menu(props){
    return(
    <div id="menu">
    <h2>Connecté ({props.TabUtilisa.length}) </h2>
    <section id="utilisateurs">

{props.TabUtilisa.map((ligne,key)=>{
return (
    <div key={key}>
{ligne} <p>est Actif </p>
    </div>
)
})}

    </section>

        </div>
    )
}


function Tchat(props){
    return(
        <section id="affmessage"></section>
    )
}

function Redac(props){
    return(
        <section id="redaction">
           
            {(props.connec == true)?(
        <div className="texto">
        <textarea name="zoneT" id="zoneT"></textarea>
        <button type="submit" id="btnenvoie">Envoyer</button>
        </div>
    ): (
       <div></div>
)}

        </section>
    )
}

function Foot(props){
    return(
        <div className="footer"> 
<span> MiniChat by Hich  </span>
</div>
    )
}
ReactDOM.render(<MiniChat />, document.getElementById("app"))