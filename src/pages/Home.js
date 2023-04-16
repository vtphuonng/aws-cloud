import React, { useState } from "react";
import './Home.scss';
import axios from "axios";

const getDataUrl = 'https://skodtuhe2m.execute-api.us-east-1.amazonaws.com/develop/api';

const Home = () => {
    const [name, setName] = useState('');
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [data, setData] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();

        const requestBody = {
            "Records": [
                {
                    "messageId": "059f36b4-87a3-44ab-83d2-661975830a7d",
                    "receiptHandle": "AQEBwJnKyrHigUMZj6rYigCgxlaS3SLy0a...",
                    "body": "{\n     \"CustID\": 1021,\n     \"Name\": \"Martha Rivera\"\n}",
                    "attributes": {
                    "ApproximateReceiveCount": "1",
                    "SentTimestamp": "1545082649183",
                    "SenderId": "AIDAIENQZJOLO23YVJ4VO",
                    "ApproximateFirstReceiveTimestamp": "1545082649185"
                    },
                    "messageAttributes": {},
                    "md5OfBody": "e4e68fb7bd0e697a0ae8f1bb342846b3",
                    "eventSource": "aws:sqs",
                    "eventSourceARN": "arn:aws:sqs:us-west-2:123456789012:my-queue",
                    "awsRegion": "us-west-2"
                }
                ]
            }
            

        axios.get(getDataUrl, requestBody)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => console.log(error))
    }

    return (
        <div className="wrapper">
            <div className="services">
                <h3>Find Hospitals</h3>
                <hr/>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="hos_name">Name</label>
                    <input type="text" id="hos_name" placeholder="Input hospital's name" name="name" value={name} onChange={event => setName(event.target.value)} />
                    <label htmlFor="city">City</label>
                    <input type="text" id="city" placeholder="Input city" name="city" value={city} onChange={event => setCity(event.target.value)} />
                    <label htmlFor="district">District</label>
                    <input type="text" id="district" placeholder="Input district" name="district" value={district} onChange={event => setDistrict(event.target.value)} />
                    <button className="button" type="submit">Find</button>
                </form>
            </div>
            <div className="inner tbl-header">
                <table cellpadding="0" cellspacing="0" border="0">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>District</th>
                            <th>City</th>
                            <th>Contact</th>
                        </tr>
                    </thead>
                </table>
            </div>
            <div className="inner tbl-content">
                <table cellpadding="0" cellspacing="0" border="0">
                    <tbody>
                        <tr>
                            <td>AAC</td>
                            <td>AUSTRALIAN COMPANY </td>
                            <td>$1.38</td>
                            <td>+2.01</td>
                            <td>-0.36%</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>    
    )
}

export default Home;