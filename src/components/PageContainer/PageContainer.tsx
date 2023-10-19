import React, { ReactNode } from "react";
import st from "./PageContainer.module.scss";

const PageContainer: React.FunctionComponent<{ children?: ReactNode }> = ({
  children,
}) => (
  <span className={st.page}>
    <span className={st.container}>{children}</span>
  </span>
);

export default PageContainer;
