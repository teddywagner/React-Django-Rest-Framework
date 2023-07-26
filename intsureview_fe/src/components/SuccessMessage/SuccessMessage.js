import "./SuccessMessage.css";

// Simple success message component that renders when the form is submitted
export const SuccessMessage = (props) => {
  const onClick = (e) => {
    e.preventDefault();
    props.setSubmitted(false);
  };

  return (
    <div className="success-message">
      <h2>Success!</h2>
      <p>Thank you for your submission. We will be in touch shortly.</p>
      <button onClick={(e) => onClick(e)}>Submit another form</button>
    </div>
  );
};
