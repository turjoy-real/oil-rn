const INPUT_CHANGE = "INPUT_CHANGE";
const INPUT_BLUR = "INPUT_BLUR";
const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

export const textChangeHandler = (props, text) => {
  return async (dispatch) => {
    try {
      const emailRegex =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      let isValid = true;
      if (props.required && text.trim().length === 0) {
        isValid = false;
      }
      if (props.email && !emailRegex.test(text.toLowerCase())) {
        isValid = false;
      }
      if (props.min != null && +text < props.min) {
        isValid = false;
      }
      if (props.max != null && +text > props.max) {
        isValid = false;
      }
      if (props.minLength != null && text.length < props.minLength) {
        isValid = false;
      }
      dispatch({ type: INPUT_CHANGE, value: text, isValid: isValid });
    } catch (err) {
      throw err;
    }
  };
};

export const lostFocusHandler = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: INPUT_BLUR });
    } catch (err) {
      throw err;
    }
  };
};

export const formInputUpdate = (inputIdentifier, inputValue, inputValidity) => {
  return async (dispatch) => {
    try {
      // console.log("for update", inputIdentifier, inputValue, inputValidity);

      dispatch({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    } catch (err) {
      throw err;
    }
  };
};
