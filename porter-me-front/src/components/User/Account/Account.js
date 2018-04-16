import React, {Component} from 'react';
import axios from 'axios';
import './Account.css';
import {auth} from '../../../firebase/firebase';


class Account extends Component{
state={
    beerNames:null,
    user:{
        name: null,
        uid: null,
        email: null
    } 
}

    componentDidMount(){
        auth.onAuthStateChanged(function(user){
            const currentUser = user
            if(user){
                console.log(currentUser)
            }else{
                console.log("fail")
            }
        })
        console.log(auth.currentUser)
        const user=auth.currentUser;
        const uid = this.props.uid;
        // this.setState({
        //     user: {
        //         name: currentUser.displayName,
        //         uid: currentUser.uid,
        //         email: currentUser.email
        //     }
        // })

        axios.get("https://beer-data.firebaseio.com/"+uid+".json")
        .then(response=>{
            console.log(response.data)
            const results = response.data;
            if(results){
                const listResults = Object.values(results);
                console.log(listResults)

                const beerListResults=listResults.map(result=>{
                    return {name: result.beerName.name, description:result.beerName.description, method:result.beerName.method, href: result.beerName.href}
                })
                this.setState({
                    beerNames: beerListResults
                })
                console.log(this.state.beerNames)
            }

        })

    }


    render(){
        let beerList = null;
        let beers = this.state.beerNames;
 
        if(this.state.beerNames){
            beerList=
            beers.map(beerName=>{
                console.log(beerName.href)
                return <div><li className="userBeerItems" key={beerName.name}><a href={beerName.href} target="_blank"><b>{beerName.name}</b></a> {beerName.style}<br/><i>{beerName.method}</i><br/>{beerName.description}</li><hr/></div>
            })
        }
        if(this.state.beerNames){
            console.log(this.state.beerNames)
        }
        
     
        return(
    <div className="Account">
        <h2>User Information</h2>
        <p>{this.props.email}</p>
        <h3 className="beerListing">Beers you have viewed</h3>
            <ul className="userBeerList">
                {beerList}
                <p className="lcboMessage">*click to find in the LCBO</p>
            </ul>
    </div>

        )
    }
};

export default Account;