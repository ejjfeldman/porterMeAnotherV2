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
            if(user){
                
                const currentUser = user
                console.log(currentUser)
                // this.setState({
                //     user: {
                //         name: currentUser.displayName,
                //         uid: currentUser.uid,
                //         email: currentUser.email
                //     }
                // })
            }else{
                console.log("fail")
            }
            
        })
        console.log(auth.currentUser)
        const user = this.props.authUser;
        console.log(this.props.user.email)
        const uid = this.props.uid;

        axios.get("https://beer-data.firebaseio.com/"+uid+".json")
        .then(response=>{
            console.log(response.data)
            const results = response.data;
            if(results){
                const listResults = Object.values(results);
                console.log(listResults)
                const beerListResults=listResults.map(result=>{
                    return {name: result.beerName.name, description:result.beerName.description}
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
                return <div><li className="userBeerItems" key={beerName.name}><b>{beerName.name}</b> {beerName.style}<br/>{beerName.description}</li><hr/></div>
            })
        // beerList=
        //     this.state.beerNames.map(beerName=>{
        //         return <li>{beerName}</li>
        //     })

        }
        
     
        return(
            <div className="Account">
                <h2>User Information</h2>
                <p>{this.props.user.email}</p>
<h3 className="beerListing">Beers you have viewed</h3>
<ul className="userBeerList">
{beerList}
 {/* {this.state.beerNames} */}
    </ul>
              
            </div>

        )
    }
};

export default Account;