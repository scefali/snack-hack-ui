import React from 'react';
import styled from 'styled-components';
import autobind from 'class-autobind';
import forEach from 'lodash/forEach'
import moment from 'moment';


import {getSnacks, orderSnacks} from '../api';
import {isAdmin} from '../util';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';




class Requests extends React.Component {
  state = {snacks: [], orderedMap: {}, loading: false, initialized: false};
  constructor() {
    super(...arguments);
    autobind(this);
  }

  async componentDidMount() {
    await this.loadSnacks();
    this.setState({initialized: true})
    setInterval(() => this.loadSnacks(), 1000 * 60 * 10)
  }

  async loadSnacks() {
    let snacks = await getSnacks('REQUESTED');
    snacks = snacks.sort((a, b) => {
      if (a.delivery_date && b.delivery_date) {
        return b.like_count - a.like_count;
      } else if (a.delivery_date) {
        return -1;
      } else if (b.delivery_date) {
        return 1;
      } else {
        return b.like_count - a.like_count;
      }
    })
    this.setState({snacks})
  }

  getSelectedSnackIds() {
    const snackIds = [];
    forEach(this.state.orderedMap, (isOrdered, snackId) => {
      if (isOrdered) {
        snackIds.push(snackId);
      }
    });
    return snackIds;
  }


  async orderItems() {
    const snackIds = this.getSelectedSnackIds();
    this.setState({loading: true})
    await orderSnacks(snackIds);
    await this.loadSnacks();
    this.setState({loading: false})
  }

  onOrderedToggle(snack_id) {
    const oldVal = this.state.orderedMap[snack_id];
    const newState = Object.assign({}, this.state.orderedMap, {[snack_id]: !oldVal});
    this.setState({orderedMap: newState})
  }

  renderSnack(snack) {
    let dateStr = 'N/A';
    if (snack.delivery_date) {
      dateStr = moment(snack.delivery_date).format("MM/DD/YY")
    }
    return (
      <OneSnack key={snack.id}>
        <SnackItem>
          <SnackImage src={snack.image} />
        </SnackItem>
        <SnackItem>
          {snack.full_name}
        </SnackItem>
        <SnackItem>
          {dateStr}
        </SnackItem>
        <SnackItem>
          {snack.like_count}
        </SnackItem>
        {isAdmin() && < SnackItem >
          <OrderCheckbox checked={this.state.orderedMap[snack.id] || false}
            type="checkbox" onChange={e => this.onOrderedToggle(snack.id)} />
        </SnackItem>}
      </OneSnack>
    )
  }

  renderButtonText() {
    if (this.state.loading) {
      return <SpinnerHolder><Spinner animation="border" />Confirming</SpinnerHolder>
    }
    return <span>Mark Items as Ordered</span>
  }

  hasItemsSelected() {
    return this.getSelectedSnackIds().length > 0;
  }

  renderCore() {
    const buttonActive = this.hasItemsSelected();
    return (
      <div>
        <Holder>
          <SnackTable border="1">
            <thead>
              <tr>
                <th>
                  Image
            </th>
                <th>
                  Name
            </th>
                <th>
                  Last Delivered
            </th>
                <th>
                  Follows
            </th>
                {isAdmin() && < th >
                  Ordered
            </th>}
              </tr>
            </thead>
            <tbody>
              {this.state.snacks.map(this.renderSnack)}
            </tbody>
          </SnackTable>
        </Holder>
        {isAdmin() && <ButtonHolder>
          <Button variant="outline-success" disabled={!buttonActive} onClick={this.orderItems}>{this.renderButtonText()}</Button>
        </ButtonHolder>}
      </div>
    )
  }

  render() {
    return (
      <Container>
        {this.state.initialized ? this.renderCore() : 'Loading...'}
      </Container>
    )
  }
}



const Header = styled.h3`
  margin-top: 20px;
`;

const Container = styled.div`
    width: 100%;
    padding-right: 15px;
    padding-left: 15px;
    margin: auto;
`;

const SnackTable = styled.table``;

const OneSnack = styled.tr`
`;

const Holder = styled.div` 
  display: inline-flex;
`;

const SnackItem = styled.td`
  max-width: 350px;
  min-width: 100px;
  border: 1px solid black;
  border: 1px solid black;
`;

const SnackImage = styled.img`
  max-width: 100px;
  max-height: 100px;
`;


const OrderCheckbox = styled.input`
`;

const ButtonHolder = styled.div`
  margin: 10px;
`;

const SpinnerHolder = styled.div`
  display: flex;
  align-items: center;
`;

export default Requests;
