import React from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Input, Rate, Button, Form, message } from "antd";
import { FeedbackType } from "../../utils/types";
import { MOCK_ENDPOINT, SHOW_FEEDBACKS_ROUTE } from "../../utils/constants";
import PageContainer from "../../components/PageContainer/PageContainer";
import Header from "../../components/Header/Header";
import st from "./GiveFeedback.module.scss";

const { Title } = Typography;
const { TextArea } = Input;

const ratingDescriptions = ["terrible", "bad", "normal", "good", "wonderful"];

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

const GiveFeedback: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const handleFormSubmit = (values: FeedbackType) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    };
    fetch(MOCK_ENDPOINT, requestOptions)
      .then((response) => {
        if (response.status) {
          navigate(SHOW_FEEDBACKS_ROUTE);
        }
      })
      .catch(() => {
        message.error("Something went wrong, please try again");
      });
  };

  return (
    <PageContainer>
      <Header
        title="Give Feedback"
        buttonText="Show Feedbacks"
        buttonClick={() => navigate(SHOW_FEEDBACKS_ROUTE)}
      />
      <Form
        form={form}
        layout="vertical"
        className={st.formContainer}
        onFinish={handleFormSubmit}
        validateMessages={validateMessages}
      >
        <Form.Item
          name={"name"}
          label="Name"
          className={st.name}
          rules={[{ required: true }]}
        >
          <Input maxLength={100} placeholder="Please enter your full name" />
        </Form.Item>
        <Form.Item
          name={"email"}
          label="Email"
          className={st.email}
          rules={[{ type: "email", required: true }]}
        >
          <Input maxLength={100} placeholder="Please enter your email" />
        </Form.Item>
        <Form.Item
          name={"rating"}
          label="Rating"
          className={st.rating}
          rules={[{ required: true }]}
        >
          <Rate tooltips={ratingDescriptions} />
        </Form.Item>
        <Form.Item
          name={"comment"}
          label="Comment"
          className={st.comment}
          rules={[{ required: true, min: 10 }]}
        >
          <TextArea
            rows={6}
            maxLength={3000}
            placeholder="Please enter your comment"
            style={{ resize: "none" }}
            showCount
          />
        </Form.Item>
        <Form.Item className={st.button}>
          <Button type="primary" htmlType="submit" size="large">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </PageContainer>
  );
};

export default GiveFeedback;
