import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as router from "react-router";
import { MOCK_ENDPOINT, SHOW_FEEDBACKS_ROUTE } from "../../utils/constants";
import GiveFeedback from "./GiveFeedback";

const expected = {
  name: "mockedName",
  email: "mockedEmail@email.com",
  rating: 3,
  comment: "mockedLongComment",
};

const navigate = jest.fn();

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (str: string) => str,
    i18n: {
      changeLanguage: () => new Promise(() => {}),
    },
  }),
}));

beforeEach(() => {
  window.matchMedia = (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  });

  jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);

  global.fetch = jest.fn().mockImplementationOnce(() =>
    Promise.resolve({
      status: 200,
      json: () => {},
    })
  );
});

afterEach(() => {
  jest.clearAllMocks();
});

test("show feedbacks button navigates correctly", () => {
  const { getByText } = render(<GiveFeedback />);
  const showFeedbacksButton = getByText("GIVE.SHOW_FEEDBACKS_BUTTON");
  expect(showFeedbacksButton).toBeInTheDocument();
  userEvent.click(showFeedbacksButton);
  expect(navigate).toBeCalledWith(SHOW_FEEDBACKS_ROUTE);
});

test("renders all necessary input fields", () => {
  const { getByText, getByLabelText } = render(<GiveFeedback />);
  expect(getByLabelText("GIVE.NAME_LABEL")).toBeInTheDocument();
  expect(getByLabelText("GIVE.EMAIL_LABEL")).toBeInTheDocument();
  expect(getByLabelText("GIVE.COMMENT_LABEL")).toBeInTheDocument();
  expect(getByText("GIVE.RATING_LABEL")).toBeInTheDocument();
});

test("form works correctly when all fields are entered", async () => {
  const { getAllByRole, getByTestId, getByLabelText } = render(
    <GiveFeedback />
  );
  userEvent.type(getByLabelText("GIVE.NAME_LABEL"), expected.name);
  userEvent.type(getByLabelText("GIVE.EMAIL_LABEL"), expected.email);
  userEvent.type(getByLabelText("GIVE.COMMENT_LABEL"), expected.comment);
  userEvent.click(getAllByRole("radio")[expected.rating - 1]);
  userEvent.click(getByTestId("feedbacker-submit-form-btn"));
  await waitFor(() => {
    expect(global.fetch).toBeCalled();
    expect(global.fetch).toBeCalledWith(MOCK_ENDPOINT, {
      body: JSON.stringify(expected),
      headers: { "Content-Type": "application/json" },
      method: "POST",
    });
    expect(navigate).toBeCalledWith(SHOW_FEEDBACKS_ROUTE);
  });
});

test("form works correctly", async () => {
  const { getByTestId } = render(<GiveFeedback />);
  expect(getByTestId("feedbacker-submit-form-btn")).toBeInTheDocument();

  userEvent.click(getByTestId("feedbacker-submit-form-btn"));
  await waitFor(() => {
    expect(global.fetch).not.toBeCalled();
  });
});

test("form does not submit without rating", async () => {
  const { getByTestId, getByLabelText } = render(<GiveFeedback />);
  userEvent.type(getByLabelText("GIVE.NAME_LABEL"), expected.name);
  userEvent.type(getByLabelText("GIVE.EMAIL_LABEL"), expected.email);
  userEvent.type(getByLabelText("GIVE.COMMENT_LABEL"), expected.comment);
  userEvent.click(getByTestId("feedbacker-submit-form-btn"));
  await waitFor(() => {
    expect(global.fetch).not.toBeCalled();
  });
});

test("form does not submit without name", async () => {
  const { getByTestId, getByLabelText, getAllByRole } = render(
    <GiveFeedback />
  );
  userEvent.type(getByLabelText("GIVE.EMAIL_LABEL"), expected.email);
  userEvent.type(getByLabelText("GIVE.COMMENT_LABEL"), expected.comment);
  userEvent.click(getAllByRole("radio")[expected.rating - 1]);
  userEvent.click(getByTestId("feedbacker-submit-form-btn"));
  await waitFor(() => {
    expect(global.fetch).not.toBeCalled();
  });
});

test("form does not submit without email", async () => {
  const { getByTestId, getByLabelText, getAllByRole } = render(
    <GiveFeedback />
  );
  userEvent.type(getByLabelText("GIVE.NAME_LABEL"), expected.name);
  userEvent.type(getByLabelText("GIVE.COMMENT_LABEL"), expected.comment);
  userEvent.click(getAllByRole("radio")[expected.rating - 1]);
  userEvent.click(getByTestId("feedbacker-submit-form-btn"));
  await waitFor(() => {
    expect(global.fetch).not.toBeCalled();
  });
});

test("form does not submit with a broken email", async () => {
  const { getByTestId, getByLabelText, getAllByRole } = render(
    <GiveFeedback />
  );
  userEvent.type(getByLabelText("GIVE.NAME_LABEL"), expected.name);
  userEvent.type(getByLabelText("GIVE.EMAIL_LABEL"), "brokenemail.");
  userEvent.type(getByLabelText("GIVE.COMMENT_LABEL"), expected.comment);
  userEvent.click(getAllByRole("radio")[expected.rating - 1]);
  userEvent.click(getByTestId("feedbacker-submit-form-btn"));
  await waitFor(() => {
    expect(global.fetch).not.toBeCalled();
  });
});

test("form does not submit without comment", async () => {
  const { getByTestId, getByLabelText, getAllByRole } = render(
    <GiveFeedback />
  );
  userEvent.type(getByLabelText("GIVE.NAME_LABEL"), expected.name);
  userEvent.type(getByLabelText("GIVE.EMAIL_LABEL"), expected.email);
  userEvent.click(getAllByRole("radio")[expected.rating - 1]);
  userEvent.click(getByTestId("feedbacker-submit-form-btn"));
  await waitFor(() => {
    expect(global.fetch).not.toBeCalled();
  });
});

test("form does not submit with a short comment", async () => {
  const { getByTestId, getByLabelText, getAllByRole } = render(
    <GiveFeedback />
  );
  userEvent.type(getByLabelText("GIVE.NAME_LABEL"), expected.name);
  userEvent.type(getByLabelText("GIVE.EMAIL_LABEL"), expected.email);
  userEvent.type(getByLabelText("GIVE.COMMENT_LABEL"), "short comment");
  userEvent.click(getAllByRole("radio")[expected.rating - 1]);
  userEvent.click(getByTestId("feedbacker-submit-form-btn"));
  await waitFor(() => {
    expect(global.fetch).not.toBeCalled();
  });
});
