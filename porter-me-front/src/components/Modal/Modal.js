import React, {Component} from "react";
import "./Modal.css";
import Aux from '../Aux';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component{ 

    //makes it only update when necessary
    shouldComponentUpdate(nextProps, nextState){
        //to have the loading spinner show, we need to check the children props as well since that is what is being passed
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }

    componentWillUpdate(){
        console.log('Modal willupdate')
    }
render(){
    return(
        <Aux>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
      <div
        className="Modal"
        style={{
          transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
          opacity: this.props.show ? "1" : "0"
        }} >
        {this.props.children}
      </div>
    </Aux>

    )}



}


export default Modal;
