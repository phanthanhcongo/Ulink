import test from 'node:test';
import assert from 'node:assert/strict';
import { sendRfqSummaryEmail } from './rfq-mailer';

test('sendRfqSummaryEmail sends email successfully', async () => {
  const mailSent: unknown[] = [];
  const mockSendMail = async (opts: unknown) => {
    mailSent.push(opts);
  };

  await sendRfqSummaryEmail(
    {
      to: 'test@example.com',
      subject: 'RFQ Summary',
      text: 'Here is your RFQ summary'
    },
    {},
    mockSendMail
  );

  assert.equal(mailSent.length, 1);
});

test('sendRfqSummaryEmail uses provided from address', async () => {
  const sentMails: any[] = [];
  const mockSendMail = async (opts: any) => {
    sentMails.push(opts);
  };

  await sendRfqSummaryEmail(
    {
      to: 'customer@example.com',
      subject: 'RFQ',
      text: 'Summary',
      from: 'support@example.com'
    },
    {},
    mockSendMail
  );

  assert.equal(sentMails[0].from, 'support@example.com');
});

test('sendRfqSummaryEmail uses MAIL_FROM env variable', async () => {
  const sentMails: any[] = [];
  const mockSendMail = async (opts: any) => {
    sentMails.push(opts);
  };

  await sendRfqSummaryEmail(
    {
      to: 'customer@example.com',
      subject: 'RFQ',
      text: 'Summary'
    },
    { MAIL_FROM: 'noreply@company.com' },
    mockSendMail
  );

  assert.equal(sentMails[0].from, 'noreply@company.com');
});

test('sendRfqSummaryEmail uses default from when neither provided', async () => {
  const sentMails: any[] = [];
  const mockSendMail = async (opts: any) => {
    sentMails.push(opts);
  };

  await sendRfqSummaryEmail(
    {
      to: 'customer@example.com',
      subject: 'RFQ',
      text: 'Summary'
    },
    {},
    mockSendMail
  );

  assert.equal(sentMails[0].from, 'ULINK <no-reply@ulink.com>');
});

test('sendRfqSummaryEmail retries on failure', async () => {
  let attempts = 0;
  const mockSendMail = async () => {
    attempts++;
    if (attempts < 3) {
      throw new Error('Temporary failure');
    }
  };

  await sendRfqSummaryEmail(
    {
      to: 'test@example.com',
      subject: 'RFQ',
      text: 'Summary'
    },
    {},
    mockSendMail
  );

  assert.equal(attempts, 3);
});

test('sendRfqSummaryEmail throws after 3 attempts', async () => {
  const mockSendMail = async () => {
    throw new Error('Permanent failure');
  };

  try {
    await sendRfqSummaryEmail(
      {
        to: 'test@example.com',
        subject: 'RFQ',
        text: 'Summary'
      },
      {},
      mockSendMail
    );
    assert.fail('Should have thrown');
  } catch (err) {
    assert(err instanceof Error);
    assert.equal(err.message, 'Permanent failure');
  }
});

test('sendRfqSummaryEmail passes correct params to send function', async () => {
  const sentMails: any[] = [];
  const mockSendMail = async (opts: any) => {
    sentMails.push(opts);
  };

  await sendRfqSummaryEmail(
    {
      to: 'customer@example.com',
      subject: 'Your RFQ Summary',
      text: 'Order details here',
      from: 'support@example.com'
    },
    { MAIL_FROM: 'other@example.com' },
    mockSendMail
  );

  const mail = sentMails[0];
  assert.equal(mail.to, 'customer@example.com');
  assert.equal(mail.subject, 'Your RFQ Summary');
  assert.equal(mail.text, 'Order details here');
  assert.equal(mail.from, 'support@example.com');
});
