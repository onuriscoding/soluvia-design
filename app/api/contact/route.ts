import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Define the template interface
interface EmailTemplate {
  subject: string;
  greeting: string;
  thankYou: string;
  responseTime: string;
  summaryIntro: string;
  projectDetails: string;
  projectDescription: string;
  serviceLabel: string;
  budgetLabel: string;
  timeframeLabel: string;
  urgentContact: string;
  regards: string;
  team: string;
  copyright: string;
  website: string;
  headerText: string;
}

// Define supported locales
type SupportedLocale = 'en' | 'fr';

// Email templates for different languages
const emailTemplates: Record<SupportedLocale, EmailTemplate> = {
  en: {
    subject: 'Thank you for contacting Soluvia',
    greeting: 'Dear',
    thankYou: 'Thank you for reaching out to Soluvia. We have received your message and our team will review it shortly.',
    responseTime: 'We\'ll get back to you within 24 hours to discuss your project needs.',
    summaryIntro: 'Here\'s a summary of the information you provided:',
    projectDetails: 'Your Project Details',
    projectDescription: 'Project Description:',
    serviceLabel: 'Service:',
    budgetLabel: 'Budget:',
    timeframeLabel: 'Timeframe:',
    urgentContact: 'If you have any urgent matters, please don\'t hesitate to call us at',
    regards: 'Best regards,',
    team: 'The Soluvia Team',
    copyright: '© Soluvia. All rights reserved.',
    website: 'Website',
    headerText: 'Thank You for Contacting Us'
  },
  fr: {
    subject: 'Merci d\'avoir contacté Soluvia',
    greeting: 'Cher/Chère',
    thankYou: 'Merci d\'avoir contacté Soluvia. Nous avons bien reçu votre message et notre équipe l\'examinera prochainement.',
    responseTime: 'Nous vous répondrons dans les 24 heures pour discuter de vos besoins de projet.',
    summaryIntro: 'Voici un résumé des informations que vous avez fournies :',
    projectDetails: 'Détails de votre projet',
    projectDescription: 'Description du projet :',
    serviceLabel: 'Service :',
    budgetLabel: 'Budget :',
    timeframeLabel: 'Délai :',
    urgentContact: 'Si vous avez des questions urgentes, n\'hésitez pas à nous appeler au',
    regards: 'Cordialement,',
    team: 'L\'équipe Soluvia',
    copyright: '© Soluvia. Tous droits réservés.',
    website: 'Site Web',
    headerText: 'Merci de nous avoir contactés'
  },
  // Add more languages as needed
};

// Default to English if locale not supported
const getEmailTemplate = (locale: string): EmailTemplate => {
  return emailTemplates[locale as SupportedLocale] || emailTemplates.en;
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      name, 
      contactPreference, 
      phone, 
      email, 
      description, 
      service, 
      budget, 
      timeframe,
      locale = 'en' // Default to English if no locale is provided
    } = body;

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

    // Send confirmation email to the user if email is provided
    if (email) {
      // Get the correct language template
      const template = getEmailTemplate(locale);

      // Logo URL - use your website's absolute URL to the logo
      const logoUrl = 'https://www.soluvia.co/soluvia-final-no-bg.png';

      // Replace dollar signs with euro symbols in budget if present
      let formattedBudget = budget;
      if (budget && budget.includes('$')) {
        formattedBudget = budget.replace(/\$/g, '€');
      }

      const confirmationMailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: template.subject,
        text: `
          ${template.greeting} ${name},
          
          ${template.thankYou}
          
          ${template.responseTime}
          
          ${template.summaryIntro}
          ${service ? `\n${template.serviceLabel} ${service}` : ''}
          ${formattedBudget ? `\n${template.budgetLabel} ${formattedBudget}` : ''}
          ${timeframe ? `\n${template.timeframeLabel} ${timeframe}` : ''}
          
          ${template.projectDescription}
          ${description}
          
          ${template.urgentContact} +32 499 24 29 51.
          
          ${template.regards}
          ${template.team}
        `,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
            <div style="text-align: center; margin-bottom: 20px;">
              <h1 style="color: #3d5a80; margin-bottom: 5px;">${template.headerText}</h1>
              <div style="height: 3px; background: linear-gradient(90deg, #b76e79, #3d5a80); margin: 0 auto 20px;"></div>
            </div>
            
            <p>${template.greeting} ${name},</p>
            
            <p>${template.thankYou}</p>
            
            <p>${template.responseTime}</p>
            
            <div style="background-color: #f5f5f5; border-left: 4px solid #3d5a80; padding: 15px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #3d5a80;">${template.projectDetails}</h3>
              ${service ? `<p><strong>${template.serviceLabel}</strong> ${service}</p>` : ''}
              ${formattedBudget ? `<p><strong>${template.budgetLabel}</strong> ${formattedBudget}</p>` : ''}
              ${timeframe ? `<p><strong>${template.timeframeLabel}</strong> ${timeframe}</p>` : ''}
              <p><strong>${template.projectDescription}</strong><br>${description}</p>
            </div>
            
            <p>${template.urgentContact} <a href="tel:+32499242951" style="color: #b76e79; text-decoration: none;">+32 499 24 29 51</a>.</p>
            
            <p>${template.regards}<br>${template.team}</p>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #777; text-align: center;">
              <img src="${logoUrl}" alt="Soluvia" style="max-width: 100px; margin-bottom: 10px; opacity: 0.8;" />
              <p>${template.copyright}</p>
              <div>
                <a href="https://www.soluvia.co" style="color: #3d5a80; text-decoration: none; margin: 0 10px;">${template.website}</a>
                <a href="https://www.linkedin.com/company/soluviaco" style="color: #3d5a80; text-decoration: none; margin: 0 10px;">LinkedIn</a>
                <a href="https://www.instagram.com/soluviaco/" style="color: #3d5a80; text-decoration: none; margin: 0 10px;">Instagram</a>
              </div>
            </div>
          </div>
        `,
      };

      await transporter.sendMail(confirmationMailOptions);
    }

    return NextResponse.json({
      message: 'Email sent successfully',
      success: true,
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send' },
      { status: 500 }
    );
  }
} 