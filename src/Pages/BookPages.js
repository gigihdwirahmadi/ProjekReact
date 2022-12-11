import logo from '../logo.svg';
import type { PaginationProps } from 'antd';
import { useEffect, useState } from 'react';
import axios from 'axios';
import BookDiv from '../component/BookDiv'
import '../App.css';
import { Pagination } from 'antd';
function BookPages() {

  const [Data, setData] = useState([]);
  const [Page,SetPage] = useState(1)
  const [Total,SetTotal] = useState([])
  
  const NextPage=()=>{
    if(Page<Total/3)
    SetPage(Page+1);
    console.log(Page)

  }
  const PrevPage=()=>{
    if(Page>1){
    SetPage(Page-1);
    }
  }

  const getAllBook = async () => {
    try {
      const response = await axios.get(
        ` http://localhost:3004/books?_page=${Page}&&_limit=3`
      );
      const response2 = await axios.get(
        ` http://localhost:3004/books`
      );
      
      if (response.status === 200 && response2.status === 200) {
        setData(response.data);
        SetTotal(response2.data.length);
      }
      console.log(response.data);
      console.log(response2.data.length)
    } catch (error) {
      console.log(error);
    }
  };
  const onChange: PaginationProps['onChange'] = (pageNumber) => {
    SetPage( pageNumber);
  };
  useEffect(() => { getAllBook(); }, [Page]);
  return (
    <div className="wall">
      <div className="Bookwall">
     
      {Data?.map((item) => (
        <BookDiv title={item.title} desc={item.desc} author={item.author} image={item.cover} id={item.id} genres={item.genre}
        />
        ))}
         <div>
         <button class="btnpage"onClick={PrevPage}>Prev</button>
          <button class="btnpage" onClick={NextPage}>Next</button>
    </div>
    </div>
    </div>
  );
}

export default BookPages;
