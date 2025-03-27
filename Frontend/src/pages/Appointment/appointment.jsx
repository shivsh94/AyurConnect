import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const AppointmentPage = () => {
  const { doctorId } = useParams();

  const [formData, setFormData] = useState({
    doctorId: doctorId,
    appointmentDate: "",
    appointmentTime: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post("/createAppointment", formData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to book appointment");
    } finally {
      setLoading(false);
    }
  };

  const generateTimeSlots = () => {
    const slots = [];
    let startTime = new Date();
    startTime.setHours(9, 0, 0, 0);
    let endTime = new Date();
    endTime.setHours(17, 0, 0, 0);
    while (startTime < endTime) {
      const timeString = startTime.toLocaleTimeString([], {   
        hour: "2-digit",
        minute: "2-digit",
      });
      slots.push(timeString);
      startTime.setMinutes(startTime.getMinutes() + 10);
    }
    return slots;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white p-4">
      <div className="bg-black p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Book an Appointment</h2>
        {message && <p className="text-center text-sm mb-4 text-red-500">{message}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white">Appointment Date</label>
            <input
              type="date"
              name="appointmentDate"
              value={formData.appointmentDate}
              onChange={handleChange}
              required
              className="mt-1 p-2 w-full border rounded-lg focus:ring focus:ring-blue-300 text-black"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white">Appointment Time</label>
            <div className="grid grid-cols-3 gap-2 mt-2 text-black">
              {generateTimeSlots().map((slot, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setFormData({ ...formData, appointmentTime: slot })}
                  className={`p-2 text-sm rounded-lg border focus:ring focus:ring-blue-300 transition ${formData.appointmentTime === slot ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"
                    }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
            disabled={loading}
          >
            {loading ? "Booking..." : "Book Appointment"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AppointmentPage;
