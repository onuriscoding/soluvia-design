import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, contactPreference, phone, email, description, service, budget, timeframe } = body;

    // Validate the required fields
    if (!name || !description || !contactPreference) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate that either phone or email is present based on contactPreference
    if (contactPreference === 'phone' && !phone) {
      return NextResponse.json(
        { error: 'Phone number is required when phone is selected as contact preference' },
        { status: 400 }
      );
    }

    if (contactPreference === 'email' && !email) {
      return NextResponse.json(
        { error: 'Email is required when email is selected as contact preference' },
        { status: 400 }
      );
    }

    // Configure nodemailer with Gmail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Prepare email content
    const contactMethod = contactPreference === 'phone' 
      ? `Phone: ${phone}` 
      : `Email: ${email}`;

    // Include additional fields if they exist
    const additionalFields = [];
    if (service) additionalFields.push(`<p><strong>Service:</strong> ${service}</p>`);
    if (budget) additionalFields.push(`<p><strong>Budget:</strong> ${budget}</p>`);
    if (timeframe) additionalFields.push(`<p><strong>Timeframe:</strong> ${timeframe}</p>`);
    
    const additionalFieldsText = [];
    if (service) additionalFieldsText.push(`Service: ${service}`);
    if (budget) additionalFieldsText.push(`Budget: ${budget}`);
    if (timeframe) additionalFieldsText.push(`Timeframe: ${timeframe}`);

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_RECIPIENT || process.env.EMAIL_USER,
      subject: `New Contact Form Submission from ${name}`,
      text: `
        Name: ${name}
        Contact Preference: ${contactPreference}
        ${contactMethod}
        ${additionalFieldsText.join('\n')}
        
        Project Description:
        ${description}
      `,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Contact Preference:</strong> ${contactPreference}</p>
        <p><strong>${contactPreference === 'phone' ? 'Phone' : 'Email'}:</strong> ${contactPreference === 'phone' ? phone : email}</p>
        ${additionalFields.join('\n')}
        
        <h3>Project Description:</h3>
        <p>${description}</p>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      message: 'Email sent successfully',
      success: true,
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
} 