/**
 * Empty: Form has a disabled “Submit” button.
Typing: Form has an enabled “Submit” button.
Submitting: Form is completely disabled. Spinner is shown.
Success: “Thank you” message is shown instead of a form.
Error: Same as Typing state, but with an extra error message.
 */

import { useState } from "react";

const Form = () => {
  const [status, setStatus] = useState({
    textarea: true,
    button: true,
    loadingMessage: false,
    errorMessage: false,
    successMessage: false,
    form: true,
    errorMessageText: "",
    textareaText: "",
  });
  function delay(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setStatus({
      ...status,
      textarea: false,
      button: false,
      loadingMessage: true,
      errorMessage: false,
    });
    await delay(3000);

    try {
      await delay(3000);
      await submitForm(status.textareaText);
      await delay(3000);
      setStatus({ ...status, form: false, successMessage: true });

      await delay(3000);
    } catch (err) {
      setStatus({
        ...status,
        errorMessage: true,
        errorMessageText: err.message,
      });

      await delay(3000);
    } finally {
      setStatus({
        ...status,
        loadingMessage: false,
        textarea: true,
        button: true,
        textareaText: "",
      });
    }
  };
  const handleTextareaInput = () => {
    if (status.textareaText.length === 0) {
      setStatus({ ...status, button: false });
    } else {
      setStatus({ ...status, button: true });
    }
  };

  const handleChange = (e) => {
    setStatus({ ...status, textareaText: e.target.value });
  };

  const submitForm = (answer) => {
    console.log(answer);
    // Pretend it's hitting the network.
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (answer.toLowerCase() == "istanbul") {
          resolve();
        } else {
          reject(new Error("Good guess but a wrong answer. Try again!"));
        }
      }, 1500);
    });
  };
  return (
    <>
      {status.form && (
        <form id="form" onSubmit={handleFormSubmit}>
          <h2>City quiz</h2>
          <p>What city is located on two continents?</p>
          <textarea
            name="textarea"
            value={status.textareaText}
            onChange={handleChange}
            onInput={handleTextareaInput}
            disabled={!status.textarea}
            id="textarea"
          ></textarea>
          <br />
          <button id="button" name="button" disabled={!status.button}>
            Submit
          </button>
          {status.loadingMessage && <p id="loading">Loading...</p>}
          {status.errorMessage && (
            <p id="error" style={{ color: "red" }}>
              {status.errorMessageText}
            </p>
          )}
        </form>
      )}
      {status.successMessage && <h1 id="success">That's right!</h1>}
    </>
  );
};
export default Form;
