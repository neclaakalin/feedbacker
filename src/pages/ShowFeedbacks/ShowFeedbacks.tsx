import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Card, Space, Spin, message } from "antd";
import { FeedbackType } from "../../utils/types";
import { MOCK_ENDPOINT, GIVE_FEEDBACK_ROUTE } from "../../utils/constants";
import PageContainer from "../../components/PageContainer/PageContainer";
import Header from "../../components/Header/Header";
import { BarChart } from "@mui/x-charts/BarChart";
import st from "./ShowFeedbacks.module.scss";

const { Text, Title } = Typography;

const getRatings = (feedbacks: FeedbackType[]) => {
  const arr = new Array(5).fill(0);
  feedbacks.forEach((f) => arr[f.rating - 1]++);
  return arr;
};

export const ShowFeedbacks: React.FunctionComponent = () => {
  const navigate = useNavigate();
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
        message.error("Something went wrong, please try again");
      });
  }, []);

  return (
    <PageContainer>
      <Header
        title="Feedbacks"
        buttonText="Give Feedback"
        buttonClick={() => navigate(GIVE_FEEDBACK_ROUTE)}
      />
      {isLoaded ? (
        <>
          <span className={st.chart}>
            <BarChart
              xAxis={[
                {
                  data: ["1 Star", "2 Star", "3 Star", "4 Star", "5 Star"],
                  scaleType: "band",
                },
              ]}
              yAxis={[
                {
                  label: "Count",
                },
              ]}
              series={[
                {
                  data: getRatings(feedbacks),
                },
              ]}
              width={500}
              height={300}
            />
          </span>
          <Title level={4}>Latest Comments</Title>
          {feedbacks.map((feedback, i) => (
            <Card key={i} className={st.card}>
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
        <div className={st.spinner}>
          <Spin />
        </div>
      )}
    </PageContainer>
  );
};

export default ShowFeedbacks;
