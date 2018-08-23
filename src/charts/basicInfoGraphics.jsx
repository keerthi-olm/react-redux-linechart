import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import * as d3 from "d3";


//http://bl.ocks.org/d3noob/8952219
//https://plnkr.co/edit/WjmCzZ?p=preview
//C:\Temp\react-d3-current-28-01-2018\src
export class InfoGraphicsChart extends React.Component {   

 render = () => {
    var {widthFn,heightFn,margin,radius,innerRadius,arcSizeInAngle,parseDate,xScale,yScale,data} = this.props;
    this.colorScale = d3.interpolateHsl(d3.rgb('#e8e2ca'), d3.rgb('#3e6c0a'));
    var parseDate = d3.timeParse("%Y-%m");
        data.forEach(function(d) {
        d.date = parseDate(d.date);
        d.value = +d.value;
      });

    // Possible bug when you try to set the sacels via defaultProps. Needs further investigation    
    //Scales worked out in 2 parts frts define scale, then map scale to domain of data
//     easeElastic
// easeBounce
// easeLinear
// easeSin
// easeQuad
// easeCubic
// easePoly
// easeCircle
// easeExp
// easeBack
var N = d3.max(data, function(d) { return d.value; }); // Y domain values as a an array
var domain=Array.apply(null, {length: N+1}).map(Number.call, Number);
domain.shift();
    xScale= d3.scaleBand().range([0, widthFn(margin)], .05).padding(0.1);
    yScale= d3.scaleBand().range([0, heightFn(margin)], 0.05).padding(0.05);
    // yScale=d3.scaleLinear().range([heightFn(margin), 0]);
    xScale.domain(data.map(function(d) { return d.date; }));
     // yScale.domain([0, d3.max(data, function(d) { return d.value; })]);
   yScale.domain(domain); // Function to map domain to scale.
    return (
      <svg width= {widthFn(margin)} height={heightFn(margin)+100} >
        {/* formula for dgerees to rads :::->  deg * Math.PI / 180 */}

        <g transform={`translate(${margin.left} ,${margin.top})`}>

        </g>       {/* Put the image that is to be clipped here and set the clip path attribute*/} 

        
          
         {data.map(
                   (value, i ) => <Bar 
                   value={value}
               xScale={xScale}
               yScale={yScale}
               fill={this.colorScale(0.05*1) } />
          )}
                
    


      </svg>
    );
  }


};


class Bar extends React.Component {

  componentDidMount() { 
        // can initiate animation here

            //     bar.transition()
            // .duration(animationDuration)
            // .attr("y", 0)
            // .attr("height", height);

   // var bar=d3.select(this.refs.bar).data([this.props.value])
   //                     .attr('y',500)
   //                     .attr('height',500)
   //                     .transition()
   //                     .ease(d3.easeLinear)  
   //         .duration(3000).delay(1000)
   //         .attr("height", 500 - this.props.yScale(this.props.value.value))
   //         .attr("y", this.props.yScale(this.props.value.value));

           // TODO info graphics : turn data value  into array of value size then draw image
           // ie coins for evry unit into array then var N = 10;  Array.apply(null, {length: N}).map(Number.call, Number)
           // Charts using grid : https://codepen.io/robinrendle/pen/470df4328fc964a0fc358395105d2a
             
   }

  render = () => {
    let {xScale,yScale, value} = this.props
    let {arcSize, fill, innerRadius = 0, outerRadius,startAngle=0} = this.props;
    // https://github.com/d3/d3/wiki/SVG-Shapes#arc
    // for alice settings see http://d3indepth.com/shapes/#arc-generator
    // can add the following to make prettier .padAngle(.02) .padRadius(100) .cornerRadius(4);

    return (
      <InfoGraphic ref='infoBar'

          height={0}
          xScale={xScale}
          yScale={yScale}
          value={value} />
                
        );
      }
    }

class InfoGraphic extends React.Component {

  componentDidMount() { 
        // can initiate animation here

            //     bar.transition()
            // .duration(animationDuration)
            // .attr("y", 0)
            // .attr("height", height);

            // Template functions, markup genrator

            // push to buffer ther return buffer https://stackoverflow.com/questions/40476075/how-to-concatenate-jsx-elements-into-an-array
       
          }
    render = () => {
     

//        var buffer = []
// for (var i = this.props.value.value ; i >= 0; i--) {
//           buffer.push(<div>AAA</div>);
//         buffer.push(<div>BBB</div>);
//         buffer.push(<div>C</div>);
// };
var width,height;
var svgTags=this.svgStack(width=this.props.xScale.bandwidth(this.props.value.date),height=this.props.yScale.bandwidth(this.props.value.value));



return (  <svg>{svgTags}</svg>
  )

// return (  <svg x={this.props.xScale(this.props.value.date)} 
// height={this.props.yScale(this.props.value.value)} 
//   width={this.props.xScale.bandwidth(this.props.value.date)}> <path d={test} transform= "translate(0 0)"></path>
// </svg>
//   )

//tips : Template literals  ::-->   `string text ${expression} string text`   ""  
    }
svgStack (width,height) { console.log(width+'------>>>>>>>>>>'+height);
                   var buffer = [], vb="0 0 "+width+" "+this.props.yScale(this.props.value.value);
       
                  buffer=this.coins(width,height);
                  return buffer


      }

      coins (width,height) { console.log(width+'------>>>>>>>>>>'+height);
                   var buffer = [],yValue=170,top=0,vb,height=28;

        for (var i = 1 ; i <= this.props.value.value; i++) {
                  // yValue=yValue-((this.props.value.value-i)*height); 
                  if (i=== this.props.value.value) { top=1,height=135}

                    top===1 ?  vb = "0 0 185.41946 38.4993" : vb = "0 0 185.41946 38.4993" ;
                  buffer.push(<svg x={this.props.xScale(this.props.value.date)} width={width} height={height} viewBox={vb} y={(260-height)-this.props.yScale(i)} > {this.coinsData(width,height,top)}</svg>);

        };
        return buffer
      }
      coinsData (width,height,top) {  
if (top) {
  return ( <svg

   width="186.03"
   height="256"
   viewBox="0 0 186.03 256">
  
      
    


<g
   transform="translate(0.3770416,96.98194)"
   id="gcoin" ><path class='coin'
     d="m 92.629131,101.875 c -51.358536,0 -93.0061726,8.52363 -93.0061726,19.04627 v 19.05054 c 0,10.53121 41.6476366,19.04626 93.0061726,19.04626 51.378069,0 93.025729,-8.52363 93.025729,-19.04626 V 120.92127 C 185.63811,110.39863 144.0072,101.875 92.629131,101.875 z m 0,33.3381 c -51.096001,0 -83.6974565,-8.46357 -83.6974565,-14.29183 0,-5.834 32.6014555,-14.28327 83.6974565,-14.28327 51.112739,0 83.714229,8.44927 83.714229,14.28327 -0.0168,5.82826 -32.61824,14.29183 -83.714229,14.29183 z"
     id="coin"
      /></g><g class='ghair'><path class='hair' 
   d="m 88.838316,1.5729079 c -2.780312,0.03713 -4.392068,0.750967 -6.846817,2.843905 -0.794253,0.677208 -1.557506,1.230295 -1.693872,1.230295 -0.191511,0 -0.229241,0.138603 -0.160472,0.6062221 0.05785,0.393457 0.0091,0.744895 -0.151555,0.998493 -0.228706,0.360217 -0.209259,0.478862 0.240724,1.577964 0.268064,0.654875 0.530887,1.595353 0.588394,2.086143 0.333993,2.85026 0.66479,4.41533 1.248108,5.96421 0.349434,0.92783 0.666144,1.73108 0.713207,1.783 0.04699,0.0518 0.0362,-1.39655 -0.02668,-3.21835 -0.113055,-3.27322 -0.106286,-3.31609 0.249625,-3.68193 0.63933,-0.65713 1.646462,-0.80445 5.268831,-0.76669 1.868464,0.0195 3.575385,0.0466 3.797834,0.0624 0.222434,0.0157 1.28218,-0.035 2.353587,-0.11593 1.654714,-0.12516 2.04933,-0.1008 2.621028,0.15155 0.959124,0.42338 1.080975,0.93709 0.775622,3.30752 -0.132343,1.02742 -0.247906,2.50039 -0.249627,3.28075 -0.0042,1.6309 0.14652,1.61367 0.615139,-0.0802 0.176909,-0.63943 0.473941,-1.44456 0.659726,-1.79193 0.187312,-0.35025 0.415559,-1.26399 0.517064,-2.05048 0.236797,-1.83447 0.09313,-5.572917 -0.240704,-6.285141 -0.260246,-0.55519 -1.292687,-1.6492951 -1.560135,-1.6492951 -0.08778,0 -0.250121,-0.220385 -0.356615,-0.490326 -0.993642,-2.518956 -2.949823,-3.557573 -7.087491,-3.74435 -0.450715,-0.02033 -0.877685,-0.02325 -1.274867,-0.01783 z"
   id="hair"
   /></g> <g class='gbody' ><path class='body'
   d="m 97.985203,31.85751 c -0.09391,0.006 -0.06835,0.11226 0.124772,0.34768 0.347906,0.42413 0.357955,2.12847 0.0179,3.03114 -0.137527,0.36493 -0.537975,1.18952 -0.891516,1.83652 -0.810668,1.48361 -2.03602,5.06846 -3.467976,10.13645 -0.648276,2.29445 -1.167729,3.8541 -1.239197,3.72651 -0.06777,-0.12073 -0.167453,-0.66281 -0.222874,-1.20352 -0.05548,-0.54071 -0.316112,-2.52865 -0.579486,-4.41298 l -0.481424,-3.4234 0.517091,-1.1233 c 0.91702,-2.00378 0.921113,-1.93382 -0.374445,-3.26292 l -1.141121,-1.1679 -0.909347,0.8737 c -1.695029,1.62183 -1.636341,1.39642 -0.838019,3.17377 l 0.695373,1.5423 -0.436839,3.04897 c -0.24255,1.67781 -0.528204,3.679 -0.624054,4.43973 -0.09586,0.76072 -0.216901,1.38183 -0.276368,1.38183 -0.05942,0 -0.306675,-0.74132 -0.552743,-1.64929 -0.690132,-2.54645 -2.971454,-9.52527 -3.476881,-10.64463 -0.248602,-0.55057 -0.723746,-1.56089 -1.060901,-2.23769 -0.491813,-0.98727 -0.631531,-1.46711 -0.695374,-2.45166 -0.06564,-1.01106 -0.02471,-1.29591 0.213949,-1.58688 0.524789,-0.63973 -0.122428,-0.40687 -1.069802,0.38334 -1.556074,1.29805 -4.732805,2.81749 -7.800716,3.73543 -2.832207,0.84743 -3.656698,1.22579 -3.913721,1.77412 -0.459922,0.98117 -1.227992,4.93893 -2.184205,11.25085 -0.65374,4.31534 -2.001287,12.13212 -2.603211,15.12001 -0.451273,2.24012 -0.467037,2.46389 -0.303118,4.10987 0.172647,1.73347 0.663201,4.49 1.292685,7.24798 1.054361,4.61951 3.206629,12.24704 3.485807,12.36524 0.191684,0.0812 5.417892,-1.04233 5.928553,-1.27485 0.239676,-0.10915 0.285276,-0.0335 0.285276,0.52599 0,0.37321 0.139467,0.87778 0.320952,1.15896 0.954198,1.47835 1.757219,5.19926 1.363996,6.32971 -0.05407,0.15527 -0.266931,0.28528 -0.472483,0.28528 -0.298704,0 -0.435801,-0.17834 -0.65973,-0.85585 -0.154121,-0.46623 -0.424546,-1.20757 -0.606228,-1.64928 l -0.329853,-0.80237 -0.151571,1.95241 -0.160456,1.95241 0.454665,0.41901 c 0.392625,0.37256 0.542614,0.41541 1.292693,0.31203 1.09915,-0.1515 1.57238,0.008 1.506649,0.50816 -0.0384,0.29242 -0.277603,0.45748 -1.025233,0.71321 -0.533847,0.18261 -1.315918,0.33929 -1.738442,0.3566 -0.422539,0.0173 -0.770281,0.1158 -0.775624,0.21396 -0.0055,0.0982 -0.06997,0.58026 -0.142646,1.06981 -0.162424,1.09275 -0.108357,1.25091 0.490348,1.52449 l 0.472491,0.21396 0,3.86023 c 1.02e-4,4.35019 0.17105,8.40602 0.641896,14.92389 0.939497,13.00594 1.284484,19.2677 2.184189,39.6187 0.3837,8.67923 1.0411,21.67437 1.221374,24.2669 0.08844,1.27114 0.160471,2.45029 0.160471,2.62105 0,0.22656 0.149903,0.32511 0.570561,0.36551 l 0.579486,0.0535 -0.686464,0.75777 c -0.792632,0.88082 -2.060628,1.57883 -4.109861,2.25553 -1.998958,0.66012 -2.537755,0.9854 -2.870653,1.72062 -0.350442,0.77388 -0.367882,2.33131 -0.03565,3.04005 0.276927,0.59077 1.232778,1.18925 2.237691,1.40858 1.963078,0.42847 4.388305,0.1406 7.283632,-0.87368 l 2.041559,-0.71321 0.606228,0.33878 c 0.51835,0.29135 0.78743,0.32273 1.827594,0.20505 2.048091,-0.23171 2.09506,-0.32043 2.09506,-3.6552 0,-1.406 -0.08597,-2.3545 -0.30311,-3.21835 -0.301765,-1.20056 -0.301765,-1.22345 0,-1.31053 0.295334,-0.0852 0.301402,-0.36308 0.30311,-7.24797 0.0024,-15.24123 0.366142,-49.07346 0.659714,-61.68357 0.290707,-12.48701 0.569065,-16.72674 1.016324,-15.44097 0.137515,0.39537 0.407146,4.9476 0.508159,8.65658 0.04935,1.81592 0.123608,4.46959 0.169389,5.89287 0.153468,4.76976 0.385212,22.09267 0.472499,35.0631 0.04754,7.06737 0.132486,17.77331 0.187215,23.78549 0.09716,10.67634 0.111354,10.92991 0.419005,10.92991 0.225134,0 0.284734,0.0888 0.22289,0.31202 -0.569726,2.0563 -0.751573,4.83643 -0.445764,6.73983 0.100549,0.62591 0.188663,0.7431 0.722129,0.93608 0.953809,0.34503 2.738758,0.32389 3.236176,-0.0357 0.403172,-0.29144 0.479972,-0.28112 2.193117,0.32987 3.024775,1.07874 5.161745,1.3694 7.283645,0.98957 2.17527,-0.3894 2.88572,-1.24454 2.7191,-3.27184 -0.13619,-1.65693 -0.33731,-1.8432 -3.1203,-2.87958 -1.32638,-0.49394 -2.5863,-1.01055 -2.79933,-1.14113 -0.50105,-0.30711 -1.79194,-1.61647 -1.79194,-1.81868 0,-0.0857 0.2145,-0.16047 0.48142,-0.16047 0.43959,0 0.49033,-0.0541 0.49033,-0.57949 3e-4,-0.31901 0.1012,-2.34265 0.2318,-4.50213 0.19877,-3.28687 0.47647,-8.89542 1.14113,-23.29516 0.59122,-12.80846 0.77332,-16.67663 1.05198,-21.85982 0.30068,-5.59304 0.5961,-9.99296 1.21246,-18.38293 0.29864,-4.06524 0.56164,-10.81405 0.56164,-14.22851 l 0,-2.62996 0.50817,-0.28528 c 0.49954,-0.28497 0.50756,-0.3043 0.40118,-1.3016 -0.38907,-3.64723 -1.55124,-17.19892 -1.55124,-18.08873 0,-0.46918 0.0151,-0.46104 0.73104,0.3566 l 0.73104,0.83802 1.56015,-1.78302 c 4.29706,-4.93727 7.16673,-8.56883 9.07557,-11.48266 1.3237,-2.02063 2.46315,-4.50435 2.46057,-5.35798 -0.006,-1.5543 -1.90963,-9.32443 -3.49472,-14.25523 -1.8668,-5.80713 -3.90169,-10.70753 -4.9033,-11.81253 -0.49091,-0.54155 -0.88782,-0.74426 -2.21095,-1.15896 -3.71422,-1.16408 -4.38985,-1.41214 -5.71457,-2.09504 -0.76506,-0.39438 -1.84784,-0.91363 -2.40709,-1.15006 -0.55925,-0.23641 -1.386798,-0.74897 -1.8365,-1.14113 -0.542657,-0.4732 -1.020241,-0.7513 -1.176811,-0.73994 z"
   
    /></g></svg>
)
} else
  {
return ( <g transform="translate(3.4112195e-8,-116.6076)" id="g3053"><path className='coin' d="M 92.699987,165.8522 C 41.510531,165.8522 -3.4112195e-8,157.23722 -3.4112195e-8,146.6076 v 19.2446 C -3.4112195e-8,176.49194 41.510531,185.10692 92.699987,185.10692 c 51.208943,0 92.719473,-8.61498 92.719473,-19.25472 v -19.2446 c -0.0167,10.62962 -41.51053,19.2446 -92.719473,19.2446 z" id="path3103"  /></g>)

  }
        
  
      }

  }


    InfoGraphicsChart.propTypes = {
      width:PropTypes.number,
      height:PropTypes.number,
      radius:PropTypes.number,
      margin:PropTypes.object,
      width:PropTypes.func,
      height:PropTypes.func,
      xScale:PropTypes.func,
      yScale:PropTypes.func,
      color:PropTypes.func,


      data:PropTypes.array

                                
             
    }
    // use shape ie : 
    //  propTypes: {
    //   data: PropTypes.shape({
    //     id: PropTypes.number.isRequired,
    //     title: PropTypes.string
    //  })
    // }
    InfoGraphicsChart.defaultProps = {
    
      margin:{top: 20, right: 20, bottom: 20, left: 40},
      widthFn: (margin) => {return 600 - margin.left - margin.right},
      heightFn: (margin) => {return 200 - margin.top - margin.bottom},
      // xScale: ((widthFn) => {return d3.scaleBand().range([0, widthFn], .05);})(),
      // yScale: ((heightFn) => {return d3.scaleLinear().range([heightFn, 0]);})(),
      color: d3.schemeCategory10,
      parseDate: (date) => {return d3.timeParse("%Y-%m").parse},

      data: [
       {
         "date": "2013-01",
         "value": "2"
       },
       {
         "date": "2013-02",
         "value": "5"
       },
       {
         "date": "2013-03",
         "value": "10"
       },
       {
         "date": "2013-04",
         "value": "19"
       },
       {
         "date": "2013-05",
         "value": "16"
       },
       {
         "date": "2013-06",
         "value": "12"
       },
       {
         "date": "2013-07",
         "value": "11"
       },
       {
         "date": "2013-08",
         "value": "13"
       },
       {
         "date": "2013-09",
         "value": "3"
       },
      
      ]
           


    }
export default InfoGraphicsChart;


