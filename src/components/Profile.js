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
        <SettingText>Notify on {name.toLowerCase()}</SettingText>
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
        <Header>Profile</Header>
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
  width: 200px;
  padding-top: 5px;
`;

const AvatarAndName = styled.div``;


const NotificationsHolder = styled.div`
`;

const NotificationsContent = styled.div`
  display: flex;
  flex-direction: column;
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

export default Profile;
