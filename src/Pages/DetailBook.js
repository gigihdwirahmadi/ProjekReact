
import React from 'react';
import { useParams, UseLocation, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './DetailBook.css';
import axios from 'axios';
const DetailBook = () => {
    const location = useLocation();
    console.log(location);
    const { id } = useParams();
    const [Data, setData] = useState([]);
    
    const getAllBook = async () => {
        try {
            const response = await axios.get(
                ` http://localhost:3004/books/${id}`
            );

            console.log(response)
            if (response.status === 200) {
                setData(response.data);
            }
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => { getAllBook(); }, []);
    return (
        <>
            <div class="container">
                
                    <div class="imagedivdtl">
                        <img src={Data.cover} ></img>
                    </div>
                    <div class="textdtl">
                        <div class="indiv">
                        <h1>{Data.title}</h1>
                        author: {Data.author}<br></br>
                        genre: {Data.genre}<br></br>
                        description: {Data.desc}<br></br>
                        </div>
                    </div>
         
            </div>
        </>
    );
};
export default DetailBook;