import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Card, Space, Spin, message } from "antd";
import { FeedbackType } from "../../utils/types";
import { MOCK_ENDPOINT, GIVE_FEEDBACK_ROUTE } from "../../utils/constants";
import PageContainer from "../../components/PageContainer/PageContainer";
import Header from "../../components/Header/Header";
import Chart from "../../components/Chart/Chart";
import { useTranslation } from "react-i18next";
import st from "./ShowFeedbacks.module.scss";

const { Text, Title } = Typography;

export const getRatings = (feedbacks: FeedbackType[]): number[] => {
  const arr = new Array(5).fill(0);
  feedbacks.forEach((f) => arr[f.rating - 1]++);
  return arr;
};

export const ShowFeedbacks: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [feedbacks, setFeedbacks] = useState<Array<FeedbackType>>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    fetch(MOCK_ENDPOINT)
      .then((response) => response.json())
      .then((data: Array<FeedbackType & { createdAt: number }>) => {
        setFeedbacks(data.sort((a, b) => b.createdAt - a.createdAt));
        setIsLoaded(true);
      })
      .catch(() => {
        message.error(t("SHOW.ERROR_MESSAGE"));
        setIsLoaded(true);
      });
  }, []);

  return (
    <PageContainer>
      <Header
        title={t("SHOW.HEADER")}
        buttonText={t("SHOW.GIVE_FEEDBACK_BUTTON")}
        onButtonClick={() => navigate(GIVE_FEEDBACK_ROUTE)}
      />
      {isLoaded ? (
        feedbacks.length ? (
          <>
            <span className={st.chart} data-testid="feedbacker-chart">
              <Chart data={getRatings(feedbacks)} />
            </span>
            <Title level={4}>{t("SHOW.LATEST_COMMENTS")}</Title>
            {feedbacks.map((feedback, i) => (
              <Card key={i} className={st.card} data-testid="feedbacker-card">
                <Space direction="vertical">
                  <Text italic type="secondary">
                    {feedback.email}
                  </Text>
                  <Text>{feedback.comment}</Text>
                </Space>
              </Card>
            ))}
          </>
        ) : (
          <Text italic type="secondary" data-testid="feedbacker-empty-list">
            {t("SHOW.EMPTY_LIST_MESSAGE")}
          </Text>
        )
      ) : (
        <div className={st.spinner}>
          <Spin />
        </div>
      )}
    </PageContainer>
  );
};

export default ShowFeedbacks;
