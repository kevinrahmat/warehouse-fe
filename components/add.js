import React from 'react';

export default class Add extends React.Component {
  constructor(props) {
    super(props)
    const { data: {
      id,
      name,
      code,
      quantity,
      status,
      destination,
      position,
      description,
      production_date,
    } = {} } = props;

    this.state = {
      id: id || null,
      name: name || '',
      code: code ||  '',
      quantity: quantity ||  '',
      status: status ||  'Passed',
      destination: destination ||  'Warehouse 1',
      position: position ||  'Warehouse 2',
      description: description ||  '',
      production_date: production_date ||  '',
      warehouse_list: [
        {
          label: 'Warehouse 1',
        },
        {
          label: 'Warehouse 2',
        },
        {
          label: 'Warehouse 3',
        },
        {
          label: 'Warehouse 4',
        },
        {
          label: 'Warehouse 5',
        },
        {
          label: 'Warehouse 6',
        },
        {
          label: 'Warehouse 7',
        },
        {
          label: 'Warehouse 8',
        },
      ]
    }
  }

  resetState () {
    this.setState({
      name: '',
      code: '',
      quantity: '',
      status: '',
      destination: '',
      position: '',
      description: '',
      production_date: '',
    })
  }

  handleChangeInput (event, type) {
    this.setState({
      [type]: event.target.value
    })
  }

  onSave (event) {
    event.preventDefault();
    this.props.onSave(this.state);
    $(`#${this.props.id}`).modal('hide');
    if (this.props.id.split('-')[0] === 'add') {
      this.resetState();
    }
  }

  componentDidMount () {
    $('.selectpicker').selectpicker('show');
  }

  render () {
    const {
      name,
      code,
      quantity,
      status,
      destination,
      description,
      position,
      warehouse_list,
    } = this.state;
    return (
      <div className="modal fade" id={this.props.id} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">{this.state.id ? 'Edit' : 'Add'} New Product</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              
              <form onSubmit={this.onSave.bind(this)}>
                <div className="form-group">
                  <label htmlFor="product-name">Product Name</label>
                  <input value={name} onChange={(event) => this.handleChangeInput( event, 'name' )} className="form-control" id="product-name" placeholder="Enter product name" />
                </div>
                
                <div className="form-group">
                  <label htmlFor="product-code">Product Code</label>
                  <input value={code} onChange={(event) => this.handleChangeInput( event, 'code' )} className="form-control" id="product-code" placeholder="Enter product code" />
                </div>

                <div className="form-group">
                  <label htmlFor="product-quantity">Product Quantity</label>
                  <input type="number" value={quantity} onChange={(event) => this.handleChangeInput( event, 'quantity' )} className="form-control" id="product-name" placeholder="Enter product quantity" />
                </div>

                <div className="form-group d-flex justify-content-between align-items-center">
                  <label htmlFor="product-status">Product Status</label>
                  <select value={status} onChange={(event) => this.handleChangeInput( event, 'status' )}  className="selectpicker">
                    <option value="Passed">Passed</option>
                    <option value="Broken">Broken</option>
                  </select>
                </div>

                <div className="form-group d-flex justify-content-between align-items-center">
                  <label htmlFor="product-destination">Product Destination</label>
                  <select value={destination} onChange={(event) => this.handleChangeInput( event, 'destination' )}  className="selectpicker">
                    {Array.isArray(warehouse_list) && warehouse_list.map(({ label }, index) => {
                      return (
                        <option key={index} value={label}>{label}</option>
                      );
                    })}
                  </select>
                </div>

                <div className="form-group d-flex justify-content-between align-items-center">
                  <label htmlFor="product-position">Product Position</label>
                  <select value={position} onChange={(event) => this.handleChangeInput( event, 'position' )}  className="selectpicker">
                    {Array.isArray(warehouse_list) && warehouse_list.map(({ label }, index) => {
                      return (
                        <option key={index} value={label}>{label}</option>
                      );
                    })}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="product-description">Product Information</label>
                  <textarea value={description} onChange={(event) => this.handleChangeInput( event, 'description' )} className="form-control" id="product-description" placeholder="Enter product information" />
                </div>

                <div className="d-flex justify-content-end">
                  <button type="button" className="btn btn-link mr-2 pl-4 pr-4" data-dismiss="modal">Cancel</button>
                  <button type="submit" className="btn btn-primary pl-4 pr-4">Save</button>
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>
    )
  }
}
