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

class ListComponent extends Component {

    constructor(props,context) {
        super(props,context);
        this.state = {
            enableButton: true,
            clickedDataId: -1
        }
    }

    onClickLineForDelete(shiftPlaceId) {
        this.setState({
            enableButton: false,
            deleteId: shiftPlaceId
        })
    }

    onClickLineForEdit(shiftPlaceId) {
        this.setState({
            enableButton: false,
            editId: shiftPlaceId
        })
    }

    onClickDeleteButton() {
        var url = "https://brokermanagement-dev.herokuapp.com/shiftPlace/" + this.state.deleteId;

        axiosConfig().delete(url);

    }

    handleActiveState(index) {
        this.setState({clickedDataId: index})
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
                    {listData.map( (s, index) => {
                            return (
                                <a className={clickedIndex === index ? 'panel-block is-active' : 'panel-block'}
                                   onClick={() => {
                                       this.handleActiveState(index);
                                       if (listOptions.action === 'Delete') {
                                           this.onClickLineForDelete(s.shiftPlaceId);
                                       } else {
                                           this.onClickLineForEdit(s.shiftPlaceId)
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
                                this.onClickDeleteButton.bind(this)
                            }else{
                                this.props.onClickPanelLine(this.state.editId);
                            }
                            }}>
                            {listOptions.action}
                        </button>
                    </div>
                </nav>
            </ div >
        )
    }


}
export default ListComponent;
