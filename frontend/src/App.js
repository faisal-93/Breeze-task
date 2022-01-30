import React from 'react'
import axios from 'axios'
import { useState, useEffect,useRef  } from 'react'
import { ScatterChart, Scatter, XAxis, 
  YAxis, CartesianGrid, Tooltip, Cell, Legend } from 'recharts'

function App() {
  const [data, setData] = useState([]);             // array variable to save all the data coming from server
  const countRef = useRef(0);                       // counter to calculate time

  useEffect(() => {
    countRef.current++;                             // increament the counter on every server request
    const interval = setInterval(() => {      
        axios.get('http://localhost:8080/data')     // making request to server
            .then(response => {
              let value = response.data;
              let color = "green";

              // checking values and deciding which color group it falls in
              if (value <= 1000) {
                color = "green";
              } else if (value > 1000 && value <= 2000) {
                color = "yellow";
              } else {
                color = "red";
              }
              // creating new object to push in to the array
              const newMeasurement = {
                time: 10*countRef.current, threshold: value, color: color
              }
              setData([...data, newMeasurement])     // pushing new measurements into array
            }).catch(err => {
                console.log(err)
            })
    }, 3000);
    return () => clearInterval(interval);
}, [data])

  //create custom legends for chart
  const renderLegend = () => {  
    return (
      <ul style={{display: "flex"}}>
        <li style={{paddingRight: 40, color: 'green'}}> &#60;=1000 ppm </li>
        <li style={{paddingRight: 40, color: 'yellow'}}> 1000ppm - 2000 ppm </li>
        <li style={{paddingRight: 40, color: 'red'}}> &#62;2000 ppm</li>
      </ul>
    );
  }

  return (
    <ScatterChart
      width={1400}
      height={700}
      margin={{ top: 20, right: 20, bottom: 20, left: 20 }} >
      <CartesianGrid />
      <XAxis type="number" dataKey="time" name="Time" unit="sec" />
      <YAxis type="number" dataKey="threshold" name="CO2 Measurement" unit="PPM" />
      <Tooltip cursor={{ strokeDasharray: '3 3' }} />
      <Legend content={renderLegend} verticalAlign='top' align='center' layout='vertical' />
      <Scatter name="CO2 Measurement" data={data} fill="#8884d8" isAnimationActive={true}>
        {
          data.map((data, index) => <Cell key={`cell-${index}`} fill={data.color} />)
        }
      </Scatter>
    </ScatterChart>
  );
}

export default App;
