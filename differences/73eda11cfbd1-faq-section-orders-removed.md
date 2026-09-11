---
title: FAQ section Orders removed
status: sanctioned
route: /faq
axis: copy
kind: removed
---
## Legacy

`apps/gridkit/pages/faq.tsx:211-265`, category "Orders": "How do I place an order?" ("You can order directly from our store! Just add items to cart, proceed to checkout, and follow the prompts.", link "our store" to `/store`); "What payment methods do you accept?" ("We use Stripe to securely process payments, so you can pay with all major credit and debit cards, as well as Apple Pay and Google Pay for a quick and easy checkout.", link "Stripe" to `https://stripe.com`); "How quickly will I receive my order?" ("Our lead time is currently 2-6 weeks for production and delivery. We’ll keep you updated throughout the process."); "Where do you deliver to?" ("We currently deliver only within New Zealand."); "How much does shipping cost?" ("At the moment we offer free shipping on all orders."); "Do you deliver overseas?" ("Not yet, but we hope to expand internationally soon! Stay tuned for updates.", link "Stay tuned for updates." to `/subscribe`).

## Current

No such section in `app/faq/page.tsx:43-281` (The system, Lifespan and reuse, Suppliers, Other).

## Verdict

rule: no e-commerce (the store, cart, checkout and Stripe surfaces are gone)

## Log
