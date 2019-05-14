import React, { Component } from 'react';
import MenuAdmin from './MenuAdmin';
import SidebarAdmin from './SidebarAdmin';
import { Button, Header, Icon, Modal, Checkbox } from 'semantic-ui-react'
import axios from 'axios';

class UnblockUser extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            users: [],
            usersToDelete: [],
            loaded: false,
            modalOpen: false,
        }
    }
    
    componentDidMount(){
        this.getUsers();
    }

    getUsers = async () => {
        const response = await axios.get(`https://sitegauge.io/api/blocked-users`); 
        this.setState({ users: response.data });
    }

    addUserToDelete = (id) => {
        this.setState({ usersToDelete: [...this.state.usersToDelete, id]})
    }

    delete = (e) => {
        e.preventDefault();
        axios.post(`https://sitegauge.io/api/admin/unblock`, {users: this.state.usersToDelete},
            {
                users: this.state.usersToDelete
            })
            .then(res => {
            })
            .catch(err => {
                console.log(err);
            })

        this.setState( {users: this.state.users.filter(val => {
            return(
            !this.state.usersToDelete.includes(val.id))
        })
        });
        this.handleClose();
    }

    handleOpen = () => {this.setState({ modalOpen: true })};

    handleClose = () => {this.setState({ modalOpen: false })};

    render(){
        return(
            <div>
                <MenuAdmin />
                <div className="ui grid">
                    <div className="row">
                        <SidebarAdmin />
                        <div id="content" className="column" style={{
                            marginLeft: "19%",
                            width: "81%",
                            marginTop: "2em",
                            paddingLeft: "1.5em"
                        }}>    
                             <div className="ui grid" style={{
                                paddingRight: "4em",
                             }}>
                                 <div className="row">
                                <table className="ui striped table">
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Name</th>
                                            <th>E-mail Address</th>
                                            <th>Date Created</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        this.state.users.length === 0? 
                                        null
                                        :
                                        this.state.users.map(user => {
                                            return(
                                                <tr key={user.id}>
                                                    <td className="collapsing">
                                                        <Checkbox toggle onClick={ () => this.addUserToDelete(user.id) } />
                                                    </td>
                                                    <td>{user.first_name + " " + user.last_name}</td>
                                                    <td>{user.email}</td>
                                                    <td>{user.created_at}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                    </tbody>
                                    {
                                        this.state.users.length === 0? 
                                        null
                                        :
                                        <tfoot className="full-width">
                                            <tr>
                                              <td colSpan="3">
                                                <Modal
                                                    trigger={<button className="negative ui button" onClick={this.handleOpen}>Unblock Users</button>}
                                                    open={this.state.modalOpen}   
                                                    onClose={this.handleClose}
                                                    basic
                                                    size='small'
                                                  >
                                                    <Header icon='archive' content='Unblock these users?' />
                                                    <Modal.Content>
                                                      <h3>Are you sure you want to unblock the selected users?</h3>
                                                    </Modal.Content>
                                                    <Modal.Actions>
                                                      <Button color='red' onClick={this.handleClose}>
                                                        <Icon name='remove' /> No
                                                      </Button>
                                                      <Button color='green' onClick={this.delete}>
                                                        <Icon name='checkmark' /> Yes
                                                      </Button>
                                                    </Modal.Actions>
                                                </Modal>
                                              </td>
                                            </tr>
                                        </tfoot>
                                    }
                                </table>
                                </div>
                             </div>
                        </div>
                    </div>
                </div>
              </div>
        )
    }
}



export default UnblockUser;
