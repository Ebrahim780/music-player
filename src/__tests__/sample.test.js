import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import MusicPlayer from "../containers/MusicPlayer";

test("sample_test_1", () => {
  const { getByTestId } = render(<MusicPlayer />);
  const musicTitle = getByTestId("music-title");
  const nextBtn = getByTestId("next-btn");
  expect(nextBtn).not.toBeDisabled();
  expect(musicTitle).toHaveTextContent(/music_1/i);
});

test("sample_test_2", () => {
  const { getByTestId } = render(<MusicPlayer />);
  const musicTitle = getByTestId("music-title");
  const prevBtn = getByTestId("prev-btn");
  const nextBtn = getByTestId("next-btn");
  fireEvent.click(nextBtn);
  fireEvent.click(prevBtn);
  fireEvent.click(nextBtn);
  expect(musicTitle).toHaveTextContent(/music_2/i);
});
