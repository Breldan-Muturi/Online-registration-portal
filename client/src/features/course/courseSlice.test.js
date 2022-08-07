import { it, expect } from "vitest";
import { setTitle } from "./courseSlice";
it("should update the title state", () => {
  const result = setTitle("Test Title");
  expect(result).toEqual("Test Title");
});
