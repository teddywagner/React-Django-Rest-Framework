import "./Body.css";
import { Form } from "../Form/Form";
import { SuccessMessage } from "../SuccessMessage/SuccessMessage";
import { useState } from "react";

// relatively simple component that renders the form.
export const Body = () => {

  // state to determine if the form has been submitted, passed as a prop to each component
  const [submitted, setSubmitted] = useState(false);
  return (
    <div className="App-body">
      {!submitted ? (
        <Form setSubmitted={setSubmitted} />
      ) : (
        <SuccessMessage setSubmitted={setSubmitted} />
      )}
    </div>
  );
};
