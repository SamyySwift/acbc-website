import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import nodemailer from "npm:nodemailer";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { name, email, phone, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      throw new Error("Please provide all required fields");
    }

    const smtpHost = Deno.env.get("SMTP_HOST") || "smtp.gmail.com";
    const smtpPort = parseInt(Deno.env.get("SMTP_PORT") || "465");
    const smtpUser = Deno.env.get("SMTP_USERNAME"); 
    const smtpPass = Deno.env.get("SMTP_PASSWORD"); 

    if (!smtpUser || !smtpPass) {
      throw new Error("SMTP configuration is missing");
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: true,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const htmlTemplate = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #0a192f; padding: 20px; text-align: center;">
          <h2 style="color: #ffffff; margin: 0;">New Website Enquiry</h2>
          <p style="color: #d4af37; margin: 5px 0 0 0; font-weight: bold;">The Apostolic Church Bible College</p>
        </div>
        <div style="padding: 30px; background-color: #ffffff;">
          <p style="color: #333333; font-size: 16px; margin-top: 0;">You have received a new message from the website contact form.</p>
          
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #eeeeee; width: 130px; color: #666666; font-weight: bold;">Full Name</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #eeeeee; color: #333333;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #eeeeee; color: #666666; font-weight: bold;">Email Address</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #eeeeee; color: #333333;"><a href="mailto:${email}" style="color: #0a192f; text-decoration: none;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #eeeeee; color: #666666; font-weight: bold;">Phone Number</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #eeeeee; color: #333333;">${phone || 'Not provided'}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #eeeeee; color: #666666; font-weight: bold;">Subject</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #eeeeee; color: #333333;">${subject}</td>
            </tr>
          </table>
          
          <div style="margin-top: 30px;">
            <h3 style="color: #0a192f; margin-bottom: 10px; font-size: 16px; border-bottom: 2px solid #d4af37; padding-bottom: 5px; display: inline-block;">Message Content</h3>
            <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; color: #444444; line-height: 1.6; white-space: pre-wrap; font-size: 15px; border-left: 4px solid #0a192f;">${message}</div>
          </div>
        </div>
        <div style="background-color: #f5f5f5; padding: 15px; text-align: center; color: #888888; font-size: 12px;">
          <p style="margin: 0;">This email was sent automatically from the ACBC Website Contact Form.</p>
        </div>
      </div>
    `;

    const mailOptions = {
      from: smtpUser,
      to: smtpUser,
      replyTo: email,
      subject: `New ACBC Enquiry: ${subject}`,
      text: `You have received a new enquiry from the ACBC website.\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone || 'Not provided'}\nSubject: ${subject}\n\nMessage:\n${message}`,
      html: htmlTemplate,
    };

    await transporter.sendMail(mailOptions);

    return new Response(JSON.stringify({ success: true, message: 'Email sent successfully!' }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(JSON.stringify({ error: error.message || 'Failed to send email' }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
