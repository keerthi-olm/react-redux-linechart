export const chartDefaults = {
    
        width: 2000,
        height: 300,
        chartId: 'v1_chart',
        margin:{top: 5, right: 50, bottom: 20, left: 50},
        data: [
            {day:'02-11-2016',count:80},
            {day:'02-12-2016',count:250},
            {day:'02-13-2016',count:150},
            {day:'02-14-2016',count:496},
            {day:'02-15-2016',count:140},
            {day:'02-16-2016',count:380},
            {day:'02-17-2016',count:100},
            {day:'02-18-2016',count:150}
        ]
     
    }

  export const  toolTip = {
            visibility:'hidden',
            display:false,
            dataTip: {
                key:'',
                value:''
                },
            pos:{
                x:0,
                y:0
            },
            width:150,
            height:70
            }