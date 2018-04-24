import React, {Component} from 'react';

class ScheduleTab extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="tabs is-centered">
                <ul>
                    {this.props.tabs.map(tab =>
                        <li className={this.getLiClass(tab)}>
                            <a onClick={() =>this.props.changeActiveTab(tab)}>
                                {tab}
                            </a>
                        </li>)
                    }
                </ul>
            </div>
        )
    }

    getLiClass(tab) {
        return this.props.activeTab === tab ? "is-active" : "";
    }
}

export default ScheduleTab;

