import React from 'react';
import styled from 'styled-components';
import autobind from 'class-autobind';
import forEach from 'lodash/forEach'
import moment from 'moment';

import {getSnacks, deliverSnacks} from '../api';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';




class Orders extends React.Component {
  state = {snacks: [], deliveredMap: {}, loading: false};
  constructor() {
    super(...arguments);
    autobind(this);
  }

  async componentDidMount() {
    await this.loadSnacks();
  }

  async loadSnacks() {
    const snacks = await getSnacks('ORDERED');
    //TODO: add ordering
    this.setState({snacks})
  }

  getSelectedSnackIds() {
    const snackIds = [];
    forEach(this.state.deliveredMap, (isOrdered, snackId) => {
      if (isOrdered) {
        snackIds.push(snackId);
      }
    });
    return snackIds;
  }


  async orderItems() {
    const snackIds = this.getSelectedSnackIds();
    this.setState({loading: true})
    await deliverSnacks(snackIds);
    await this.loadSnacks();
    this.setState({loading: false})
  }

  onDeliveredToggle(snack_id) {
    const oldVal = this.state.deliveredMap[snack_id];
    const newState = Object.assign({}, this.state.deliveredMap, {[snack_id]: !oldVal});
    this.setState({deliveredMap: newState})
  }

  renderSnack(snack) {
    return (
      <OneSnack key={snack.id}>
        <SnackItem>
          <SnackImage src={snack.image} />
        </SnackItem>
        <SnackItem>
          {snack.full_name}
        </SnackItem>
        <SnackItem>
          <OrderCheckbox checked={this.state.deliveredMap[snack.id] || false}
            type="checkbox" onChange={e => this.onDeliveredToggle(snack.id)} />
        </SnackItem>
      </OneSnack>
    )
  }

  renderButtonText() {
    if (this.state.loading) {
      return <SpinnerHolder><Spinner animation="border" />Confirming</SpinnerHolder>
    }
    return <span>Mark Items as Delivered</span>
  }

  hasItemsSelected() {
    return this.getSelectedSnackIds().length > 0;
  }

  render() {
    const buttonActive = this.hasItemsSelected();
    return (
      <Container>
        <h3>Deliveries</h3>
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
                  Delivered
              </th>
              </tr>
            </thead>
            <tbody>
              {this.state.snacks.map(this.renderSnack)}
            </tbody>
          </SnackTable>
        </Holder>
        <ButtonHolder>
          <Button disabled={!buttonActive} onClick={this.orderItems}>{this.renderButtonText()}</Button>
        </ButtonHolder>
      </Container>
    )
  }
}



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
  border: 1px solid black;
  border: 1px solid black;x
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

const SnackImage = styled.img`
  max-width: 100px;
  max-height: 100px;
`;


export default Orders;
