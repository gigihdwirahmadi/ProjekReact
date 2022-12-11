import React, { useState } from 'react';
import { Button, Modal } from 'antd';

const Notification = ({status}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    if(status==="on"){
        console.log("masukkk")
        setIsModalOpen(true);
      }
 

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  
  return (
    <>
    
        <>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        
      </Modal>
      </>
      
    </>
  );
}
export default Notification