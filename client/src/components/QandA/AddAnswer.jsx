import React from 'react';
import styled from 'styled-components';
import axios from 'axios';

const AddAnswerButton = styled.button`
  grid-row-start: 1;
  grid-column-start: 4;
  justify-self: end;
  text-decoration: underline;
  color: #1f513f;
  margin-left: 1%;
  margin-right: 1%;
  padding: 0;
  border: none;
  background: none;
  &: hover {
    cursor: pointer;
  }
`;

const AskDiv = styled.div`
  grid-row-start: 4;
  grid-column-start: 3;
  grid-column-end: 3;
`;

const Modal = styled.div`
  display: block;
  position: fixed;
  z-index: 3;
  padding-top: 200px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.4);
`;

const Content = styled.div`
  background-color: #f4f2ed;
  margin: auto;
  border: 1px solid black;
  width: 50%;
  display: grid;
  grid-template-columns: 25% 25% 25% 25%;
  grid-template-rows: 5% 70% 10% 10% 5%;
  color:black;
`;

const ModalHeader = styled.div`
  grid-column-start: 1;
  grid-column-end: 4;
  background-color: #f4f2ed;
  align-self: center;
`;

const CloseButton = styled.span`
  color: #aaaaaa;
  grid-row-start: 1;
  grid-column-start: 4;
  justify-self: end;
  padding-right: 10px;
  font-size: 28px;
  font-weight: bold;
  &: hover {
    cursor: pointer;
    color: black;
  }
`;

const QuestionField = styled.textarea`
  grid-row-start: 2;
  grid-row-end: span 4;
  grid-column-start: 1;
  grid-column-end: span 4;
  height: 200px;
  width: 500px;
  margin-left: 10px;
`;

const QuestionLabel = styled.label`
  grid-row-start: 1;
  padding-left: 10px;
`;

const NicknameField = styled.input`
  grid-row-start: 3;
  grid-column-start: 1;
  width: 200px;
  margin-left: 10px;
`;

const NicknameLabel = styled.label`
  grid-row-start: 3;
  grid-column-start: 1;
  padding-left: 10px;
`;

const EmailField = styled.input`
  grid-row-start: 4;
  grid-column-start: 1;
  width: 200px;
  margin-left: 10px;
`;

const EmailLabel = styled.label`
  grid-row-start: 4;
  grid-column-start: 1;
  padding-left: 10px;
`;

const PhotoLabel = styled.label`
  margin-left: 10px;
`;

const PhotoField = styled.input`
  padding: 10px;
  &: hover {
    cursor: pointer;
  }
`;

const ModalSubmit = styled.input`
  border-style: solid;
  border-color: #1f513f;
  grid-row-start: 5;
  grid-column-start: 1;
  margin-left: 10px;
  background-color: white;
  border-radius: 12px;
  &: hover {
    background-color: #1f513f;
    cursor: pointer;
    border-color: #f4f2ed;
    color: #f4f2ed;
  };
  &: active {
    background-color: white;
    color: black;
    border-color: #1f513f;
    -webkit-box-shadow: inset 0px 0px 15px #c1c1c1;
     -moz-box-shadow: inset 0px 0px 15px #c1c1c1;
          box-shadow: inset 0px 0px 15px #c1c1c1;
  };
`;

const ModalForm = styled.form`
  grid-row-start:2;
`;

const FormText = styled.p`
  padding-left: 10px;
`;

class AddAnswer extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      showModal: false,
      answer: '',
      nickname: '',
      email: '',
      question_id: '',
    });

    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
  }

  componentDidMount() {
    const { question_id } = this.props;
    this.setState({
      question_id,
    });
  }

  handleClick(e) {
    e.preventDefault();
    this.setState({
      showModal: true,
    });
  }

  handleClose(e) {
    e.preventDefault();
    this.setState({
      showModal: false,
    });
  }

  handleChange(e) {
    e.preventDefault();
    const target = e.target;
    const name = target.name;

    this.setState({
      [name]: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { reRender } = this.props;
    const {
      answer, nickname, email, question_id,
    } = this.state;
    const newEmail = this.validateEmail(email);
    if (answer.length === 0) {
      alert('You must enter an answer');
      return;
    }
    if (nickname.length === 0) {
      alert('You must enter a nickname');
      return;
    }
    if (email.length === 0) {
      alert('You must enter an email');
      return;
    }
    if (!newEmail) {
      alert('You must enter a valid email');
      return;
    }
    axios({
      method: 'post',
      url: '/api/product/questions/answers',
      params: {
        question_id,
      },
      data: {
        body: answer,
        name: nickname,
        email,
      },
    })
      .then(() => {
        reRender();
      })
      .catch((error) => {
        console.log(error);
      });
    this.setState({
      showModal: false,
      answer: '',
      nickname: '',
      email: '',
    });
  }

  validateEmail(email) {
    const checkEmail = /\S+@\S+\.\S+/;
    return checkEmail.test(email);
  }

  render() {
    const {
      showModal, answer, nickname, email,
    } = this.state;
    const { question, product } = this.props;
    if (showModal) {
      return (
        <AskDiv>
          <AddAnswerButton className="add" onClick={this.handleClick}>
            Add Answer!
          </AddAnswerButton>
          <Modal className="modal">
            <Content>
              <ModalHeader>
                Submit your Answer -&nbsp;
                {product}
                :&nbsp;
                { question }
              </ModalHeader>
              <CloseButton onClick={this.handleClose}>&times;</CloseButton>
              <ModalForm onSubmit={this.handleSubmit}>
                <QuestionLabel>
                  Your Answer
                  <span style={{ color: 'red' }}>*</span>
                  :
                  <QuestionField type="text" value={answer} name="answer" placeholder="Your Answer Here" maxlength="1000" onChange={this.handleChange} />
                </QuestionLabel>
                <NicknameLabel>
                  What is your nickname
                  <span style={{ color: 'red' }}>*</span>
                  :
                  <NicknameField type="text" value={nickname} placeholder="Example: jack543!" name="nickname" onChange={this.handleChange} />
                  <FormText>
                    For privacy reasons, do not use your full name or email address.
                  </FormText>
                </NicknameLabel>
                <EmailLabel>
                  Your Email
                  <span style={{ color: 'red' }}>*</span>
                  :
                  <EmailField type="text" value={email} placeholder="Example: jack@email.com" name="email" onChange={this.handleChange} />
                  <FormText>For authentication reasons, you will not be emailed.</FormText>
                </EmailLabel>
                <PhotoLabel>
                  Add a photo:
                  <PhotoField type="file" onChange={this.handleFile} />
                </PhotoLabel>
                <ModalSubmit type="submit" value="Submit" />
              </ModalForm>
            </Content>
          </Modal>
        </AskDiv>
      );
    }
    return (
      <AddAnswerButton className="add" onClick={this.handleClick}>
        Add Answer!
      </AddAnswerButton>
    );
  }
}

export default AddAnswer;
