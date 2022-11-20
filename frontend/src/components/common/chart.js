import React, {useRef, useEffect, useState} from "react";
//minimize the required charts used:
import * as echarts from 'echarts/core';
import { BarChart,
    PieChart,
    MapChart,
    HeatmapChart,
    LineChart} from 'echarts/charts';
import {
    TitleComponent,
    // The component types are defined with the suffix ComponentOption
    TooltipComponent,
    GridComponent,
    VisualMapComponent,
    // Dataset
    DatasetComponent,
    GraphicComponent,
    // Built-in transform (filter, sort)
    TransformComponent, LegendComponent
} from 'echarts/components';
// Features like Universal Transition and Label Layout
import { LabelLayout, UniversalTransition } from 'echarts/features';
// Import the Canvas renderer
// Note that introducing the CanvasRenderer or SVGRenderer is a required step
import { CanvasRenderer } from 'echarts/renderers';
// Register the required components
echarts.use([
    TitleComponent,
    GraphicComponent,
    TooltipComponent,
    GridComponent,
    DatasetComponent,
    TransformComponent,
    PieChart,
    BarChart,
    LineChart,
    MapChart,
    HeatmapChart,
    LabelLayout,
    UniversalTransition,
    CanvasRenderer,
    VisualMapComponent,
    LegendComponent
]);

import * as ReactDOM from "react-dom";
import variables from '../../styling/theme.module.scss';


const ReactECharts = (props) => {
    const chartRef = useRef(null);
    const [height, setHeight] = useState(200);

    //OnInit
    useEffect(() => {
        // Initialize chart
        let chart = undefined;
        if (chartRef.current !== null) {
            if(props.map){
                echarts.registerMap('world', props.map);
            }
            chart = echarts ? echarts.init(chartRef.current) : undefined;
            let currentDom =  ReactDOM.findDOMNode(chartRef.current);
            let newHeight = currentDom.parentNode.clientHeight - 45;
            if(props.offset){
                newHeight =currentDom.parentNode.parentNode.clientHeight - props.offset;
            }
            setHeight(newHeight);
            chart?.setOption(props.options);
            setTimeout(
                function() {
                    chart?.resize();
                }.bind(this),
                200
            );


            let doIt;
            function resizeWithTimeout(){
                console.log('do a resize');
                clearTimeout(doIt);
                doIt = setTimeout(resizeChart, 250);
            }
            let chartObservable = new ResizeObserver(resizeWithTimeout);

            chartObservable.observe(chartRef.current);
            window.addEventListener('resize', resizeWithTimeout);

            // Return cleanup function
            return () => {
                chart?.dispose();
                if(chartRef.current){
                    chartObservable.unobserve(chartRef.current);
                }
                window.removeEventListener('resize', resizeWithTimeout);
            };
        }
    }, []);

    const resizeChart = () => {
        let currentDom =  ReactDOM.findDOMNode(chartRef.current);
        if(currentDom){
            let newHeight = currentDom.parentNode.clientHeight - 45;
            if(props.offset){
                newHeight =currentDom.parentNode.parentNode.clientHeight - props.offset;
            }
            let newWidth = ReactDOM.findDOMNode(chartRef.current).parentNode.clientWidth;
            setHeight(newHeight);
            let chart = echarts.getInstanceByDom(chartRef.current);
            let options = chart?.getOption();

            options = setGraphicsPosition(options, newHeight, newWidth);
            chart?.setOption(options);

            setTimeout(
                function() {
                    chart?.resize();
                }.bind(this),
                10
            );
        }
    };

    const setGraphicsPosition = (options, newHeight, newWidth) => {
        if('graphic' in options){
            // get each element and aligned based on the sizes:
            let elements = options.graphic[0]['elements'];
            let elementsLeftOffset = 0;
            if('elementsLeftOffset' in options.graphic[0]){
                elementsLeftOffset = options.graphic[0]['elementsLeftOffset'];
            }
            let controlElement = newWidth;
            if(controlElement > newHeight){
                controlElement = newHeight;
            }

            // in case there are 2 elements:
            //
            //     element 2        element 1
            //
            if(elements.length === 2){
                // where the element Height represents the pie chart radius percentage, radius will be 40%
                // 20% if the donut whole will be the icon:
                if(elements[0].position_type === 'height'){
                    let iconHeight = 0.20 * controlElement;
                    elements[0].left = (newWidth / 2) - (0.30 * controlElement/5) - newHeight/20 + elementsLeftOffset;
                    elements[0]['style']['height'] = iconHeight;
                    elements[1].left = (newWidth / 2) + (0.30 * controlElement/5) - newHeight/20 + elementsLeftOffset;
                    elements[1]['style']['height'] = iconHeight;
                }else{
                    let iconWidth = 0.15 * controlElement;
                    elements[0].left = (newWidth / 2) + (0.30 * controlElement/5) - newHeight/20 + elementsLeftOffset;
                    elements[0]['style']['width'] = iconWidth;
                    elements[1].left = (newWidth / 2) - (0.35 * controlElement/5) - newHeight/20 + elementsLeftOffset;
                    elements[1]['style']['width'] = iconWidth;
                }
            }

            // in case there are 3 elements:
            //                      element 1
            //     element 3
            //                      element 2
            if(elements.length === 3){
                // where the element Height represents the pie chart radius percentage, radius will be 40%
                // 20% if the donut whole will be the icon:
                if(elements[0].position_type === 'height'){
                    let iconHeight = 0.20 * controlElement;
                    elements[2].left = (newWidth / 2) - (0.20 * controlElement/5) - newHeight/20 + elementsLeftOffset;
                    elements[2]['style']['height'] = iconHeight/1.25;

                    elements[0].left = (newWidth / 2) + (0.35 * controlElement/5) - newHeight/20 + elementsLeftOffset;
                    elements[1].left = (newWidth / 2) + (0.35 * controlElement/5) - newHeight/20 + elementsLeftOffset;

                    elements[0].top =(0.50 * newHeight) - iconHeight/4 + iconHeight/4;
                    elements[1].top = (0.50 * newHeight) - iconHeight/4 - iconHeight/2;

                    elements[0]['style']['height'] = iconHeight/1.5;
                    elements[1]['style']['height'] = iconHeight/1.5;
                }else{
                    let iconWidth = 0.15 * controlElement;

                    elements[2].left = (newWidth / 2) - (0.30 * controlElement/5) - newHeight/20 + elementsLeftOffset;
                    elements[2]['style']['width'] = iconWidth/1.25;

                    elements[0].left = (newWidth / 2) + (0.35 * controlElement/5) - newHeight/20 + elementsLeftOffset;
                    elements[1].left = (newWidth / 2) + (0.35 * controlElement/5) - newHeight/20 + elementsLeftOffset;

                    elements[1].top = (0.50 * newHeight) - iconWidth/2 + iconWidth/2;
                    elements[0].top = (0.50 * newHeight) - iconWidth/2 - iconWidth/4;

                    elements[0]['style']['width'] = iconWidth/1.5;
                    elements[1]['style']['width'] = iconWidth/1.5;
                }
            }
            // in case there are 4 elements:
            //
            //     element 4        element 1
            //
            //     element 3        element 2
            //
            if(elements.length === 4){
                if(elements[0].position_type === 'height'){
                    let iconHeight = 0.20 * controlElement;
                    elements[2].left = (newWidth / 2) - (0.20 * controlElement/5) - newHeight/20 + elementsLeftOffset;
                    elements[3].left = (newWidth / 2) - (0.20 * controlElement/5) - newHeight/20 + elementsLeftOffset;

                    elements[3].top =(0.50 * newHeight) - iconHeight/4 + iconHeight/4;
                    elements[2].top = (0.50 * newHeight) - iconHeight/4 - iconHeight/2;

                    elements[2]['style']['height'] = iconHeight/1.5;
                    elements[3]['style']['height'] = iconHeight/1.5;

                    elements[0].left = (newWidth / 2) + (0.35 * controlElement/5) - newHeight/20 + elementsLeftOffset;
                    elements[1].left = (newWidth / 2) + (0.35 * controlElement/5) - newHeight/20 + elementsLeftOffset;

                    elements[1].top =(0.50 * newHeight) - iconHeight/4 + iconHeight/4;
                    elements[0].top = (0.50 * newHeight) - iconHeight/4 - iconHeight/2;

                    elements[0]['style']['height'] = iconHeight/1.5;
                    elements[1]['style']['height'] = iconHeight/1.5;
                }else{
                    let iconWidth = 0.15 * controlElement;

                    elements[2].left = (newWidth / 2) - (0.30 * controlElement/5) - newHeight/20 + elementsLeftOffset;
                    elements[3].left = (newWidth / 2) - (0.30 * controlElement/5) - newHeight/20 + elementsLeftOffset;

                    elements[2].top = (0.50 * newHeight) - iconWidth/2 + iconWidth/2;
                    elements[3].top = (0.50 * newHeight) - iconWidth/2 - iconWidth/4;

                    elements[2]['style']['width'] = iconWidth/1.5;
                    elements[3]['style']['width'] = iconWidth/1.5;

                    elements[0].left = (newWidth / 2) + (0.35 * controlElement/5) - newHeight/20 + elementsLeftOffset;
                    elements[1].left = (newWidth / 2) + (0.35 * controlElement/5) - newHeight/20 + elementsLeftOffset;

                    elements[1].top = (0.50 * newHeight) - iconWidth/2 + iconWidth/2;
                    elements[0].top = (0.50 * newHeight) - iconWidth/2 - iconWidth/4;

                    elements[0]['style']['width'] = iconWidth/1.5;
                    elements[1]['style']['width'] = iconWidth/1.5;
                }
            }

            // in case there are 5 elements:
            //
            //                      element 1
            //      element 5
            //                      element 2
            //      element 4
            //                      element 3
            //
            if(elements.length === 5){
                if(elements[0].position_type === 'height'){
                    let iconHeight = 0.20 * controlElement;
                    elements[3].left = (newWidth / 2) - (0.20 * controlElement/5) - newHeight/20 + elementsLeftOffset;
                    elements[4].left = (newWidth / 2) - (0.20 * controlElement/5) - newHeight/20 + elementsLeftOffset;

                    elements[3].top =(0.50 * newHeight) - iconHeight/4 + iconHeight/4;
                    elements[4].top = (0.50 * newHeight) - iconHeight/4 - iconHeight/2;

                    elements[3]['style']['height'] = iconHeight/1.5;
                    elements[4]['style']['height'] = iconHeight/1.5;

                    elements[0].left = (newWidth / 2) + (0.35 * controlElement/5) - newHeight/20 + elementsLeftOffset;
                    elements[1].left = (newWidth / 2) + (0.35 * controlElement/5) - newHeight/20 + elementsLeftOffset;
                    elements[2].left = (newWidth / 2) + (0.35 * controlElement/5) - newHeight/20 + elementsLeftOffset;

                    elements[2].top = (0.50 * newHeight)  + iconHeight/4.5;
                    elements[1].top = (0.50 * newHeight) - iconHeight/3.5;
                    elements[0].top = (0.50 * newHeight) - iconHeight/1.25;

                    elements[0]['style']['height'] = iconHeight/2;
                    elements[1]['style']['height'] = iconHeight/2;
                    elements[2]['style']['height'] = iconHeight/2;
                }else{
                    let iconWidth = 0.15 * controlElement;

                    elements[3].left = (newWidth / 2) - (0.30 * controlElement/5) - newHeight/20 + elementsLeftOffset;
                    elements[4].left = (newWidth / 2) - (0.30 * controlElement/5) - newHeight/20 + elementsLeftOffset;

                    elements[3].top = (0.50 * newHeight) - iconWidth/2 + iconWidth/2;
                    elements[4].top = (0.50 * newHeight) - iconWidth/2 - iconWidth/4;

                    elements[3]['style']['width'] = iconWidth/1.5;
                    elements[4]['style']['width'] = iconWidth/1.5;

                    elements[0].left = (newWidth / 2) + (0.35 * controlElement/5) - newHeight/20 + elementsLeftOffset;
                    elements[1].left = (newWidth / 2) + (0.35 * controlElement/5) - newHeight/20 + elementsLeftOffset;
                    elements[2].left = (newWidth / 2) + (0.35 * controlElement/5) - newHeight/20 + elementsLeftOffset;

                    elements[2].top = (0.50 * newHeight)  + iconWidth/3;
                    elements[1].top = (0.50 * newHeight) - iconWidth/3;
                    elements[0].top = (0.50 * newHeight) - iconWidth;

                    elements[0]['style']['width'] = iconWidth/2;
                    elements[1]['style']['width'] = iconWidth/2;
                    elements[2]['style']['width'] = iconWidth/2;
                }
            }

            // in case there are 6 elements:
            //
            //       element 6      element 1
            //
            //       element 5      element 2
            //
            //       element 4      element 3
            //
            if(elements.length === 6){
                if(elements[0].position_type === 'height'){
                    let iconHeight = 0.20 * controlElement;
                    elements[3].left = (newWidth / 2) - (0.20 * controlElement/5) - newHeight/20 + elementsLeftOffset;
                    elements[4].left = (newWidth / 2) - (0.20 * controlElement/5) - newHeight/20 + elementsLeftOffset;
                    elements[5].left = (newWidth / 2) - (0.20 * controlElement/5) - newHeight/20 + elementsLeftOffset;

                    elements[3].top = (0.50 * newHeight)  + iconHeight/4.5;
                    elements[4].top = (0.50 * newHeight) - iconHeight/3.5;
                    elements[5].top = (0.50 * newHeight) - iconHeight/1.25;

                    elements[3]['style']['height'] = iconHeight/2;
                    elements[4]['style']['height'] = iconHeight/2;
                    elements[5]['style']['height'] = iconHeight/2;

                    elements[0].left = (newWidth / 2) + (0.35 * controlElement/5) - newHeight/20 + elementsLeftOffset;
                    elements[1].left = (newWidth / 2) + (0.35 * controlElement/5) - newHeight/20 + elementsLeftOffset;
                    elements[2].left = (newWidth / 2) + (0.35 * controlElement/5) - newHeight/20 + elementsLeftOffset;

                    elements[2].top = (0.50 * newHeight)  + iconHeight/4.5;
                    elements[1].top = (0.50 * newHeight) - iconHeight/3.5;
                    elements[0].top = (0.50 * newHeight) - iconHeight/1.25;

                    elements[0]['style']['height'] = iconHeight/2;
                    elements[1]['style']['height'] = iconHeight/2;
                    elements[2]['style']['height'] = iconHeight/2;
                }else{
                    let iconWidth = 0.15 * controlElement;

                    elements[3].left = (newWidth / 2) - (0.30 * controlElement/5) - newHeight/20 + elementsLeftOffset;
                    elements[4].left = (newWidth / 2) - (0.30 * controlElement/5) - newHeight/20 + elementsLeftOffset;
                    elements[5].left = (newWidth / 2) - (0.30 * controlElement/5) - newHeight/20 + elementsLeftOffset;

                    elements[3].top = (0.50 * newHeight)  + iconWidth/3;
                    elements[4].top = (0.50 * newHeight) - iconWidth/3;
                    elements[5].top = (0.50 * newHeight) - iconWidth;

                    elements[3]['style']['width'] = iconWidth/2;
                    elements[4]['style']['width'] = iconWidth/2;
                    elements[4]['style']['width'] = iconWidth/2;

                    elements[0].left = (newWidth / 2) + (0.35 * controlElement/5) - newHeight/20 + elementsLeftOffset;
                    elements[1].left = (newWidth / 2) + (0.35 * controlElement/5) - newHeight/20 + elementsLeftOffset;
                    elements[2].left = (newWidth / 2) + (0.35 * controlElement/5) - newHeight/20 + elementsLeftOffset;

                    elements[2].top = (0.50 * newHeight)  + iconWidth/3;
                    elements[1].top = (0.50 * newHeight) - iconWidth/3;
                    elements[0].top = (0.50 * newHeight) - iconWidth;

                    elements[0]['style']['width'] = iconWidth/2;
                    elements[1]['style']['width'] = iconWidth/2;
                    elements[2]['style']['width'] = iconWidth/2;
                }
            }
        }
        return options;
    };

    useEffect(() => {
        let chart = echarts.getInstanceByDom(chartRef.current);
        let options = props.options;

        let currentDom =  ReactDOM.findDOMNode(chartRef.current);
        let newHeight = currentDom.parentNode.clientHeight - 45;
        if(props.offset){
            newHeight =currentDom.parentNode.parentNode.clientHeight - props.offset;
        }
        let newWidth = ReactDOM.findDOMNode(chartRef.current).parentNode.clientWidth;
        setHeight(newHeight);
        options = setGraphicsPosition(options, newHeight, newWidth);

        setTimeout(
            function() {
                chart?.setOption(options);
                chart?.resize();
            }.bind(this),
            200
        );
    }, [props.refresh]); // Only re-run the effect if options changes

    useEffect(()=>{
        let chart = echarts.getInstanceByDom(chartRef.current);
        if(props.loading){
            chart?.showLoading('default', {
                text: '',
                color: variables.primary,
                maskColor: 'rgba(255, 255, 255, 1)',
                zlevel: 0,
                fontSize: 12,
                showSpinner: true,
                spinnerRadius: 15,
            });
        }else{
            chart?.hideLoading();
            setTimeout(
                function() {
                    chart?.resize();
                }
                    .bind(this),
                150
            );
        }
    },[props.loading]);

    return <div ref={chartRef} style={{ width: "100%", height: height, ...props.style }} />;
};

export default ReactECharts;
