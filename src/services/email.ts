import { EmailStatus } from '../types/booking';

interface BookingEmailData {
  customerName: string;
  customerEmail: string;
  route: string;
  date: string;
  time: string;
  returnDate?: string;
  returnTime?: string;
  passengers: number;
  vehicle: {
    category: string;
    name: string;
  };
}

// For development, we'll simulate email sending
const DEV_MODE = import.meta.env.MODE === 'development';

export async function sendBookingConfirmation(booking: BookingEmailData): Promise<EmailStatus> {
  if (DEV_MODE) {
    console.log('Development mode: Email would be sent with:', booking);
    return { success: true };
  }

  try {
    const response = await fetch('/api/booking-confirmation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(booking),
    });

    if (!response.ok) {
      throw new Error('Failed to send confirmation email');
    }

    return { success: true };
  } catch (error) {
    console.error('Email sending failed:', error);
    return { 
      success: false, 
      error: 'Une erreur est survenue lors de l\'envoi de l\'email de confirmation. Notre équipe vous contactera sous peu.'
    };
  }
}