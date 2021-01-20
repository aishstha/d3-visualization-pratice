import React, { Component } from "react";
import styled from "styled-components";
import { images } from "config/index";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
  }

  closeModal() {
    let modal = document.getElementById("modal");
    modal.style.display = "none";
    window.location.href = "/";
  }

  render() {
    if (this.state.hasError) {
      return (
        <ModalWrapper id="modal">
          <div className="modal-content">
            <span onClick={e => this.closeModal()} className="close">
              &times;
            </span>
            <div>
              <p>We aren’t able to load the page for you.</p>
              <p> Our developers are looking into it. We will be back soon!</p>
              <img src={images.pageNotFound} alt="page not found" />
              {/*  <small>Here's the detail error message</small> */}
            </div>
          </div>
        </ModalWrapper>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;

const ModalWrapper = styled.div`
  // display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  padding-top: 100px;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(59, 65, 85); /* Fallback color */
  background-color: rgba(59, 65, 85, 0.9);

  /* Modal Content */
  .modal-content {
    color: #fff;
    font: normal 13px/1.5 "Work Sans", sans-serif;
    margin: auto;
    padding: 50px;
    max-width: 60vw;
    background: #0e1724;
    border: 0;
    padding: 44px;
    border-radius: 12px;
    text-align: center;
    a {
      color: #ecc417;
    }
    h4,
    p {
      font-weight: normal;
      width: 80%;
      margin: 0 auto 10px;
    }
    img {
      margin-top: 40px;
      width: 100%;
    }
    @media all and (min-width: 768px) {
      font-size: 16px;
      max-width: 50vw;
    }
    @media all and (min-width: 1400px) {
      img {
        width: initial;
      }
    }
  }

  /* The Close Button */
  .close {
    color: #fff;
    float: right;
    font-size: 22px;
    font-weight: bold;
    width: 30px;
    line-height: 30px;
    border-radius: 50%;
    text-align: center;
    font-size: 22px;
  }

  .close:hover,
  .close:focus {
    background: rgba(255, 255, 255, 0.1);
    text-decoration: none;
    cursor: pointer;
  }
`;
