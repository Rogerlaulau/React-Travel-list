import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      travels: [],
      pageNum: 1,
      totalPages: 0,
    }
  }

  componentDidMount() {
    this.changePage(this.state.pageNum);
  }

  changePage(pageNum) {
    const url = `http://localhost:4000/page/${pageNum}`;

    fetch(url)
      .then(res => res.json())
      .then(res => this.setState({travels: res.data, pageNum: pageNum, totalPages:res.total_pages}))
  }

  render(){
    const  {travels} = this.state;
    return (
      <div className="container">
        <div class="jumbotron">
          <h1 class="display-3">Travel to Hong Kong</h1>
          <h3 class="display-6">Author: Roger Lau</h3>
        </div>
        <div className="travels">
          {travels.map((travel) => (
            <div className="card" key={travel.id}>
              <img src={travel.avatar} className="card-img-top" alt={`${travel.title} avatar`} />
              <div className="card-body">
                <h5 className="card-title">{travel.title}</h5>
                <p className="card-text">{travel.description}</p>
                <a href={travel.readmore} class="btn btn-primary">Read More</a>
              </div>
            </div>
          ))}
        </div>
        <div className="btn-group" role="group" aria-label="Basic example">
          <button 
            type="button"
            disabled={this.state.pageNum === 1 ? true : false}
            className="btn btn-secondary"
            onClick={() => this.changePage(this.state.pageNum-1)}
          >Prev
          </button>

          <button type="button" className="btn btn-secondary">{this.state.pageNum}</button>

          <button 
            type="button"
            disabled={this.state.pageNum >= this.state.totalPages ? true : false}
            className="btn btn-secondary"
            onClick={() => this.changePage(this.state.pageNum+1)}
          >Next
          </button>
        </div>

      </div>
    )
  }
}

export default App;
