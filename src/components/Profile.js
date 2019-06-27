import React from 'react';

import styled from 'styled-components';

import Toggle from 'react-toggle';
import "react-toggle/style.css"

import * as api from '../api';


class Profile extends React.Component {
  state = {}
  async componentDidMount() {
    await this.updateUser();
  }

  async updateUser() {
    const user = await api.getUser();
    this.setState({...user})
  }

  getVerb(name) {
    switch (name) {
      case 'Request':
        return 'Requested';
      case 'Order':
        return 'Ordered';
      case 'Delivery':
        return 'Delivered';
    }
  }

  getVariableName(name) {
    switch (name) {
      case 'Request':
        return 'notify_request';
      case 'Order':
        return 'notify_order';
      case 'Delivery':
        return 'notify_delivery';
    }
  }

  async handleSwitchChange(name) {
    const variableName = this.getVariableName(name);
    const value = this.state[variableName] || false;
    const newValue = !value;
    this.setState({[variableName]: newValue});
    await api.updateNotificationsSettings(name, newValue);
    await this.updateUser();
  }


  renderOneOption(name) {
    const variableName = this.getVariableName(name);
    const value = this.state[variableName] || false;
    return (
      <OneSetting>
        <SettingText>{this.getVerb(name)}</SettingText>
        <SwitchHolder>
          <Toggle checked={value} onChange={() => this.handleSwitchChange(name)} />
        </SwitchHolder>
      </OneSetting>
    )
  }



  renderMainContent() {
    const {avatar, name} = this.state;
    return (
      <MainContent>
        <AvatarAndName>
          <Avatar src={avatar} ></Avatar>
          <Name>
            {name}
          </Name>
        </AvatarAndName>
        <NotificationsHolder>
          <h4>
            Notification Settings
          </h4>
          <NotifyHeader>
            Notify me when an item I am following is:
          </NotifyHeader>
          <NotificationsContent>
            {this.renderOneOption('Request')}
            {this.renderOneOption('Order')}
            {this.renderOneOption('Delivery')}
          </NotificationsContent>
        </NotificationsHolder>
      </MainContent>
    )
  }

  render() {
    return (
      <div>
        {this.state.name ? this.renderMainContent() : 'Loading...'}
      </div>
    )
  }
}


const Header = styled.h3`
  margin-top: 20px;
`;

const Name = styled.h4``;


const Avatar = styled.img`
  width: 150px;
`;

const OneSetting = styled.div`
  width: 150px;
  padding-top: 5px;
`;

const AvatarAndName = styled.div``;


const NotificationsHolder = styled.div`
`;

const NotificationsContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 30px;
`;


const MainContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  &> div {
    margin: 50px;
  }
`;

const SettingText = styled.span`
  float: left;
`;

const SwitchHolder = styled.span`
  float: right;
`;

const NotifyHeader = styled.div`
  font-size: 18px;
`;

export default Profile;
