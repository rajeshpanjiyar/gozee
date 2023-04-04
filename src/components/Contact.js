import React from "react";
import emailjs from "emailjs-com";
import Footer from "../pages/Footer";
import DefaultLayout from "./DefaultLayout";
import { message } from "antd";

const Contact = () => {
  const send = (e) => {
    e.preventDefault();
    
    emailjs
      .sendForm(
        process.env.REACT_APP_EMAIL_SERVICE_ID,
        process.env.REACT_APP_EMAIL_TEMPLATE_ID,
        e.target,
        process.env.REACT_APP_EMAIL_ACC_PUBLIC_KEY
      )
      .then(
        (result) => {
          if (result.text == "OK") {
            message.success("Message Sent Successfully");
          }
        },
        (error) => {
          console.log(error);
          message.error("Sending failed");
        }
      );
    e.target.reset();
  };
  return (
    <>
      <DefaultLayout />
      <div className="contact">
        {" "}
        <h2
          style={{
            color: "white",
            marginBottom: "2rem",
            display: "block",
            fontWeight: "700",
            textTransform: "uppercase",
          }}
        >
          Contact
          <span style={{ color: "#c2a3fd" }}> US</span>
        </h2>
        <div>
          <div className="contact-container">
            <form onSubmit={send}>
              <div className="row mx-auto">
                <div className="col-8 form-group mx-auto">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    name="name"
                  />
                </div>
                <div className="col-8 form-group mx-auto">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    name="email"
                  />
                </div>
                <div className="col-8 form-group mx-auto">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Subject"
                    name="subject"
                  />
                </div>
                <div className="col-8 form-group mx-auto">
                  <textarea
                    className="form-control message-area"
                    placeholder="Message"
                    name="message"
                  />
                </div>
                <div className="col-8 form-group mx-auto">
                  <input
                    type="submit"
                    className="btn btn-info"
                    value="Send Message"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;