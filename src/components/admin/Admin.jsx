import React from "react";
//import axios from "axios";
import Header from "../header/Header";
import Select from "react-select";
import sound from "../../imgandsound/House-bell-sound-effect.mp3";
import "bootstrap/dist/css/bootstrap.min.css";
import "./admin.css";
import { verifTabOrder } from "../../utile/utile";
class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order: { num_order: null, date_order: null, state_order: null },
      tab_order: [],
      is_emty: true
    };
    this.url = sound;
    this.audio = new Audio(this.url);
    //this.togglePlay = this.togglePlay.bind(this);
  }
  handleChange = event => {
    if (verifTabOrder(this.state.tab_order, event.target.value)) {
      this.setState({
        order: {
          num_order: event.target.value,
          date_order: new Date().toISOString(),
          state_order: null
        },
        is_emty: false,
        selectedOption: null
      });
    }
  };

  handleChangeListSelect = selectedOption => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  };

  handleSubmit = event => {
    event.preventDefault();
    // const order = this.state;
    if (!this.state.is_emty) {
      this.setState({
        tab_order: [...this.state.tab_order, this.state.order],
        is_emty: true
      });
    }
    document.getElementById("myForm").reset();
    //   this.setState({ is_emty: true }, () => {
    //     this.togglePlay();
    //   });
    // setTimeout(() => {
    //     const order = { num_order: 0, date_order: new Date().toISOString() };
    //     axios.post('http://localhost:3001/api/order', { order }).then(res => { console.log('home screen'); });
    // }, 9000);
    //   axios.post("http://localhost:3001/api/order", { order }).then(res => {
    //     console.log(res);
  };

  //   deleteAllOrders = event => {
  //     event.preventDefault();
  //     axios.delete("http://localhost:3001/api/orders/delete").then(res => {
  //       console.log("succes", res);
  //     });
  //   };
  //   togglePlay() {
  //     this.audio.play();
  //   }
  render() {
    return (
      <div className="home">
        <Header />
        <div className="container">
          <div className="admin__left">
            <form onSubmit={this.handleSubmit} id="myForm">
              <label>Bestellungsnummer:</label>
              <br />
              <input
                type="number"
                name="num_order"
                min="1"
                size="50"
                onChange={this.handleChange}
                className="input"
              />
              <br />
              <button type="submit" className="button">
                <div>ist Bereit</div>
              </button>{" "}
            </form>
            <br />
            {this.state.is_emty && (
              <div className="error">
                {" "}
                Bitte füllen Sie die Nummernreihenfolge aus
              </div>
            )}
          </div>
          <div className="admin__right">
            <form onSubmit={this.handleSubmit} id="myForm">
              <label>Liste der Bestellungen:</label>
              <br />
              <div className="list">
                <Select
                  // value={selectedOption}
                  isMulti
                  onChange={this.handleChangeListSelect}
                  options={this.state.tab_order.map((item, key) => ({
                    value: item.num_order,
                    label: item.num_order
                  }))}
                />
              </div>
              <button type="submit" className="button">
                <div>auf dem Bildschirm</div>
              </button>{" "}
              <button type="submit" className="button">
                <div>löschen</div>
              </button>{" "}
            </form>
            <br />
          </div>
        </div>
        <div className="footer">
          <center>
            {" "}
            <button type="button" className="button">
              <div onClick={this.deleteAllOrders}>zurücksetzen</div>
            </button>
          </center>
        </div>
      </div>
    );
  }
}

export default Admin;
