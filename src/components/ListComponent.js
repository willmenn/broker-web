import React, {Component} from 'react';


import axios from 'axios';


const axiosConfig = () => {
    return axios.create({
        headers: {'Content-Type': "application/json; charset=utf-8"}
    });
}

const customizedCss = {
    margin: 'auto'
}


const textAlign = {
    textAlign: 'center'
}

const minPanelWidth = {
    width: '200px'

}

const displayNone = {
    display: 'none'
}

const displayBlock = {
    display: 'block',
    fontSize: '12px'
}


class ListComponent extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            enableButton: true,
            clickedDataId: -1,
            isDeleted: false
        }
    }

    onClickLineForDelete(id) {
        this.setState({
            enableButton: false,
            deleteId: id
        })
    }

    onClickLineForEdit(shiftPlaceId) {
        this.setState({
            enableButton: false,
            editId: shiftPlaceId
        })
    }

    onClickDeleteButton(entity) {
        var url = '';
        if (entity === 'broker') {
            url = "https://brokermanagement-dev.herokuapp.com/broker/" + this.state.deleteId;
        } else {
            url = "https://brokermanagement-dev.herokuapp.com/shiftPlace/" + this.state.deleteId;
        }
        axiosConfig().delete(url);
        this.setState({isDeleted: true});
    }

    handleActiveState(index) {
        this.setState({clickedDataId: index})
    }

    handleDeleteNotificationButton() {
        this.setState({
            isDeleted: false
        })
    }

    render() {
        const {listOptions} = this.props;
        const listData = this.props.listData ? this.props.listData : this.state.listData;
        let clickedIndex = this.state.clickedDataId;
        if (this.props.listData.length === 0) {
            return (
                <div className="is-half" style={customizedCss}>
                    <i className="fa fa-refresh fa-spin fa-3x fa-fw"></i>
                    <span className="sr-only"></span>
                </div>
            )
        }
        return (
            <div className="is-half" style={customizedCss}>
                <nav className="panel" style={minPanelWidth}>
                    <p className="panel-heading" style={textAlign}>
                        {listOptions.title}
                    </p>
                    {listData.map((s, index) => {
                            return (
                                <a className={clickedIndex === index ? 'panel-block is-active' : 'panel-block'}
                                   onClick={() => {
                                       this.handleActiveState(index);
                                       let id = listOptions.entity === 'broker' ? s.brokerId : s.shiftPlaceId;
                                       if (listOptions.action === 'Delete') {
                                           this.onClickLineForDelete(id);
                                       } else {
                                           this.onClickLineForEdit(id);
                                       }
                                   }}>
                            <span className="panel-icon">
                              <i className="fa fa-book"></i>
                            </span>
                                    {s.name}
                                </a>
                            )
                        }
                    )
                    }
                    <div className="panel-block">
                        <button
                            className={listOptions.action === 'Delete' ? "button is-danger is-outlined is-fullwidth" : "button is-primary is-outlined is-fullwidth"}
                            disabled={this.state.enableButton} onClick={() => {
                            if (listOptions.action === 'Delete') {
                                this.onClickDeleteButton(listOptions.entity);
                            } else {
                                this.props.onClickPanelLine(this.state.editId, listOptions.entity);
                            }
                        }}>
                            {listOptions.action}
                        </button>
                    </div>
                    <div className="notification is-danger" style={this.state.isDeleted ? displayBlock : displayNone}>
                        <button className="delete" onClick={this.handleDeleteNotificationButton.bind(this)}></button>
                        Deletado com sucesso!
                    </div>
                </nav>
            </ div >
        )
    }
}
export default ListComponent;
