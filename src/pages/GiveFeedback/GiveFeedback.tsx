import React from "react";
import { useNavigate } from "react-router-dom";
import { Input, Rate, Button, Form, message } from "antd";
import { FeedbackType } from "../../utils/types";
import { ratings, validationMessages } from "../../utils/values";
import { MOCK_ENDPOINT, SHOW_FEEDBACKS_ROUTE } from "../../utils/constants";
import PageContainer from "../../components/PageContainer/PageContainer";
import Header from "../../components/Header/Header";
import { useTranslation } from "react-i18next";
import st from "./GiveFeedback.module.scss";

const { TextArea } = Input;

const GiveFeedback: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

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
        message.error(t("SHOW.ERROR_MESSAGE"));
      });
  };

  return (
    <PageContainer>
      <Header
        title={t("GIVE.HEADER")}
        buttonText={t("GIVE.SHOW_FEEDBACKS_BUTTON")}
        onButtonClick={() => navigate(SHOW_FEEDBACKS_ROUTE)}
      />
      <Form
        layout="vertical"
        className={st.formContainer}
        onFinish={handleFormSubmit}
        validateMessages={validationMessages(t)}
      >
        <Form.Item
          name={"name"}
          label={t("GIVE.NAME_LABEL")}
          className={st.name}
          rules={[{ required: true }]}
        >
          <Input maxLength={100} placeholder={t("GIVE.NAME_PLACEHOLDER")} />
        </Form.Item>
        <Form.Item
          name={"email"}
          label={t("GIVE.EMAIL_LABEL")}
          className={st.email}
          rules={[{ type: "email", required: true }]}
        >
          <Input maxLength={100} placeholder={t("GIVE.EMAIL_PLACEHOLDER")} />
        </Form.Item>
        <Form.Item
          name={"rating"}
          label={t("GIVE.RATING_LABEL")}
          className={st.rating}
          rules={[{ required: true }]}
        >
          <Rate tooltips={ratings.map((rating) => t(`RATING.${rating}`))} />
        </Form.Item>
        <Form.Item
          name={"comment"}
          label={t("GIVE.COMMENT_LABEL")}
          className={st.comment}
          rules={[{ required: true, min: 10 }]}
        >
          <TextArea
            rows={6}
            maxLength={3000}
            placeholder={t("GIVE.COMMENT_PLACEHOLDER")}
            style={{ resize: "none" }}
            showCount
          />
        </Form.Item>
        <Form.Item className={st.button}>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            data-testid="feedbacker-submit-form-btn"
          >
            {t("GIVE.SUBMIT_BUTTON")}
          </Button>
        </Form.Item>
      </Form>
    </PageContainer>
  );
};

export default GiveFeedback;
