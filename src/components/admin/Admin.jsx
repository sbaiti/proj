import React from "react";
import axios from "axios";
import Header from "../header/Header";
import Select from "react-select";
import sound from "../../imgandsound/House-bell-sound-effect-0-1.8.mp3";
import "bootstrap/dist/css/bootstrap.min.css";
import "./admin.css";
import { ToastContainer, toast } from 'react-toastify';
import { verifTabOrder, Links } from "../../utile/utile";
class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order: { num_order: null, date_order: null },
      tab_order: [],
      is_emty: true,
      is_exist: false
    };
    this.url = sound;
    this.audio = new Audio(this.url);
    //this.togglePlay = this.togglePlay.bind(this);
  }
  handleChange = event => {
    this.setState({
      order: {
        num_order: event.target.value,
        date_order: new Date().toISOString()
      },
      is_emty: false
    });
  };

  handleChangeListSelect = selectedOption => {
    this.setState({ selectedOption });
  };

  handleSubmit = event => {
    event.preventDefault();
    const order = this.state.order;
    if (!this.state.is_emty) {
      if (!verifTabOrder(this.state.tab_order, order.num_order)) {
        axios.post("http://localhost:3001/api/order", { order }).then(res => {
          console.log('success', res);
        });
        setTimeout(() => {
          axios.get('http://localhost:3001/api/orders')
            .then(res => {
              const orders = res.data;
              this.setState({
                tab_order: orders,
                is_emty: true,
                is_exist: false
              }, () => {
                this.togglePlay();
              });
            })
        }, 500)
        document.getElementById("myForm").reset();
      }
      else { this.setState({ is_exist: true }, () => toast("Nummernreihenfolge ist bereits vorhanden")) }
    }
  };

  deleteAllOrders = event => {
    event.preventDefault();
    axios.delete("http://localhost:3001/api/orders/delete").then(res => {
      this.setState({ tab_order: [] })
      console.log("succes", res);
    });
  };

  deleteItem = (event) => {
    if (this.state.selectedOption) {
      event.preventDefault();
      this.state.selectedOption.map((order, index) =>
        axios.delete(`http://localhost:3001/api/orders/delete/:${order.id}`).then(res => {
          console.log('success', res);
        }));
      setTimeout(() => {
        axios.get('http://localhost:3001/api/orders')
          .then(res => {
            const orders = res.data;
            this.setState({ tab_order: orders });
          })
      }, 500)
    }
  }

  togglePlay() {
    this.audio.play();
  }
  render() {
    return (
      <div className="home" >
        <Header />
        <Links />
        <div className="container">
          <div className="admin__left">
            <form onSubmit={this.handleSubmit} id="myForm">
              <label>Bestellungsnummer:</label>
              <br />
              <div className="flex__element">
                <input
                  type="number"
                  name="num_order"
                  min="1"
                  size="50"
                  onChange={this.handleChange}
                  className="form-control"
                />
                <button type="submit" className="btn btn-primary">
                  <div>ist Bereit</div>
                </button>{" "}
              </div>
            </form>
            <br />
            {this.state.is_emty && (
              <div className="error">
                {" "}
                Bitte füllen Sie die Nummernreihenfolge aus
              </div>
            )}
            {this.state.is_exist && <div className="error"><ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnVisibilityChange
              draggable
              pauseOnHover /></div>}
          </div>
          <div className="admin__right">
            <form onSubmit={this.handleSubmit} id="myForm2">
              <label>Liste der Bestellungen:</label>
              <br />
              <div className="flex__element">
                <div className="list">
                  <Select
                    value={this.state.selectedOption}
                    isMulti
                    onChange={this.handleChangeListSelect}
                    options={this.state.tab_order.map(item => ({
                      value: item.num_order,
                      label: item.num_order,
                      id: item._id
                    }))}
                  />
                </div>
                <div className='button__right'>
                  <button type="submit" className="btn btn-danger" onClick={this.deleteItem}>
                    <div>löschen</div>
                  </button>{" "}
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="footer">
          <center>
            {" "}
            <button type="button" className="btn btn-danger">
              <div onClick={this.deleteAllOrders}>zurücksetzen</div>
            </button>
          </center>
        </div>
      </div >
    );
  }
}

export default Admin;
