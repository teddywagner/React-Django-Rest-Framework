import "./Form.css";
import { useEffect, useState } from "react";
import { parseAndValidateForm } from "./util";
import axios from "axios";

const apiURL = "http://localhost:8000/forms/";

export const Form = (props) => {
  // today's date in the format YYYY-MM-DD
  const date = new Date().toISOString().split("T")[0];

  // form state in controlled components
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [moveDate, setMoveDate] = useState(date);
  const [isFlexible, setIsFlexible] = useState(false);
  const [validNumber, setValidNumber] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // error message state for form validation and conditional rendering of an error message
  const [errorMessage, setErrorMessage] = useState("");

  // useEffect that validates the phone number based on if a character other than a number is entered
  useEffect(() => {
    //regex expression to determine if string is only numbers
    const regex = /^\d+$/;

    // a phone number is determined to be valid if it is empty, or if it is up to 10 digits and only numbers
    // an empty phone number will be caught upon submission, but this allows for the styling to be applied in real time
    setValidNumber(
      phoneNumber.length === 0 ||
        (regex.test(phoneNumber) && phoneNumber.length <= 10),
    );
  }, [phoneNumber]);

  // onSubmit handler that validates the form and sends a POST request to the API
  const onSubmit = async (e) => {
    e.preventDefault();

    // prevent multiple submissions
    setSubmitting(true);

    // parse and validate the form
    const fields = parseAndValidateForm({
      firstName,
      lastName,
      phoneNumber,
      moveDate,
      isFlexible,
    });

    if (fields) {
      try {
        await axios.post(apiURL, fields);
        props.setSubmitted(true);
      } catch (e) {
        setErrorMessage(`Something went wrong. Errpr: ${e.message}`);
      } finally {
        // reset the form on success or failure
        setFirstName("");
        setLastName("");
        setPhoneNumber("");
        setMoveDate(date);
        setIsFlexible(false);
        setErrorMessage("");
      }
    } else {
      setErrorMessage("Please fix missing or incorrect information.");
    }

    // allow for another submission
    setSubmitting(false);
  };

  return (
    <form>
      <h2>Get a quote</h2>

      {/* only render the error message when one exists */}
      {errorMessage.length > 0 && <div className="error">{errorMessage}</div>}

      <div className="form-field">
        <label htmlFor="firstNameInput">First Name:</label>
        <input
          type="text"
          id="firstNameInput"
          name="firstName"
          placeholder="John"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>

      <div className="form-field">
        <label htmlFor="lastNameInput">Last Name:</label>
        <input
          type="text"
          id="lastNameInput"
          name="lastName"
          placeholder="Doe"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>

      <div className="form-field">
        <label htmlFor="phoneNumberInput">Phone:</label>
        <input
          className={validNumber ? "" : "invalid"}
          type="tel"
          id="phoneNumberInput"
          name="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        {!validNumber && (
          <div className="error">
            Please enter a valid phone number containing only numbers.
          </div>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="moveDateInput">Move date:</label>
        <input
          type="date"
          id="moveDateInput"
          name="moveDate"
          value={moveDate}
          min={date}
          onChange={(e) => setMoveDate(e.target.value)}
        />
      </div>

      <div className="form-field">
        <label htmlFor="isFlexibleInput">Is your move date flexible?</label>
        <select
          id="isFlexibleInput"
          name="isFlexible"
          value={isFlexible}
          onChange={(e) => setIsFlexible(e.target.value)}
        >
          <option value="false">No</option>
          <option value="true">Yes</option>
        </select>
      </div>

      <button
        className="form-field"
        type="submit"
        onClick={onSubmit}
        disabled={submitting}
      >
        Submit
      </button>
    </form>
  );
};
