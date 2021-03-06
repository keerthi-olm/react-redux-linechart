import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { showtip,hidetip,getMapData} from '../actions/linechartActions'; 
import * as d3 from "d3";
import {Axis,Grid} from '../charts/ChartTools';
import {mapSvg} from '../charts/resource/mapSvg';
import {rainFallData} from '../charts/chartDefaults';


class ToolTip extends React.Component{ 
    static propTypes = {
        toolTip:PropTypes.object
    }
    render (){

        var visibility="hidden";
        var transform="";
        var x=0;
        var y=0;
        var width=150,height=70;
        var transformText='translate('+width/2+','+(height/2-5)+')';
        var transformArrow="";

        if(this.props.toolTip.display===true){
            var position = this.props.toolTip.pos;

            x= position.x;
            y= position.y;
            visibility="visible";

            //console.log(x,y);

            if(y>height){
                transform='translate(' + (x-width/2) + ',' + (y-height-20) + ')';
                transformArrow='translate('+(width/2-20)+','+(height-2)+')';
            }else if(y<height){

                transform='translate(' + (x-width/2) + ',' + (Math.round(y)+20) + ')';
                transformArrow='translate('+(width/2-20)+','+0+') rotate(180,20,0)';
            }


        }else{
            visibility="hidden"
        }

        return (
            <g transform={transform}>
                <rect className="shadow"  width={width} height={height} rx="5" ry="5" visibility={visibility} fill="#6391da" opacity=".9"/>
                <polygon className="shadow"  points="10,0  30,0  20,10" transform={transformArrow}
                         fill="#6391da" opacity=".9" visibility={visibility}/>
                <text  visibility={visibility} transform={transformText}>
                    <tspan  x="0" textAnchor="middle" fontSize="15px" fill="#ffffff">{this.props.toolTip.dataTip.key}</tspan>
                    <tspan  x="0" textAnchor="middle" dy="25" fontSize="20px" fill="#a9f3ff">{this.props.toolTip.dataTip.value+"millimeters"}</tspan>
                </text>
            </g>
        );
    }
}

class Dots extends React.Component{   
    static propTypes = {
        data:PropTypes.array,
        showToolTip:PropTypes.func,
        hideToolTip:PropTypes.func,
        x:PropTypes.func,
        y:PropTypes.func

    } 

    render (){
        // function x(data.date) and y(data.date) will return the x and y psotion of the data point
        // then use map to iterate through to produce each circle and store it in circles
        // remove last & first point..
        // var data=this.props.data.splice(1);
        // data.pop();
        var data=this.props.data;

        return(
            <g>
                      {data.map( (d, i ) => <circle className="dot" r="7" cx={this.props.x(d.date)} cy={this.props.y(d.count)} fill="#7dc7f4"
                            stroke="#3f5175" strokeWidth="5px" key={i}
                            onMouseOver={this.props.showToolTip} onMouseOut={this.props.hideToolTip}
                            data-key={d3.timeFormat("%b %e")(d.date)} data-value={d.count}/> )}
            </g>
        );
    }
}


export class LineChart extends React.Component {   


  constructor(props, context) {
    super(props, context);

    this.state = {
            toolTip:{ display:false,dataTip:{key:'',value:''}},
            width:800,
    };
    
  };
    
    componentDidMount() {
        // window.addEventListener('resize', this.resize);
    }
    render (){
        var {margin,data}= this.props;
        

        var w = this.state.width - (margin.left + margin.right),
            h = this.props.height - (margin.top + margin.bottom);

        var parseDate = d3.timeParse("%m-%d-%Y");

        data.forEach(function (d) {
            d.date = parseDate(d.day);
        });

        var x = d3.scaleTime()
            .domain(d3.extent(data, function (d) {
                return d.date;
            }))
            .rangeRound([0, w]);
         
        // var y = d3.scaleLinear()
        //     .domain([0,d3.max(data,function(d){
        //         return d.count+10;
        //     })])
        //     .range([h, 0]);
        // We are using fixed y domain value of 50 for consistancy in height.
        var y = d3.scaleLinear()
            .domain([0,50])
            .range([h, 0]);

        var yAxis = d3.axisLeft()
            .scale(y)
            .ticks(5);

        var xAxis = d3.axisBottom()
            .scale(x).tickFormat(d3.timeFormat("%b"))
            .tickValues(data.map(function(d,i){
                if(i>0) {
                    return d.date;
                } return false;
            }).splice(1))
            .ticks(4);

            

        // var xGrid = d3.axisBottom()
        //     .scale(x)
        //     .orient('bottom')
        //     .ticks(5)
        //     .tickSize(-h, 0, 0)
        //     .tickFormat("");


        var yGrid = d3.axisLeft()
            .scale(y)
            .ticks(5)
            .tickSize(-w, 0, 0)
            .tickFormat("");

        //  For refrerence- The diffrent types of line charts. 'cardinal' = curved lines
        // var interpolations = [
        //     "linear",
        //     "step-before",
        //     "step-after",
        //     "basis",
        //     "basis-closed",
        //     "cardinal",
        //     "cardinal-closed"];

        var line = d3.line()
            .x(function (d) {
                return x(d.date);
            })
            .y(function (d) {
                return y(d.count);
            }).curve(d3.curveCardinal);

        var transform='translate(' + margin.left + ',' + margin.top + ')';

        return (
            <div className='row redoxLineChart' > {mapSvg(this.mapCick)}
            <div className='col2'>
                   <svg   id={this.props.chartId}     viewBox="0 0 800 300"
  preserveAspectRatio="xMinYMin meet" width='100%'>

                    <g transform={transform}>

                        <Grid h={h} grid={yGrid} gridType="y"/>
                        {/*<Grid h={h} grid={xGrid} gridType="x"/> */}
                        <Axis h={h} axis={yAxis} axisType="y" />
                        <Axis h={h} axis={xAxis} axisType="x"/>
                        <path className="line shadow" d={line(data)} strokeLinecap="round"/>
                        <Dots data={this.props.data} x={x} y={y} showToolTip={this.showToolTip} hideToolTip={this.hideToolTip}/>
                        <ToolTip toolTip={this.props.toolTip}/>


                    </g>

                </svg> </div><div className='col3'><h3>2017 Rain fall for <span>{this.props.region}</span></h3></div>
               
            </div>
        );
    }
    //foo = (e) => {.....} -- this preserves 'this' within even handlers
    showToolTip = (e) =>{

        e.target.setAttribute('fill', '#FFFFFF');


           var payload={
           
                display:true,
                dataTip: {
                    key:e.target.getAttribute('data-key'),
                    value:e.target.getAttribute('data-value')
                    },
                pos:{
                    x:e.target.getAttribute('cx'),
                    y:e.target.getAttribute('cy')
                }

                
        };
        this.props.showtip(payload);
    }
    hideToolTip = (e) =>{
        e.target.setAttribute('fill', '#7dc7f4');

        var payload= { 
                        display:false,
                        dataTip:{key:'',value:''}
                    };

        this.props.hidetip(payload);

    }

    mapCick = (e) => {
      //rainFallData is imported in ie  import {rainFallData} from '../charts/chartDefaults';
       let target='' ;
       e.target.id==='northernIreland' ?   target ='Northern Ireland' :   target = e.target.id;
        var payload = {data:rainFallData[e.target.id],region:target};
        
        this.props.getMapData(payload);
    }

      // resize = (e) =>{
      //   const container = this.state.container;
      //   let chartWidth = getChartSize(container)[0];
      //   let chartHeight = getChartSize(container)[1];
        
      // var payload= { 
      //     width: chartWidth,
      //     height: chartHeight
      //   };
      //    // this.props.resize(payload);
  
      // }

};
    LineChart.propTypes = {
        width:PropTypes.number,
        height:PropTypes.number,
        chartId:PropTypes.string,
        margin:PropTypes.object,
        data:PropTypes.array,
        data2:PropTypes.array,
        toolTip:PropTypes.object,
        region:PropTypes.string
    }
    

const mapStateToProps = state => ({
 ...state.linechart,toolTip:state.toolTip
  
});    

export default connect(mapStateToProps,{showtip,hidetip,getMapData})(LineChart);
