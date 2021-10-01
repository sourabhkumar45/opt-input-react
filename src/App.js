import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import Modal from "./components/Modal";
import axios from "axios";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useState, useEffect } from "react";
import "./App.css";

const useStyles = makeStyles((theme) => ({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "red",
    },
  },
  inputBase: {
    border: "1px solid #6162f5",
    [`& fieldset`]: {
      borderRadius: 10,
    },
    height: "20px",
  },
}));
const CTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#6162f5",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#6162f5",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#6162f5",
      borderRadius: 15,
    },
    "&:hover fieldset": {
      borderColor: "#6162f5",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#6162f5",
    },

    height: "50px",
  },
});

function App() {
  const classes = useStyles();

  const [num, setNum] = useState("");
  const [modal, setModal] = useState(false);
  const [verified, setVerified] = useState(false);
  const [result, setResult] = useState("");
  const [content, setContent] = useState("");
  const [btnContent, setBtnC] = useState("");
  const [back, setBack] = useState(true);
  useEffect(() => {
    if (verified) {
      let inp = document.querySelector(".opt");
      inp.focus();
    }
  }, [verified]);
  useEffect(() => {
    if (!back) {
      setBack(true);
      setVerified(false);
    }
  }, [back]);
  const handleFocus = (e) => {
    if (e.target.value === "") e.target.value = "+91";
  };
  const handleBlur = (e) => {
    if (e.target.value === "+91") {
      e.target.value = "";
    } else {
      setNum(e.target.value);
    }
  };
  const handleClick = (e) => {
    let n = num.split("+")[1];
    if (/^\d+$/.test(n) === false || n.length !== 12) {
      setModal(true);
      setContent("Number Entered is Invalid");
      setBtnC("Re-enter");
    } else {
      setVerified(true);
    }
  };
  const addDigit = (e) => {
    if (e.target.value !== "") {
      if (e.target.nextElementSibling !== null) {
        e.target.nextElementSibling.focus();
      }
    } else if (e.target.value === "") {
      if (e.target.previousElementSibling !== null) {
        e.target.previousElementSibling.focus();
      }
    }
  };
  const handleSumbit = async () => {
    let opt = "";
    let arr = document.querySelectorAll(".opt");
    for (let i = 0; i < arr.length; i++) {
      opt += arr[i].value;
    }
    let n = num.split("+")[1];
    n = n.substring(2);
    axios
      .post(
        "https://asia-southeast1-frapp-prod.cloudfunctions.net/mock-endpoint",
        {
          mobile: n,
          otp: opt,
        }
      )
      .then((res) => {
        setResult(res.data);
        setContent("OPT vetified successfully");
        setBtnC("Continue");
        setModal(true);
      })
      .catch((err) => {
        setContent("OPT not verified");
        setBtnC("Continue");
        setModal(true);
      });
  };
  return (
    <>
      <Modal
        modal={modal}
        onClose={() => setModal(false)}
        content={content}
        btnContent={btnContent}
      ></Modal>
      <div className="container">
        <div className="img-container">
          {verified ? (
            <div
              className="back-container"
              onClick={() => {
                setBack(false);
              }}
            >
              <ArrowBackIosNewIcon></ArrowBackIosNewIcon>
            </div>
          ) : null}
          <img
            src="https://user-images.githubusercontent.com/55038876/135478486-05c4c897-7fc1-4374-be85-2caab993b072.png"
            alt="mail-box"
          ></img>
        </div>
        <div className="form-container">
          {verified ? <h2>OPT Verification</h2> : <h2>Getting Started</h2>}
          {verified ? (
            <p>
              Entered the OPT send to <strong>{num}</strong>
            </p>
          ) : (
            <p>We will send you a one time password on this mobile number</p>
          )}

          {/* <TextField
          id="outlined-basic"
          label="mobile-number"
          variant="outlined"
          className={classes.inputBase}
        /> */}
          {verified ? (
            <div className="opt-container">
              <input
                id="1"
                maxLength="1"
                className="opt"
                onChange={(e) => addDigit(e)}
              ></input>
              <input
                id="2"
                maxLength="1"
                className="opt"
                onChange={(e) => addDigit(e)}
              ></input>
              <input
                id="3"
                maxLength="1"
                className="opt"
                onChange={(e) => addDigit(e)}
              ></input>
              <input
                id="4"
                maxLength="1"
                className="opt"
                onChange={(e) => addDigit(e)}
              ></input>
            </div>
          ) : (
            <CTextField
              label="Mobile number"
              id="custom-css-outlined-input"
              className={classes.inputBase}
              onFocus={(e) => handleFocus(e)}
              onBlur={(e) => handleBlur(e)}
            />
          )}
        </div>
        <div className="btn-container">
          {verified ? (
            <button className="submit-btn" onClick={(e) => handleSumbit(e)}>
              Submit
            </button>
          ) : (
            <button className="submit-btn" onClick={(e) => handleClick(e)}>
              Get OTP
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
