import Head from 'next/head'
import { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'

import Request from '../helpers/api';

import { AddModal, ReportModal } from '../components';

export default class Home extends Component {
  constructor () {
    super()
    this.state = {
      data: [],
      reportData: [],
      modalData: {},
    }
  }

  getPart () {
    return Request.get('part').then(res => {
      const { data } = res;
      this.setState({ data })
    }).catch(err => {
      console.log(err)
    });
  }

  deletePart (id) {
    return Request.delete(`part/${id}`)
      .then(res => {
        this.initialFetch()
      })
      .catch(err => {
        console.log(err)
      })
  }

  postPart (params) {
    return Request.post('part', params)
      .then(res => {
        this.initialFetch()
      })
      .catch(err => {
        console.log(err)
      })
  }

  putPart (id, params) {
    return Request.put(`part/${id}`, params)
      .then(res => {1
        this.initialFetch()
        this.forceUpdate()
      })
      .catch(err => {
        console.log(err)
      })
  }

  getReport () {
    return Request.get('report').then(res => {
      const { data } = res;
      this.setState({ reportData: data }, () => { this.forceUpdate() })
    }).catch(err => {
      console.log(err)
    });
  }

  postReport ({ name, code, quantity, status, destination, description, position, actions }) {
    const params = {
      name,
      code,
      quantity,
      status,
      destination,
      description,
      position,
      actions,
      date: new Date()
    }
    
    return Request.post('report', params)
      .then(res => {
        this.initialFetch()
      })
      .catch(err => {
        console.log(err)
      })
  }

  async initialFetch () {
    await this.getPart();
    await this.getReport();
  }

  async handleDelete (id, index) {
    const params = this.state.data[index]
    this.deletePart(id)
    await this.postReport({ ...params, actions: 'DELETE'})
  }

  async handleSave ({ name, code, quantity, status, destination, description, position }) {
    const params = {
      name,
      code,
      quantity,
      status,
      destination,
      description,
      position,
      production_date: new Date(),
    };

    await this.postPart(params)
    await this.postReport({ ...params, actions: 'ADD'})
  }

  async handleEdit (params) {
    const { id } = params;

    await this.putPart(id, params);  
    await this.postReport({ ...params, actions: 'EDIT'})
  }

  handleEditModal (id) {
    $(`#edit-modal-${id}`).modal('show');
  }

  handleReportModal () {
    $('#report-modal').modal('show');
  }
  componentDidMount () {
    this.initialFetch();
  }

  render () {
    const { data, modalData, reportData } = this.state;
    console.log(reportData)
    return (
      <div>
        <Head>
          <title>Warehouse</title>
          <link rel="icon" href="/favicon.ico" />
          <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossOrigin="anonymous"></script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossOrigin="anonymous"></script>
          <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossOrigin="anonymous"></script>
          <script src="https://cdn.jsdelivr.net/npm/bootstrap-select@1.13.9/dist/js/bootstrap-select.min.js"></script>
          <link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous" />
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"></link>
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-select@1.13.9/dist/css/bootstrap-select.min.css"/>
        </Head>
  
        <main className="p-5">
          <AddModal id="add-modal" onSave={this.handleSave.bind(this)} />
          <ReportModal id="report-modal" data={reportData} />
          <div className="d-flex justify-content-between mb-3">
            <h3 className="m-0 p-0">Product</h3>
            <div className="d-flex">
              <button type="button" className="btn btn-sm btn-primary"  data-toggle="modal" data-target="#add-modal">+ Add New Product</button>
              <button onClick={this.handleReportModal.bind(this)} style={{ width: 70 }} type="button" className="btn btn-sm btn-primary ml-2">Report</button>
              {/* <button type="button" className="btn btn-sm btn-primary ml-2" >
                <FontAwesomeIcon style={{ color: 'white' }} icon={faBell} width={15} />
              </button> */}
            </div>
          </div>
          <div>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col" className="border-bottom-0">#</th>
                  <th scope="col" className="border-bottom-0">Name</th>
                  <th scope="col" className="border-bottom-0">Code</th>
                  <th scope="col" className="border-bottom-0">Quantity</th>
                  <th scope="col" className="border-bottom-0">Information</th>
                  <th scope="col" className="border-bottom-0">Status</th>
                  <th scope="col" className="border-bottom-0">Destination</th>
                  <th scope="col" className="border-bottom-0">Position</th>
                  <th scope="col" className="border-bottom-0">Production Date</th>
                  <th scope="col" className="border-bottom-0">Actions</th>
                </tr>
              </thead>
              <tbody>
                {
                  Array.isArray(data) && data.length ? (
                    data.map(({
                      id = 0,
                      name = '',
                      code = '',
                      quantity = '',
                      status = '',
                      destination = '',
                      position = '',
                      description = '',
                      production_date = '',
                    } = {}, index) => {
                      const date = new Date(production_date);
                      return (
                        <>
                          <AddModal id={`edit-modal-${id}`} data={{ id, name, code, quantity, status, destination, description, position, production_date }}  onSave={this.handleEdit.bind(this)} />
                          <tr key={index}>
                            <th scope="row">{ index + 1 }</th>
                            <td>{name}</td>
                            <td>{code}</td>
                            <td>{quantity}</td>
                            <td>{description}</td>
                            <td>{status}</td>
                            <td>{destination}</td>
                            <td>{position}</td>
                            <td>{date.toDateString()}</td>
                            <td className="d-flex">
                              <button style={{ width: 70 }} onClick={this.handleEditModal.bind(this, id)} type="button" className="btn btn-sm btn-secondary mr-3">Edit</button>
                              <button style={{ width: 70 }} type="button" className="btn btn-sm btn-info mr-3">Track</button>
                              <button style={{ width: 70 }} onClick={this.handleDelete.bind(this, id, index)} type="button" className="btn btn-sm btn-danger mr-3">Delete</button>
                            </td>
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
        </main>
  
        <footer>
         
        </footer>
  
        <style jsx>{`
         
        `}</style>
  
        <style jsx global>{`
          html,
          body {
            padding: 0;
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
              Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
              sans-serif;
          }
  
          * {
            box-sizing: border-box;
          }
        `}</style>
      </div>
    )
  }
}
