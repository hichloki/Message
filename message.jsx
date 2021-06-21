class MiniChat extends React.Component {
    constructor(props) {
        super(props)
      this.state = { Login: "",connexion : false ,Datee:"" ,envoie: false,text:"",Tabuser:[] , TabMess:[]}
      this.chgLogin=this.chgLogin.bind(this)
      this.ChgStatutConnect=this.ChgStatutConnect.bind(this)
      this.chgMessage=this.chgMessage.bind(this)
      this.envoiesms=this.envoiesms.bind(this)
    }
    render(){
        return (

<div className="container">

<Head etat={this.state.Login} connec={this.state.connexion} chg={this.chgLogin} click={this.ChgStatutConnect}></Head>
  

<div className="corps">
   
<Menu TabUtilisa={this.state.Tabuser} ></Menu>

    <div id="Message">

     <Tchat TabTchat={this.state.TabMess}  ></Tchat>


       <Redac connec={this.state.connexion} click={this.envoiesms} mess={this.state.text} chgmess={this.chgMessage}></Redac> 

    </div>
</div>
<Foot></Foot>

</div>

        )
    
}

chgLogin(event) {
    this.setState({ Login: event.target.value })

}
chgMessage(event){
    this.setState({text: event.target.value})
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


envoiesms(){
    if(this.state.text != ""){
       let date = new Date()
       let TMPsms= [...this.state.TabMess]
       TMPsms.push({nom:this.state.Login , date: date , sms:this.state.text})
        this.setState({TabMess: TMPsms})
        this.state.text=""
    }
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
        <section id="affmessage">
             
      {props.TabTchat.map((ligne,key)=>{
        return(
            <div className="BlocMess" key={key}>
    <p> {ligne.sms}  </p>
            </div> )
})}

            
        </section>
    )
}

function Redac(props){
    return(
        <section id="redaction">
           
            {(props.connec == true)?(
        <div className="texto">
        <textarea name="zoneT" id="zoneT" value={props.mess} onChange={props.chgmess} ></textarea>
        <button type="submit" id="btnenvoie" onClick={props.click}>Envoyer</button>
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