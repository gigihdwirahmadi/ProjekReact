import logo from '../logo.svg';
import { useEffect, useState } from 'react';
import Axios from 'axios';
import ModalAuthor from '../component/ModalAuthor';

import { ConfigProvider, Table } from 'antd';
import BookDiv from '../component/BookDiv'
import '../App.css';
import './BookData.css'
import { Button, Space } from 'antd';

function AuthorData() {

  const [change, setChange] = useState(0)
  const [loading, setloading] = useState(true);
  const [state, setstate] = useState([]);
  const getData = async () => {
    await Axios.get("http://localhost:3004/author").then(
      res => {
        setloading(false);
        setstate(
          res.data.map(row => ({
            id: row.id,
            value: row.value,
            biografi: row.biografi,
          }))
        );
      }
    );
  };

  const deleteData = async (e) => {
    try {
      const response = await Axios.delete("http://localhost:3004/author/" + e.id);
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
      title: "value",
      dataIndex: "value",
      width: 20
    },
    {
      title: "biografi",
      dataIndex: "biografi",
      
    },
    {
      title: 'Action',
      key: 'operation',
      dataIndex: "id",
      fixed: 'right',
      width: 20,
      render: (_, record) =>
        <Space>
          <Button style={{ backgroundColor: "black" }} onClick={() => {
            deleteData(record);
          }} type="primary" danger>
            Delete
          </Button>
          <ModalAuthor fungsi={setChange} status="UPDATE" state={change} idupdate={record} />
        </Space>
      
    },
  ];
  useEffect(() => {
    getData();
  }, [change]);
  return (

    <div className='wall2'>
      <div><ModalAuthor fungsi={setChange} state={change} status={"ADD"} idupdate="" /></div>
      {loading ? (
        "Loading") : (
        <>

          <Table
            columns={columns}
            dataSource={state}
            rowClassName={"table-antd"}
          />
        </>
      )}
    </div>
  );
}
export default AuthorData;
