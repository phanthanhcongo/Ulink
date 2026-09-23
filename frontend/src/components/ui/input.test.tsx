import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from './input';

describe('Input Component', () => {
  it('renders input element', () => {
    render(<Input />);
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
  });

  it('applies default ui-input class', () => {
    render(<Input />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('ui-input');
  });

  it('applies rounded class', () => {
    render(<Input />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('rounded-[3px]');
  });

  it('accepts input type', () => {
    render(<Input type="email" />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.type).toBe('email');
  });

  it('accepts placeholder', () => {
    render(<Input placeholder="Enter text" />);
    const input = screen.getByPlaceholderText('Enter text');
    expect(input).toBeInTheDocument();
  });

  it('accepts value prop', () => {
    render(<Input value="test value" readOnly />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.value).toBe('test value');
  });

  it('handles onChange event', async () => {
    const user = userEvent.setup();
    render(<Input defaultValue="" />);
    const input = screen.getByRole('textbox') as HTMLInputElement;

    await user.type(input, 'test');
    expect(input.value).toBe('test');
  });

  it('applies invalid styles when invalid prop is true', () => {
    render(<Input invalid />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('border-rose-400');
  });

  it('applies invalid focus styles when invalid', () => {
    render(<Input invalid />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('focus:border-rose-500', 'focus:ring-rose-500/10');
  });

  it('sets aria-invalid when invalid prop is true', () => {
    render(<Input invalid />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  it('respects aria-invalid prop', () => {
    render(<Input aria-invalid="true" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  it('accepts custom className', () => {
    render(<Input className="custom-class" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('custom-class');
  });

  it('can be disabled', () => {
    render(<Input disabled />);
    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
  });

  it('forwards ref', () => {
    const ref = { current: null };
    render(<Input ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it('accepts password type', () => {
    render(<Input type="password" />);
    const input = document.querySelector('input[type="password"]') as HTMLInputElement;
    expect(input.type).toBe('password');
  });

  it('accepts number type', () => {
    render(<Input type="number" />);
    const input = screen.getByRole('spinbutton');
    expect(input).toBeInTheDocument();
  });

  it('accepts readonly prop', () => {
    render(<Input readOnly />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('readonly');
  });

  it('accepts required prop', () => {
    render(<Input required />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('required');
  });

  it('combines custom className with default classes', () => {
    render(<Input className="custom-class" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('ui-input', 'rounded-[3px]', 'custom-class');
  });

  it('works with invalid and custom className together', () => {
    render(<Input invalid className="custom" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('ui-input', 'border-rose-400', 'custom');
  });
});
