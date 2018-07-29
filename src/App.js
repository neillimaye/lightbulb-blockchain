import React, { Component } from 'react'
import LightbulbContract from '../build/contracts/Lightbulb.json'

import getWeb3 from './utils/getWeb3'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      storageValue: 0,
      web3: null,
      onoff: false,
      tracker: ''
    }
    this.changeState = this.changeState.bind(this)
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })

      // Instantiate contract once web3 provided.
      this.instantiateContracts()
      console.log("contract instantiated fresh")
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  instantiateContracts() {
    const contract = require('truffle-contract')
    const lightbulb = contract(LightbulbContract)
    lightbulb.setProvider(this.state.web3.currentProvider)
    var lightbulbinstance
    this.state.web3.eth.getAccounts((error, accounts) => {
      lightbulb.deployed().then((instance) => {
        lightbulbinstance = instance
        return lightbulbinstance.get.call(accounts[0])
      }).then((result) => {
        // Get the value from the contract to prove it worked.
        return this.setState({ onoff: result })
      })
    })
  }

  changeState(){
    const contract = require('truffle-contract')
    const lightbulb = contract(LightbulbContract)
    lightbulb.setProvider(this.state.web3.currentProvider)
    console.log("Change state ready")
    var lightbulbinstance

    this.state.web3.eth.getAccounts((error, accounts) => {
      lightbulb.deployed().then((instance) => {
        lightbulbinstance = instance
        return lightbulbinstance.change({from: accounts[0]})
      }).then((result) => {
        return lightbulbinstance.get.call()
      }).then((result) => {
        return this.setState({ onoff: result })
      })
    })

  }

  render() {
    let status = "The light is " + (this.state.onoff ? "on" : "off")
    let tracker = this.state.tracker
    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
            <a href="#" className="pure-menu-heading pure-menu-link">Truffle Box</a>
        </nav>

        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1">
              <p>{status}</p>
              <p>{tracker}</p>
              <button onClick={this.changeState}>Switch!</button>
            </div>
          </div>
        </main>
      </div>
    );
  }
}
export default App
