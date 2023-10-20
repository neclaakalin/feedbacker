import { render, screen, fireEvent } from "@testing-library/react";
import PageContainer from "./PageContainer";

const mockedText = "mocked text";
const mockedComponent = <h1>{mockedText}</h1>;

test("renders correclty without no props", () => {
  const { getByTestId, getByRole } = render(
    <PageContainer>{mockedComponent}</PageContainer>
  );
  expect(getByTestId("feedbacker-page")).toBeInTheDocument();
  expect(getByRole("heading", { level: 1 })).toHaveTextContent(mockedText);
});
