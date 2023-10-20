import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as router from "react-router";
import { GIVE_FEEDBACK_ROUTE } from "../../utils/constants";
import ShowFeedbacks, { getRatings } from "./ShowFeedbacks";

const createMockData = (
  rating?: number,
  createdAt?: number,
  email?: string,
  comment?: string
) => ({
  createdAt: createdAt || 100,
  name: "mockedName",
  email: email || "mockedEmail",
  rating: rating || 1,
  comment: comment || "mockedComment",
  id: "1",
});

const navigate = jest.fn();
jest.mock("../../components/Chart/Chart", () => () => <div />);
const mockFetch = (response: any) => {
  global.fetch = jest
    .fn()
    .mockImplementation(() =>
      Promise.resolve({ status: 200, json: () => response })
    );
};

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
});

afterEach(() => {
  jest.clearAllMocks();
});

test("give feedback button navigates correctly", () => {
  mockFetch([]);
  const { getByText } = render(<ShowFeedbacks />);
  const giveFeedbackButton = getByText("SHOW.GIVE_FEEDBACK_BUTTON");
  expect(giveFeedbackButton).toBeInTheDocument();
  userEvent.click(giveFeedbackButton);
  expect(navigate).toBeCalledWith(GIVE_FEEDBACK_ROUTE);
});

test("does render a failed text when not fetched", async () => {
  global.fetch = jest.fn().mockImplementation(() => Promise.reject("Ups"));
  const { getByTestId } = render(<ShowFeedbacks />);
  await waitFor(() => {
    expect(getByTestId("feedbacker-empty-list")).toBeInTheDocument();
  });
});

test("renders a failed text when fetch empty response", async () => {
  mockFetch([]);
  const { getByText } = render(<ShowFeedbacks />);
  await waitFor(() => {
    expect(getByText("SHOW.EMPTY_LIST_MESSAGE")).toBeInTheDocument();
  });
});

test("renders correctly with a mocked response", async () => {
  mockFetch([
    createMockData(3, 100, "email 1", "comment 1"),
    createMockData(1, 200, "email 2", "comment 2"),
    createMockData(4, 150, "email 3", "comment 3"),
  ]);

  const { getByRole, getAllByTestId, getByTestId } = render(<ShowFeedbacks />);
  await waitFor(() => {
    expect(getByTestId("feedbacker-chart")).toBeInTheDocument();
    expect(getByRole("heading", { level: 2 })).toHaveTextContent("SHOW.HEADER");
    expect(getByRole("heading", { level: 4 })).toHaveTextContent(
      "SHOW.LATEST_COMMENTS"
    );
    const cards = getAllByTestId("feedbacker-card");
    expect(cards).toHaveLength(3);
    expect(cards[0].textContent).toContain("email 2");
    expect(cards[0].textContent).toContain("comment 2");
    expect(cards[1].textContent).toContain("email 3");
    expect(cards[1].textContent).toContain("comment 3");
  });
});

test("getRatings creates chart data correctly", () => {
  expect(getRatings([])).toEqual([0, 0, 0, 0, 0]);

  expect(
    getRatings([
      createMockData(3),
      createMockData(1),
      createMockData(4),
      createMockData(3),
    ])
  ).toEqual([1, 0, 2, 1, 0]);

  expect(
    getRatings([
      createMockData(1),
      createMockData(2),
      createMockData(4),
      createMockData(5),
      createMockData(3),
    ])
  ).toEqual([1, 1, 1, 1, 1]);
});
