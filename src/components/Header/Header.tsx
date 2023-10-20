import React from "react";
import { Typography, Button } from "antd";
import st from "./Header.module.scss";

const { Title } = Typography;

type HeaderProps = {
  title?: string;
  buttonText?: string;
  onButtonClick?: () => void;
};

const Header: React.FunctionComponent<HeaderProps> = ({
  title,
  buttonText,
  onButtonClick,
}) => (
  <span className={st.header} data-testid="feedbacker-header">
    {title && <Title level={2}>{title}</Title>}
    {onButtonClick && (
      <Button size="large" onClick={onButtonClick}>
        {buttonText}
      </Button>
    )}
  </span>
);

export default Header;
