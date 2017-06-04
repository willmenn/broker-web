import React, {Component} from 'react';

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

    render() {
        const {listOptions} = this.props;

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
                    {this.props.listData.map(s =>
                        <a className="panel-block" onClick={() => this.props.onClickPanelLine(s.shiftPlaceId)}>
                            <span className="panel-icon">
                              <i className="fa fa-book"></i>
                            </span>
                            {s.name}
                        </a>
                    )
                    }
                    <div className="panel-block">
                        <button className="button is-primary is-outlined is-fullwidth">
                            {listOptions.action}
                        </button>
                    </div>
                </nav>
            </ div >
        )
    }
}
export default ListComponent;
