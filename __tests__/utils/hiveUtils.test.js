import { addHive } from '@/utils/hiveUtils';
import { hiveViewModel } from '@/viewModels/hiveViewModel';

describe('hiveUtils', () => {
  it('should add hive to hive view model', () => {
    const mockSetModalVisible = jest.fn();
    addHive(hiveViewModel, mockSetModalVisible, "New Test Hive");

    // The view model have 2 hives in the list by default.
    expect(hiveViewModel.numberOfHives()).toBe(3);
  });
});
