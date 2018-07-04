import React from "react";
import * as Feather from "react-feather";
import Modal from "react-modal";
import styled from "styled-components";

const faq = require("./data/faq.json");


Modal.setAppElement(document.getElementById("root"));

const modalStyles = {
  overlay: {
    zIndex: 10000
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "70%",
    maxHeight: "80%"
  }
};

const Container = styled.div`display: inline-block;`

class FaqModal extends React.Component {

  state = {
    modalIsOpen: false,
    departmentData: null,
  };

  openModal = () => {
    this.setState({
      modalIsOpen: true
    });
  };

  closeModal = () => {
    this.setState({
      modalIsOpen: false
    });
  };

  render () {
    let faqItem = faq.find(item => item['question'] === this.props.question);
    return (
      <Container>
        <a href="#" onClick={this.openModal}>{this.props.text}</a>
        <Modal
          style={modalStyles}
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
        >
          <h2>{faqItem.question}</h2>
          <div dangerouslySetInnerHTML={{__html:faqItem.reponse}}></div>
        </Modal>
      </Container>
    )
  };

}

export default FaqModal;