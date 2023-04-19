import React from "react";
import { useParams } from "react-router-dom";
import Form from "../Components/Form";

const Update = () => {
  const parms = useParams();
  return (
    <>
      <Form id={parms.id} />
    </>
  );
};

export default Update;
