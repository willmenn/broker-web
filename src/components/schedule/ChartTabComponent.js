import React, {Component} from 'react';
import {Pie} from 'react-chartjs'
import * as randomcolor from "randomcolor";

class ChartTabComponent extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        var legend = this.refs.chart.getChart().generateLegend();

        this.setState({
            legend: legend
        });
    }

    buildMap(obj) {
        return Object.keys(obj).reduce((map, key) => map.set(key, obj[key]), new Map());
    }

    render() {
        let data = [];
        this.buildMap(this.props.data).forEach((k, v) => data.push({
            value: k,
            label: v,
            color: randomcolor()
        }));
        var dataEx =
            {
                value: 300,
                color: "#F7464A",
                highlight: "#FF5A5E",
                label: "Red"
            }
        var options = {
            //Boolean - Whether we should show a stroke on each segment
            segmentShowStroke: true,

            //String - The colour of each segment stroke
            segmentStrokeColor: "#fff",

            //Number - The width of each segment stroke
            segmentStrokeWidth: 2,

            //Number - The percentage of the chart that we cut out of the middle
            percentageInnerCutout: 50, // This is 0 for Pie charts

            //Number - Amount of animation steps
            animationSteps: 100,

            //String - Animation easing effect
            animationEasing: "easeOutBounce",

            //Boolean - Whether we animate the rotation of the Doughnut
            animateRotate: true,

            //Boolean - Whether we animate scaling the Doughnut from the centre
            animateScale: false,
            //String - A legend template
            legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"><%if(segments[i].label){%><%=segments[i].label%><%}%></span></li><%}%></ul>"
        }
        var legend = this.state && this.state.legend || '';
        return (
            <div className="columns" style={{width: 'inherit'}}>
                <div className="column pie-card">
                    <div className="card">
                        <div className="card-content">
                            <p className="title">
                                “A quantidade de plantões que os corretores irão fazer nesta escala.”
                            </p>
                            <p className="subtitle">
                                Total: {this.props.max}{this.props.placesLeft ?
                                ", lugares sobrando:" + this.props.placesLeft : null}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="column column is-half is-one-quarter" style={{margin : 'auto'}}>
                    <div dangerouslySetInnerHTML={{__html: legend}}/>
                    <Pie ref="chart" data={data} options={options}/>
                </div>
            </div>
        )
    }
}

export default ChartTabComponent;

