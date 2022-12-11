import logo from '../logo.svg';
import { useEffect, useState } from 'react';
import Axios from 'axios';
import ModalAdd from '../component/ModalAdd';

import { ConfigProvider, Table } from 'antd';
import BookDiv from '../component/BookDiv'
import '../App.css';
import './BookData.css'
import { Button, Space } from 'antd';

function BookData() {

  const [change, setChange] = useState(0)
  const [loading, setloading] = useState(true);
  const [state, setstate] = useState([]);
  const getData = async () => {
    await Axios.get("http://localhost:3004/books").then(
      res => {
        setloading(false);
        setstate(
          res.data.map(row => ({
            id: row.id,
            title: row.title,
            author: row.author,
            genre: row.genre,
            desc: row.desc,
          }))
        );
      }
    );
  };

  const deleteData = async (e) => {
    try {
      const response = await Axios.delete("http://localhost:3004/books/" + e.id);
      setChange(change + 1);
      console.log(response);
    } catch (error) {
      console.log(error);
    }

  };
  const addChange = () => {
    setChange(change + 1)
  }

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      width: 15
    },
    {
      title: "Author",
      dataIndex: "author",
      width: 15
    },
    {
      title: "Genre",
      dataIndex: "genre",
      width: 10
    },
    {
      title: "Description",
      dataIndex: "desc",
      width: 40,
      ellipsis: true
    },
    {
      title: 'Action',
      key: 'operation',
      dataIndex: "id",
      fixed: 'right',
      width: 20,
      render: (_, record) => <>
        <Space>
          <Button style={{ backgroundColor: "black" }} onClick={() => {
            deleteData(record);
          }} type="primary" danger>
            Delete
          </Button>

          <ModalAdd fungsi={setChange} status="UPDATE" state={change} idupdate={record} />
        </Space>
      </>
    },
  ];
  useEffect(() => {
    getData();
  }, [change]);
  return (

    <div className='wall2'>
      <Space direction="vertical" size="middle" style={{ display: 'flex', paddingTop: "20px" }}>
        <div><ModalAdd fungsi={setChange} state={change} status={"ADD"} idupdate="" /></div>
        {loading ? (
          "Loading") : (
          <Table
            columns={columns}
            dataSource={state}
            rowClassName={"table-antd"}
          />
        )}
      </Space>
    </div>
  );
}
export default BookData;
