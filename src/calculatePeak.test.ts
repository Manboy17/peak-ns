import { expect, test } from "vitest";
import { calculatePeak } from "./calculatePeak";

test("calculatePeak test", () => {
  const testDate = new Date("2024-03-08T10:00:00");

  const { isPeakTime, nextChangeAt } = calculatePeak(testDate);

  expect(isPeakTime).toBe(false);

  const expectedNextChangeAt = new Date("2024-03-08T16:00:00");

  expect(nextChangeAt).toEqual(expectedNextChangeAt);
});

test("calculatePeak test2", () => {
  const testDate = new Date("2024-03-08T08:00:00");

  const { isPeakTime, nextChangeAt } = calculatePeak(testDate);

  expect(isPeakTime).toBe(true);

  const expectedNextChangeAt = new Date("2024-03-08T09:00:00");

  expect(nextChangeAt).toEqual(expectedNextChangeAt);
});

test("calculatePeak test3", () => {
  const testDate = new Date("2024-03-08T17:00:00");

  const { isPeakTime, nextChangeAt } = calculatePeak(testDate);

  expect(isPeakTime).toBe(true);

  const expectedNextChangeAt = new Date("2024-03-08T18:30:00");

  expect(nextChangeAt).toEqual(expectedNextChangeAt);
});

test("calculatePeak test4", () => {
  const testDate = new Date("2024-03-08T20:00:00");

  const { isPeakTime, nextChangeAt } = calculatePeak(testDate);

  expect(isPeakTime).toBe(false);

  const expectedNextChangeAt = new Date("2024-03-11T06:30:00");

  expect(nextChangeAt).toEqual(expectedNextChangeAt);
});

test("calculatePeak test5", () => {
  const testDate = new Date("2024-03-09T06:10:00");

  const { isPeakTime, nextChangeAt } = calculatePeak(testDate);

  expect(isPeakTime).toBe(false);
  const expectedNextChangeAt = new Date("2024-03-11T06:30:00");
  expect(nextChangeAt).toEqual(expectedNextChangeAt);
});

test("calculatePeak thursday evening", () => {
  const testDate = new Date("2024-03-07T20:00:00");

  const { isPeakTime, nextChangeAt } = calculatePeak(testDate);

  expect(isPeakTime).toBe(false);

  const expectedNextChangeAt = new Date("2024-03-08T06:30:00");

  expect(nextChangeAt).toEqual(expectedNextChangeAt);
});

test("calculatePeak extra test", () => {
  const testDate = new Date("2024-03-16T20:00:00");

  const { isPeakTime, nextChangeAt } = calculatePeak(testDate);

  expect(isPeakTime).toBe(false);

  const expectedNextChangeAt = new Date("2024-03-18T06:30:00");

  expect(nextChangeAt).toEqual(expectedNextChangeAt);
});

// off-peak Monday-Friday:from 9am - 4pm, 6.30pm - 6.30am
// peak time - 6.30am - 9am, 4pm - 6.30pm
