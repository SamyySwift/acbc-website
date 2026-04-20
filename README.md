# Apostolic Church Bible College (ACBC) Website

Welcome to the official repository for the Apostolic Church Bible College (ACBC) website, located in Ikom, Cross River State, Nigeria. 

This modern, responsive, and fully functional website was designed to showcase the institution's programs, facilitate admissions, and provide a seamless contact experience.

## 🚀 Technologies Used

- **Frontend Framework:** React 18 with Vite
- **Styling:** Tailwind CSS (v4) with Custom CSS variables
- **Animations:** Framer Motion for smooth, high-fidelity UI transitions
- **Icons:** Lucide React
- **Routing:** React Router DOM
- **Backend/Serverless:** Supabase Edge Functions (Deno) for sending emails securely
- **Email Delivery:** Nodemailer via Gmail SMTP

## ✨ Features

- **Dynamic Homepage:** Beautiful hero image carousel and interactive aims/objectives sections.
- **Academics & Admissions:** Clear, responsive presentation of the institution's degree and certificate programs.
- **Contact Form:** Fully functional edge-function-powered form that safely sends emails to the administration without exposing SMTP credentials in the frontend.
- **SEO Optimized:** Meta tags and sitemap readiness implemented.

## 🛠️ Local Development

### 1. Clone the repository
\`\`\`bash
git clone https://github.com/your-username/acbc-website.git
cd "acbc-website"
\`\`\`

### 2. Install dependencies
\`\`\`bash
npm install
\`\`\`

### 3. Environment Setup
Copy the example environment file and fill in your Supabase details:
\`\`\`bash
cp .env.example .env
\`\`\`
*(Make sure to add your specific `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to `.env`)*

### 4. Run the Development Server
\`\`\`bash
npm run dev
\`\`\`

## 📨 Supabase Edge Function Setup (Contact Form)

The contact form is powered by a Supabase Edge Function that uses Nodemailer. To deploy and configure it for your own environment:

1. **Link your Supabase Project**
\`\`\`bash
npx supabase link --project-ref your-project-ref
\`\`\`

2. **Set SMTP Secrets in Supabase**
Create a Google App Password for your Gmail account and set the secrets in your Supabase project:
\`\`\`bash
npx supabase secrets set SMTP_HOST=smtp.gmail.com
npx supabase secrets set SMTP_PORT=465
npx supabase secrets set SMTP_USERNAME=your_email@gmail.com
npx supabase secrets set SMTP_PASSWORD=your_16_character_app_password
\`\`\`

3. **Deploy the Function**
\`\`\`bash
npx supabase functions deploy contact-email --no-verify-jwt
\`\`\`

## 📄 License
All rights reserved by The Apostolic Church Bible College.
