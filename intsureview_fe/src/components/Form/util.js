// A valid phone number is 10 digits numbers and no other characters
export const validatePhoneNumber = (phoneNumber) => {
  const regex = /^\d{10}$/;
  return regex.test(phoneNumber);
};

/*
 * Returns today's date in the format YYYY-MM-DD
 * @returns {string} today's date in the format YYYY-MM-DD
 */
export const getToday = () => {
  // today = YYYY-MM-DDTHH:mm:ss.sssZ
  const today = new Date();
  return today.toISOString().split("T")[0];
};

/*
 * Parses and validates the form
 * @param {object} form - the form state
 * @returns {object} - the form state if valid in the server-side format, null otherwise
 */
export const parseAndValidateForm = (form) => {
  const { firstName, lastName, phoneNumber, moveDate, isFlexible } = form;

  const validPhoneNumber = validatePhoneNumber(phoneNumber);

  if (validPhoneNumber && firstName.length && lastName.length) {
    // return the form in the request body format for the server
    return {
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber,
      move_in_date: moveDate,
      flexible: isFlexible,
    };
  } else {
    return null;
  }
};
