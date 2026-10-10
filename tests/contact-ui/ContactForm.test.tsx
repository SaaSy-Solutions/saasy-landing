import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { ContactForm } from '../../app/components/ContactForm';

const fetchMock = vi.fn<typeof fetch>();
const input = (name: string) => screen.getByLabelText(name) as HTMLInputElement;
function fill(name = 'Alex', email = 'alex@example.com', message = 'Please help') {
  fireEvent.change(input('Name'), { target: { value: name } });
  fireEvent.change(input('Email'), { target: { value: email } });
  fireEvent.change(screen.getByLabelText('How can we help?'), { target: { value: message } });
}
function submit() { fireEvent.click(screen.getByRole('button', { name: 'Send message' })); }
function associatedError(field: HTMLElement, text: string) {
  expect(field.getAttribute('aria-invalid')).toBe('true');
  const id = field.getAttribute('aria-describedby');
  expect(id).toBeTruthy();
  expect(document.getElementById(id!)?.textContent).toBe(text);
}

beforeEach(() => {
  fetchMock.mockReset();
  vi.stubGlobal('fetch', fetchMock);
  vi.stubEnv('NEXT_PUBLIC_POSTHOG_KEY', '');
  render(<ContactForm />);
});
afterEach(() => { cleanup(); vi.unstubAllGlobals(); vi.unstubAllEnvs(); });

describe('contact validation and delivery', () => {
  it('associates a missing name only with Name and focuses it without sending', () => {
    fill('   '); submit();
    associatedError(input('Name'), 'Please tell us your name.');
    expect(document.activeElement).toBe(input('Name'));
    expect(input('Email').hasAttribute('aria-invalid')).toBe(false);
    expect(screen.getByLabelText('How can we help?').hasAttribute('aria-invalid')).toBe(false);
    expect(fetchMock).not.toHaveBeenCalled();
  });
  it('associates an invalid email with Email and focuses it', () => {
    fill('Alex', 'bad'); submit();
    associatedError(input('Email'), 'Please enter a valid email address.');
    expect(document.activeElement).toBe(input('Email'));
    expect(fetchMock).not.toHaveBeenCalled();
  });
  it('associates a missing message with its textarea and focuses it', () => {
    fill('Alex', 'alex@example.com', '   '); submit();
    associatedError(screen.getByLabelText('How can we help?'), "Please write a message (that's the good part).");
    expect(document.activeElement).toBe(screen.getByLabelText('How can we help?'));
    expect(fetchMock).not.toHaveBeenCalled();
  });
  it('reports all invalid fields in order and clears only the field being edited', () => {
    submit();
    expect(screen.getAllByRole('alert')).toHaveLength(3);
    expect(document.activeElement).toBe(input('Name'));
    fireEvent.change(input('Name'), { target: { value: 'Alex' } });
    expect(input('Name').hasAttribute('aria-invalid')).toBe(false);
    expect(screen.getAllByRole('alert')).toHaveLength(2);
    submit(); expect(document.activeElement).toBe(input('Email'));
    expect(fetchMock).not.toHaveBeenCalled();
  });
  it('submits trimmed valid values once and shows success only after a durable response', async () => {
    fetchMock.mockResolvedValue(new Response(null, { status: 201 }));
    fill(' Alex ', ' alex@example.com ', ' Please help ');
    fireEvent.change(screen.getByLabelText(/Company/), { target: { value: ' Acme ' } });
    submit();
    await screen.findByText('Got it. Talk soon.');
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, request] = fetchMock.mock.calls[0];
    expect(String(url)).toMatch(/\/api\/v1\/contact\/sales$/);
    expect(request?.method).toBe('POST');
    expect(JSON.parse(String(request?.body))).toEqual({name:'Alex',email:'alex@example.com',company:'Acme',message:'Please help',source:'landing-contact'});
  });
  it.each([429, 500])('keeps HTTP %s failures separate from field validity', async (status) => {
    fetchMock.mockResolvedValue(new Response(null, { status }));
    fill(); submit();
    await waitFor(() => expect(screen.getByRole('alert').textContent).toContain(status === 429 ? 'Give it a minute' : "couldn't send"));
    for (const field of [input('Name'), input('Email'), screen.getByLabelText('How can we help?')]) {
      expect(field.hasAttribute('aria-invalid')).toBe(false);
      expect(field.hasAttribute('aria-describedby')).toBe(false);
    }
    expect(screen.queryByText('Got it. Talk soon.')).toBeNull();
    expect(screen.getByRole('button', { name: 'Send message' }).hasAttribute('disabled')).toBe(false);
  });
  it('shows a network failure as a form error without marking the message invalid', async () => {
    fetchMock.mockRejectedValue(new TypeError('offline'));
    fill(); submit();
    await screen.findByRole('alert');
    expect(screen.getByLabelText('How can we help?').hasAttribute('aria-invalid')).toBe(false);
    expect(screen.queryByText('Got it. Talk soon.')).toBeNull();
  });
});
