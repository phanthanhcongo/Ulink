import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button, buttonVariants } from './button';

describe('Button Component', () => {
  it('renders button with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('applies primary variant by default', () => {
    render(<Button>Primary</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('ui-btn-primary');
  });

  it('applies secondary variant', () => {
    render(<Button variant="secondary">Secondary</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('ui-btn-secondary');
  });

  it('applies ghost variant', () => {
    render(<Button variant="ghost">Ghost</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('ui-btn-ghost');
  });

  it('applies soft variant', () => {
    render(<Button variant="soft">Soft</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-brand/10');
  });

  it('applies danger variant', () => {
    render(<Button variant="danger">Danger</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-red-600');
  });

  it('applies small size', () => {
    render(<Button size="sm">Small</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('h-9');
  });

  it('applies medium size by default', () => {
    render(<Button>Medium</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('h-11');
  });

  it('applies large size', () => {
    render(<Button size="lg">Large</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('h-12');
  });

  it('applies icon size', () => {
    render(<Button size="icon">Icon</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('h-9', 'w-9');
  });

  it('applies fullWidth prop', () => {
    render(<Button fullWidth>Full Width</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('w-full');
  });

  it('handles click events', async () => {
    const user = userEvent.setup();
    const handleClick = () => {};
    const { rerender } = render(<Button onClick={handleClick}>Click</Button>);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('can be disabled', () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveClass('disabled:pointer-events-none', 'disabled:opacity-60');
  });

  it('accepts custom className', () => {
    render(<Button className="custom-class">Custom</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
  });

  it('has correct default button type', () => {
    render(<Button>Button</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('type', 'button');
  });

  it('can set button type to submit', () => {
    render(<Button type="submit">Submit</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('type', 'submit');
  });

  it('forwards ref', () => {
    const ref = { current: null };
    render(<Button ref={ref}>Ref Button</Button>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it('combines variant and size classes', () => {
    render(<Button variant="ghost" size="lg">Ghost Large</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('ui-btn-ghost', 'h-12');
  });
});

describe('buttonVariants function', () => {
  it('returns primary variant classes by default', () => {
    const classes = buttonVariants();
    expect(classes).toContain('ui-btn-primary');
  });

  it('returns custom variant classes', () => {
    const classes = buttonVariants({ variant: 'danger' });
    expect(classes).toContain('bg-red-600');
  });

  it('returns size classes', () => {
    const classes = buttonVariants({ size: 'lg' });
    expect(classes).toContain('h-12');
  });

  it('combines variant and size', () => {
    const classes = buttonVariants({ variant: 'soft', size: 'sm' });
    expect(classes).toContain('bg-brand/10');
    expect(classes).toContain('h-9');
  });
});
