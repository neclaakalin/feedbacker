import React from "react";
import { Typography, Button } from "antd";
import st from "./Header.module.scss";

const { Title } = Typography;

type HeaderProps = {
  title?: string;
  buttonText?: string;
  buttonClick?: () => void;
};

const Header: React.FunctionComponent<HeaderProps> = ({
  title,
  buttonText,
  buttonClick,
}) => (
  <span className={st.header}>
    <Title level={2}>{title}</Title>
    {buttonClick && (
      <Button size="large" onClick={buttonClick}>
        {buttonText}
      </Button>
    )}
  </span>
);

export default Header;
