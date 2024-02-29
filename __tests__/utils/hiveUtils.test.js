import { addHive } from "@/utils/hiveUtils";
import { hiveViewModel } from "@/viewModels/hiveViewModel";

describe("hiveUtils", () => {
  it("should add hive to hive view model", () => {
    const mockSetModalVisible = jest.fn();
    const numberOfHives = hiveViewModel.numberOfHives();
    addHive(hiveViewModel, mockSetModalVisible, "New Test Hive");

    expect(hiveViewModel.numberOfHives()).toBe(numberOfHives + 1);
  });
});
