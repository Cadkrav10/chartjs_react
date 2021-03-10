import React, {useEffect, useState} from 'react';

import { Line } from 'react-chartjs-2';

import axios from 'axios';


const Dankmeme = () => {
  const [chartData, seChartData] = useState({});
  //const [employeeSalary, setEmployeeSalary] = useState([]);
  //const [employeeAge, setEmployeeAge] = useState([]);


  const chart = () => {
    let empSal = [];
    let empAge = [];

    //axios.get(`http://dummy.restapiexample.com/api/v1/employees`)
    axios.get(`http://localhost:56388/api/employee_react`)
      .then(res => {
        //console.log(res)
        for (const dataObj of res.data) {
           empSal.push(parseInt(dataObj.employee_salary));
           empAge.push(parseInt(dataObj.employee_age));
           //empSal.push(dataObj.employee_salary);
          //empAge.push(dataObj.employee_age);
        }
        seChartData({
            labels: empAge,
            datasets: [{
            label: "Salario",
            data: empSal,
            backgroundColor: ["green"],
            borderWidth: 4
      }]
    })

      })
      .catch(err => {
        //console.log(err)
      });
    //console.log(empSal, empAge);
    
  }

  useEffect(() => {
    chart()
  }, [])
    
  return (
    <div className="container-fluid">
      <h1>Dankmeme</h1>
      <div style={{ height: "500px", width: "500px" }}>
        <Line data={
          chartData
        } options={{
          
          responsive: true,
          title: { text: "Idade", display: true },
          
          scales: {
            yAxes: [
              {
                tickets: {
                  autoSkip: true,
                  maxTicktsLimit: 10,
                  beginAtZero: true,
                  
                },
                
                gridLines: {
                  display: true
                }
              }
            ],

            xAxes: [
              {
                gridLines: {
                  display: true
                }
              }
            ]
          }
        }}></Line>
      </div>
    </div>
  )
}
export default Dankmeme;