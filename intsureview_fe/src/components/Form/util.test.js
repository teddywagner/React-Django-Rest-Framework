// Implementing tests for all of the util functions
import { validatePhoneNumber, parseAndValidateForm } from "./util";

test("validatePhoneNumber returns true for a valid phone number", () => {
  expect(validatePhoneNumber("1234567890")).toBe(true);
});

test("validatePhoneNumber returns false for an invalid phone number containing a non-numeric character", () => {
  expect(validatePhoneNumber("123456789a")).toBe(false);
});

test("validatePhoneNumber returns false for an input less than length 10", () => {
  expect(validatePhoneNumber("123456789")).toBe(false);
});

test("validatePhoneNumber returns false for an input greater than length 10", () => {
  expect(validatePhoneNumber("12345678901")).toBe(false);
});

test("parseAndValidateForm returns the form in the server-side format if valid", () => {
  const form = {
    firstName: "John",
    lastName: "Doe",
    phoneNumber: "1234567890",
    moveDate: "2021-01-01",
    isFlexible: true,
  };

  const expected = {
    first_name: "John",
    last_name: "Doe",
    phone_number: "1234567890",
    move_in_date: "2021-01-01",
    flexible: true,
  };

  expect(parseAndValidateForm(form)).toEqual(expected);
});

test("parseAndValidateForm returns null if the phone number is invalid", () => {
  const form = {
    firstName: "John",
    lastName: "Doe",
    phoneNumber: "invalid phone number",
    moveDate: "2021-01-01",
    isFlexible: true,
  };

  expect(parseAndValidateForm(form)).toBe(null);
});

test("parseAndValidateForm returns null if the first name is empty", () => {
  const form = {
    firstName: "",
    lastName: "Doe",
    phoneNumber: "1234567890",
    moveDate: "2021-01-01",
    isFlexible: true,
  };

  expect(parseAndValidateForm(form)).toBe(null);
});

test("parseAndValidateForm returns null if the last name is empty", () => {
  const form = {
    firstName: "John",
    lastName: "",
    phoneNumber: "1234567890",
    moveDate: "2021-01-01",
    isFlexible: true,
  };

  expect(parseAndValidateForm(form)).toBe(null);
});


