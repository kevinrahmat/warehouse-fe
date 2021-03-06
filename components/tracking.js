import React from 'react';

export default class Add extends React.Component {
  constructor(props) {
    super()
    this.state = {
      data: []
    }
  }

  mapData() {
    const { destination, position } = this.props;
    const dest = destination.split(' ')[1]
    const posit = position.split(' ')[1]
    const result = []

    for (let x = dest; x <= posit; x++) {
      result.push('Arrived to warehouse ' + x)
    }

    this.setState({ data: result })
  }

  componentDidMount() {
    this.mapData()
  }

  render () {
    const { data } = this.state;
    return (
      <div id={this.props.id} className="modal fade" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Track Product</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              { Array.isArray(data) && data.map((item, index) => (
                <div
                  key={index}
                  className="shadow-sm rounded"
                  style={
                    index == 0 ? 
                      { background: 'rgba(2,123,255,0.8)', color: 'white' }
                     : (index !== data.length - 1 ? 
                      { marginTop: 10, background: 'rgba(108, 117, 125, 0.8)', color: 'white'}
                     : { marginTop: 10, background: 'rgba(40,167,69,0.8)', color: 'white'})
                  }
                >
                  <div className="card-body">
                    <p style={{ fontWeight: 600, fontSize: 11 }} className="m-0">
                      {
                        index == 0 ? 
                        'Started Warehouse'
                       : (index !== data.length - 1 ? 
                        'Passed Warehouse'
                       : 'Current Warehouse')
                      }
                    </p>
                    <p style={{ fontWeight: "normal" }} className="m-0">{item}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}