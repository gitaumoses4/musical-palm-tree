import React, {Component} from 'react';
import logo from './logo.svg';
import './App.scss';


class App extends Component {
  state = {
    email: '',
    addVariable: false,
    lists: {
      '0': true
    },
    model: {
      name: 'Request',
      fields: [
        {
          name: 'id',
          value: '$.request.id'
        },
        {
          name: 'createdBy',
          fields: [
            { name: 'id', value: '$.request.createdBy.id' },
            { name: 'email', value: '$.request.createdBy.email' },
            { name: 'name', value: '$.request.createdBy.name' },
            {
              name: 'manager',
              fields: [
                { name: 'name', value: '$.request.createdBy.manager.name' }
              ]
            }
          ]
        },
        {
          name: 'trips',
          fields: [
            { name: 'origin', value: '$.request.trips.origin' }
          ]
        }
      ]
    },
  };

  addVariable = () => {
    this.setState(({ addVariable }) => ({ addVariable: !addVariable}))
  };

  handleChange = (e) => {
    this.setState({ email: e.target.value })
  };

  renderChooser = () => {
    const { model } = this.state;
    return (
      <div className="chooser">
        {
          this.renderField(model, '0')
        }
      </div>
    )
  };

  renderField = ({ name, fields = [], value}, id) => {
    const { lists } = this.state;
    return (
      <div className="item">
        <div className={`header ${value ? 'value': ''}`} onClick={() => {
          this.setState({ lists: {...lists, [id]: !lists[id]}});
          if( value ){
            this.setState(({email}) => ({ email: `${email} {{${value}}}`}))
          }
        }}>
          <em>{name}</em> <span>{ value ? ` - {{ ${value} }}`: ''}</span>
        </div>
        {
          lists[id] && (
            <ul className="list">
              {
                fields.map((field, index) => {
                  return this.renderField(field, id+index)
                })
              }
            </ul>
          )
        }
      </div>
    )
  };

  render() {
    const { email, addVariable } = this.state;

    const VariableChooser = this.renderChooser;
    return (
      <div className="App">
        <div className="textarea">
          <textarea name="email" value={email} onChange={this.handleChange}/>
          <button onClick={this.addVariable}>Add Variable</button>
          {
            addVariable && <VariableChooser/>
          }
        </div>
      </div>
    );
  }
}

export default App;
