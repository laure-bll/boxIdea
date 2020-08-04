import React, {Component} from 'react';
import axios from 'axios';
    
class Ideas extends Component {
    constructor(props) {
        super(props);
        this.state = { ideas: [], search: '', loading: false };
    }
    
    componentDidMount() {
        this.getIdeas();
    }
    
    getIdeas() {

      axios.get(`https://localhost:8000/api/ideas`).then(ideas => {
          this.setState({ ideas: ideas.data, loading: true })
       })
    }

    handleChange = (e) => {
      this.setState({ search: e.target.value});
    }
    
    render() {
      const data = this.state.ideas;

        return(
            <div>
              <header className="section">
                <nav  className="navbar navbar-expand-lg navbar-dark bg-primary">
                  <h1 className="mx-auto">La boîte à idées</h1><br></br>
                </nav>
              </header><br></br>
              

              <div className="container">
                <div className="row">
                      <form className="form-inline my-2 my-lg-0 mx-auto">
                        <input onChange={ this.handleChange } className="form-control mr-sm-2" type="text" placeholder="Search"></input>
                      </form>
                </div><br></br>

                <div className="card-columns">
                  {
                    data.map(idea => idea.title.includes(this.state.search) ? 
                      <div key={idea.id} className="card mb-3 border-primary">
                        <div className="card-header text-white bg-primary">{idea.createdAt.date.substr(0, 10)} à {idea.createdAt.date.substr(10, 9)}</div>
                        <div className="card-body text-dark mx-auto">
                          <p className="card-title font-weight-bolder">"{idea.title}"</p>
                          <p className="card-text text-muted"> Par {idea.author}</p>
                          <p className="card-text"> Score : {idea.score}</p>
                        </div>
                      </div> : ""
                  )}
                </div>
              </div>
            </div>
        )
    }
}
export default Ideas;