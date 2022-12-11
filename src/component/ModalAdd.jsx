import React from "react";
import { useEffect, useState, useRef } from "react";
import { message, Modal, Select } from "antd";
import Axios from "axios";
import Notification from '../component/Notification'
import { Form, Input, Radio } from "antd";
import { Button } from "antd";
const ModalAdd = ({ fungsi, state, status, idupdate }) => {
  const [form] = Form.useForm();
  const [stateupdate, setstateupdate] = useState(idupdate);
  const [Author, setAuthor] = useState([]);
  const [click, setOnclick] = useState("");
  const [isModal2Open, setIsModal2Open] = useState(false);
  const inputRef = useRef(null);

  const getAuthor = async () => {
    try {
      const response = await Axios.get(` http://localhost:3004/author`);

      console.log(response);
      if (response.status === 200) {
        setAuthor(response.data);
      }
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addBook = async (e) => {
    try {
      const response2 = await Axios.get(`http://localhost:3004/books/${e.author}`)
      console.log(response2)
      const response = await Axios.post("http://localhost:3004/books", {
        title: e.title,
        desc: e.desc,
        genre: e.genre,
        authorid: e.author,
        cover: e.cover,
        author: response2.data.author
      });
      
      console.log(response);
      fungsi(state + 1);
      form.setFieldsValue({
        title: null,
        desc: null,
        cover: null,
        genre: null,
      });
      setIsModalOpen(false);
      <Notification status="on"/>
    } catch (err) {
      console.log(err);
    }
  };
  const updateBook = async (e) => {
    console.log("ada");
    try {
      const response2 = await Axios.get(`http://localhost:3004/books/${e.author}`)
      const response = await Axios.patch(
        `http://localhost:3004/books/${stateupdate.id}`,
        {
          title: e.title,
        desc: e.desc,
        genre: e.genre,
        authorid: e.author,
        cover: e.cover,
        author: response2.data.author
        }
      );
      console.log(response);
      fungsi(state + 1);
      form.setFieldsValue({
        title: null,
        desc: null,
        cover: null,
        genre: null,
      });
      setIsModalOpen(false);
    } catch (err) {
      console.log(err);
    }
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {};

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const Showedit = async (e) => {
    try {
      setIsModalOpen(true);
      const response = await Axios.get(
        ` http://localhost:3004/books/${stateupdate.id}`
      );
      console.log(response.data);
      if (response.status === 200) {
        form.setFieldsValue({
          title: response.data.title,
          desc: response.data.desc,
          cover: response.data.cover,
          genre: response.data.genre,
          author: response.data.author,
        });
      }
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  


  React.useEffect(() => {}, []);
  const [isRequired, setIsRequired] = useState(true);
  useEffect(() => {
    getAuthor();
  }, []);

  return (
    <>
      {status === "UPDATE" && (
        <Button type="primary"onClick={Showedit} style={{ backgroundColor:"#ffd100",color:"black", border:"1px solid"}}>
          {status}
        </Button>
      )}
      {status === "ADD" && (
        <Button type="primary" style={{backgroundColor:"white", color:"black", border:"2px solid"}} onClick={showModal}>
          {status}
        </Button>
      )}
      <Modal
        title={status}
        open={isModalOpen}
        onOk={form.submit}
       
        onCancel={handleCancel}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish=
          {(e) => {
            {
              status === "UPDATE" && updateBook(e);
            }
            {
              status === "ADD" && addBook(e);
            }
          }}
        >
          <Form.Item
            label="title"
            name="title"
            value="hahaha"
            rules={[
              {
                required: true,
                message: "please enter book title ",
              },
            ]}
            hasFeedback
          >
            <Input placeholder="input title" />
          </Form.Item>
          <Form.Item
            label="Description"
            name="desc"
            value="dataaa"
            validateFirst
            rules={[
              { required: true, message: "please enter book description" },
            ]}
            hasFeedback
          >
            <Input placeholder="input description" />
          </Form.Item>
          <Form.Item
            label="Genre"
            name="genre"
            rules={[
              {
                required: true,
              },
            ]}
            hasFeedback
          >
            <Select placeholder="input Genre">
              <Select.Option value="Drama">Drama</Select.Option>
              <Select.Option value="Romance">Romance</Select.Option>
              <Select.Option value="Action">Action</Select.Option>
              <Select.Option value="NonFiction">NonFiction</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Author"
            name="author"
            rules={[{ required: true }]}
            hasFeedback
          >
            <Select
             listHeight="30"
              showSearch
              style={{ width: "100%" }}
              placeholder="Search to Select"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? "").includes(input)
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              options={Author?.map((item) => ({
                value: item.id,
                label: item.label,
              }))}
            />
          </Form.Item>
          <Form.Item
            label="Url Cover"
            name="cover"
            rules={[
              {
                required: true,
                message: "please enter url cover",
              },
            ]}
            hasFeedback
          >
            <Input placeholder="input url" />
          </Form.Item>
        </Form>
      </Modal>
      
    </>
  );
};
export default ModalAdd;
