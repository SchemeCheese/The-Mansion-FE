import React from 'react';

import Reload from 'components/Reload';

import { fireEvent, render, screen } from 'test-utils';

describe('Reload', () => {
  const originalLocation = window.location;

  beforeAll(() => {
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: { ...originalLocation, reload: jest.fn() } as Location,
    });
  });

  afterAll(() => {
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: originalLocation,
    });
  });

  it('should render properly', () => {
    render(<Reload />);

    expect(screen.getByTestId('Reload')).toMatchSnapshot();

    fireEvent.click(screen.getByRole('button'));

    expect(window.location.reload).toHaveBeenCalledTimes(1);
  });
});
