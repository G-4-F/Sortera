import React, { Component } from "react";
import "../styles.css"

export default class Contents extends Component {
    constructor(props) {
        super(props);
    }
    
    render () {
        

        return (
            <div className="contents">
                <div class="center">
                <button className="active">
                    <p>upload file</p>
                    <div class="loading"></div>
                    <div class="fa fa-check"></div>
                </button>
                </div>
            </div>
        )
        
    }
}