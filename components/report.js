import React from 'react';

export default class Report extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount () {
    console.log(this.props.data)
  }
  render () {
    const { data = [] } = this.props
    return (
      <div>
        <div className="modal fade" id={this.props.id} tabIndex="-1" role="dialog" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Product Report</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
              <table className="table">
              <thead>
                <tr>
                  <th scope="col" className="border-bottom-0">#</th>
                  <th scope="col" className="border-bottom-0">Date</th>
                  <th scope="col" className="border-bottom-0">Name</th>
                  <th scope="col" className="border-bottom-0">Status</th>
                  <th scope="col" className="border-bottom-0">Destination</th>
                  <th scope="col" className="border-bottom-0">Position</th>
                  <th scope="col" className="border-bottom-0">Actions</th>
                </tr>
              </thead>
              <tbody>
                {
                  Array.isArray(data) && data.length ? (
                    data.map(({
                      name = '',
                      status = '',
                      destination = '',
                      position = '',
                      date: dateAction = '',
                      actions =''
                    } = {}, index) => {
                      const date = new Date(dateAction);
                      return (
                        <>
                          <tr key={index}>
                            <th scope="row">{ index + 1 }</th>
                            <td>{date.toDateString()}</td>
                            <td>{name}</td>
                            <td>{status}</td>
                            <td>{destination}</td>
                            <td>{position}</td>
                            <td>{actions}</td>
                          </tr>
                        </>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="10" className="text-center">The data is empty</td>
                    </tr>
                  ) 
                }
              </tbody>
            </table>
              </div>
            </div>
          </div>
        </div>
        <style>{`
          @media (min-width: 576px) {
            #${this.props.id} .modal-dialog { max-width: none; }
          }
          
          #${this.props.id} .modal-dialog {
            display: flex;
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
            align-items: center;
            justify-content: center;
          }
          
          #${this.props.id} .modal-content {
            overflow: scroll;
            height: 90%;
            border-radius: 0;
            width: 90%;
          }
        `}</style>
      </div>
    );
  }
}