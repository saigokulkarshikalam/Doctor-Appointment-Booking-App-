import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const MyAppointments = () => {
    const { appointments, doctors, setAppointments } = useContext(AppContext);

    // Function to cancel appointment
    const cancelAppointment = (doctorId) => {
        // Remove the doctor from appointments list
        const updatedAppointments = appointments.filter((item) => item.doctorId !== doctorId);
        setAppointments(updatedAppointments); // Update state
    };

    return (
        <div>
            <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">My appointments</p>
            <div>
                {appointments.length === 0 ? (
                    <p>No appointments booked yet.</p>
                ) : (
                    appointments.map((appointment, index) => {
                        const doctor = doctors.find(doc => doc._id === appointment.doctorId);
                        return (
                            <div key={index} className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b">
                                <div>
                                    <img className="w-32 bg-indigo-50" src={doctor.image} alt="" />
                                </div>
                                <div className="flex-1 text-sm text-zinc-600">
                                    <p className="text-neutral-800 font-semibold">{doctor.name}</p>
                                    <p>{doctor.speciality}</p>
                                    <p className="text-zinc-700 font-medium mt-1">Address:</p>
                                    <p className="text-xs">{doctor.address.line1}</p>
                                    <p className="text-xs">{doctor.address.line2}</p>
                                    <p className="text-xs mt-1">
                                        <span className="text-sm text-neutral-700 font-medium">Date & Time:</span> {appointment.appointmentDate} | {appointment.appointmentTime}
                                    </p>
                                </div>
                                <div className="flex flex-col gap-2 justify-end">
                                    <button className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300">
                                        Pay Online
                                    </button>
                                    <button
                                        onClick={() => cancelAppointment(doctor._id)} // Call cancelAppointment on click
                                        className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300"
                                    >
                                        Cancel appointment
                                    </button>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default MyAppointments;
