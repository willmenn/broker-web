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


    constructor() {
        super();
        this.state = {
            enableDelete: true
        }
    }

    onClickLineForDelete(shiftPlaceId) {
        this.setState({
            enableDelete: false,
            deleteId: shiftPlaceId
        })
    }

    onClickDeleteButton() {
        var url = "https://brokermanagement-dev.herokuapp.com/shiftPlace/" + this.state.deleteId;

        axiosConfig().delete(url);

    }

    render() {
        const {listOptions} = this.props;
        const listData = this.props.listData ? this.props.listData : this.stata.listData;

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
                        {console.log(this.props.listData)}
                        {listOptions.title}
                    </p>
                    {listData.map(s =>
                        <a className="panel-block" onClick={() => {
                            if (listOptions.action === 'Delete') {
                                this.onClickLineForDelete(s.shiftPlaceId);
                            } else {
                                this.props.onClickPanelLine(s.shiftPlaceId);
                            }
                        }}>
                            <span className="panel-icon">
                              <i className="fa fa-book"></i>
                            </span>
                            {s.name}
                        </a>
                    )
                    }
                    <div className="panel-block">
                        <button
                            className={listOptions.action === 'Delete' ? "button is-danger is-outlined is-fullwidth" : "button is-primary is-outlined is-fullwidth"}
                            disabled={this.state.enableDelete} onClick={this.onClickDeleteButton.bind(this)}>
                            {listOptions.action}
                        </button>
                    </div>
                </nav>
            </ div >
        )
    }
}
export default ListComponent;
