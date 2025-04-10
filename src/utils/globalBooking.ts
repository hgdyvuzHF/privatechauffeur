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
        'https://privatechauffeurbackend.netlify.app/api/global-booking',
        globalBookingData,
        {
          maxBodyLength: Infinity,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
      console.log('Booking Created Successfully:', response.data);
    } catch (error:any) {
      console.error('Error creating booking:', error.response ? error.response.data : error.message);
      alert('Failed to create booking!');
    }
  };