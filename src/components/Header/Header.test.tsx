import { render, screen, fireEvent } from "@testing-library/react";
import Header from "./Header";

const mockedTitle = "mockedTitle";
const mockedButtonText = "mockedButtonText";
const mockedButtonClick = jest.fn();

test("renders correclty without no props", () => {
  const { getByTestId } = render(<Header />);
  expect(getByTestId("feedbacker-header")).toBeInTheDocument();
});

test("renders child components correctly with all props", () => {
  const { getByTestId, getByRole } = render(
    <Header
      title={mockedTitle}
      buttonText={mockedButtonText}
      onButtonClick={mockedButtonClick}
    />
  );

  expect(getByTestId("feedbacker-header")).toBeInTheDocument();
  expect(getByRole("heading", { level: 2 })).toHaveTextContent(mockedTitle);
  expect(getByRole("button")).toHaveTextContent(mockedButtonText);
});

test("renders correctly with only title prop", () => {
  const { getByRole } = render(<Header title={mockedTitle} />);
  expect(getByRole("heading", { level: 2 })).toHaveTextContent(mockedTitle);
});

test("renders correctly with button props", () => {
  const { rerender, getByRole } = render(
    <Header buttonText={mockedButtonText} />
  );
  expect(screen.queryByText(mockedButtonText)).toBeNull();

  rerender(
    <Header buttonText={mockedButtonText} onButtonClick={mockedButtonClick} />
  );
  expect(screen.queryByText(mockedButtonText)).not.toBeNull();
  expect(getByRole("button")).toHaveTextContent(mockedButtonText);

  fireEvent.click(getByRole("button"));
  expect(mockedButtonClick).toHaveBeenCalledTimes(1);
});
