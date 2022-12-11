import React from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
const BookDiv = ({ title, author, image, desc, id }) => {
    const navigate = useNavigate();
    const NavigateBookdetail = () =>{
        navigate(`/${id}`, {
            replace: true,
            state:{},
        });
    }
    const arrdesc= desc.split('.')
    const description= arrdesc[0]
  return (
    <div class="bookdiv ">
     
        <div class="imagediv">
          <img class="image" src={image} />
        </div>
        <div class="text">
          <div class="title">
          {title}
          </div>
          <div class="description">
        {description} </div>
        <div class="button">
        <button class="btn " onClick={NavigateBookdetail}> Detail</button>
        </div>
        </div>
     
    </div>
  );
};
export default BookDiv;
