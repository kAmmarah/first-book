#!/bin/bash
cd /Users/ammarah/first-book
git add frontend/book-website/docusaurus.config.js frontend/book-website/vercel.json
git commit -m "Fix Vercel deployment configuration and script paths"
git push origin main