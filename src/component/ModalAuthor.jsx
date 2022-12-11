import React from "react";
import { useEffect, useState, useRef } from "react";
import { message, Modal, Select } from "antd";
import Axios from "axios";
import { InfoCircleOutlined } from "@ant-design/icons";
import { Form, Input, Radio } from "antd";
import { Button } from "antd";
const ModalAuthor = ({ fungsi, state, status, idupdate }) => {
  const [form] = Form.useForm();
  const [stateupdate, setstateupdate] = useState(idupdate);
  const [Author, setAuthor] = useState([]);
  const [click, setOnclick] = useState("");
  const inputRef = useRef(null);

  const addAuthor = async (e) => {
    try {
      const response = await Axios.post("http://localhost:3004/author", {
        value: e.value,
        biografi: e.biografi,
      });
      console.log(response);
      fungsi(state + 1);
      form.setFieldsValue({
        value: null,
        biografi: null,
      });
      setIsModalOpen(false);
    } catch (err) {
      console.log(err);
    }
  };
  const updateAuthor = async (e) => {
    console.log("ada");
    try {
      const response = await Axios.patch(
        `http://localhost:3004/author/${stateupdate.id}`,
        {
            value: e.value,
        biografi: e.biografi,
        }
      );
      console.log(response);
      fungsi(state + 1);
      form.setFieldsValue({
        value: null,
        biografi: null,
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
        ` http://localhost:3004/author/${stateupdate.id}`
      );
      console.log(response.data);
      if (response.status === 200) {
        form.setFieldsValue({
          value: response.data.value,
          biografi: response.data.biografi,
        });
      }
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {}, []);
  const [isRequired, setIsRequired] = useState(true);

  return (
    <>
      {status === "UPDATE" && (
        <Button type="primary" onClick={Showedit}  style={{ backgroundColor:"#ffd100",color:"black", border:"1px solid"}}>
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
          onFinish={(e) => {
            {
              status === "UPDATE" && updateAuthor(e);
            }
            {
              status === "ADD" && addAuthor(e);
            }
          }}
        >
          <Form.Item
            label="title"
            name="value"
            rules={[
              {
                required: true,
                message: "please enter author name ",
              },
            ]}
            hasFeedback
          >
            <Input placeholder="input author name" />
          </Form.Item>
          <Form.Item
            label="Description"
            name="biografi"
            value="dataaa"
            validateFirst
            rules={[
              { required: true, message: "please enter author description" },
            ]}
            hasFeedback
          >
             <Input placeholder="input author description" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default ModalAuthor;
