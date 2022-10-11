/**
 * Create and Deploy a Cloud Functions
 * to automatically send signups to Google Chat
 */

const functions = require("firebase-functions");
const fetch = require("node-fetch");

// Google Chat Webhook URL. Follow this link to get yours:
// https://developers.google.com/chat/how-tos/webhooks#step_1_register_the_incoming_webhook
const GOOGLE_CHAT_WEBHOOK_URL = "https://chat.googleapis.com/v1/spaces/....";

// Firebase Authentication triggers
exports.sendSignupToGoogleChat = functions.auth.user().onCreate((user) => {
  const message = `🥳 New signup ${user.email || "(no email)"}`;

  return fetch(GOOGLE_CHAT_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=UTF-8" },
    body: JSON.stringify({ text: message }),
  });
});
