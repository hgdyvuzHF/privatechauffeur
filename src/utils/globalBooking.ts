import axios from "axios";


export async function submitGlobalBooking() {
    // Get global booking data from local storage it is combination of selectVehicle bookingForm and bookingFormDetails
    const BookingDetails = JSON.parse(localStorage.getItem('BookingDetails') || '{}');
    const BookingForm = JSON.parse(localStorage.getItem('BookingForm') || '{}');
    const SelectedVehicle = JSON.parse(localStorage.getItem('SelectedVehicle') || '{}');
    const globalBookingData = {
        bookingDetails : BookingDetails,
        bookingForm : BookingForm,
        selectedVehicle : SelectedVehicle,
    }
    try {
      const response = await axios.post(
        'http://localhost:3000/api/global-booking',
        globalBookingData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
      console.log('Booking Created Successfully:', response.data);
      alert('Booking Created Successfully!');
    } catch (error) {
      console.error('Error creating booking:', error.response ? error.response.data : error.message);
      alert('Failed to create booking!');
    }
  };