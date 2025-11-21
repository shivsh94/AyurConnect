# Video Consultation Feature - Implementation Complete

## Overview
Complete end-to-end Jitsi Meet video consultation feature for AyurConnect. Allows doctors and patients to have video consultations for confirmed appointments.

## Features Implemented

### Backend

#### 1. Updated Appointment Schema
**File**: `Backend/models/appointmentSchema.js`
- Added `meetingId`: Unique identifier for each meeting room
- Added `meetingUrl`: Full Jitsi Meet URL
- Added `meetingStatus`: Tracks meeting state (not_started, ongoing, ended)
- Added `meetingStartedAt`: Timestamp when meeting starts
- Added `meetingEndedAt`: Timestamp when meeting ends

#### 2. Meeting Controllers
**File**: `Backend/controllers/appointmentController.js`

**New Functions**:
- `generateMeetingId()`: Creates unique MD5-based meeting ID
- `generateMeetingUrl()`: Generates Jitsi Meet URL
- `getMeetingDetails()`: Fetches meeting info with access validation
- `startMeeting()`: Updates meeting status to "ongoing"
- `endMeeting()`: Marks meeting as ended and appointment as completed

**Updated Functions**:
- `acceptAppointment()`: Automatically generates meeting link when doctor accepts
- `getPatientAppointments()`: Returns meeting data with appointments
- `getDoctorAppointments()`: Returns meeting data with appointments

#### 3. New API Routes
**File**: `Backend/routes/userRoute.js`
```
GET    /api/v1/user/appointments/:appointmentId/meeting
POST   /api/v1/user/appointments/:appointmentId/meeting/start
POST   /api/v1/user/appointments/:appointmentId/meeting/end
```

### Frontend

#### 1. MeetingRoom Component
**File**: `Frontend/src/pages/Appointment/MeetingRoom.jsx`

**Features**:
- Full Jitsi Meet integration via External API
- Automatic meeting validation (time, status, access)
- User info display (doctor/patient name based on role)
- Auto-start meeting status on join
- Auto-end meeting on leave
- Error handling with user-friendly messages
- Automatic redirect on meeting end

**Security**:
- Validates user has access to appointment
- Checks if meeting is within allowed time window (10 mins before to 2 hours after)
- Verifies appointment is confirmed

#### 2. Updated PatientAppointments
**File**: `Frontend/src/pages/PatientHomePage/PatientAppointments.jsx`

**New Features**:
- "Join Meeting" button for confirmed appointments
- Time-based meeting availability check
- Visual feedback for unavailable meetings
- Automatic navigation to meeting room

#### 3. Updated DoctorAppointments
**File**: `Frontend/src/pages/DoctorHomePage/DoctorAppointments.jsx`

**New Features**:
- "Start Consultation" button for confirmed appointments
- Time-based meeting availability check
- Visual feedback for unavailable meetings
- Automatic navigation to meeting room

#### 4. New Route
**File**: `Frontend/src/App.jsx`
- Added `/meeting/:appointmentId` protected route
- Accessible by both doctors and patients

## How It Works

### Workflow

1. **Patient books appointment** → Status: pending
2. **Doctor accepts appointment** → Status: confirmed, meeting link auto-generated
3. **10 minutes before appointment** → "Join Meeting" button becomes active
4. **Click "Join Meeting"** → Navigate to MeetingRoom component
5. **Meeting loads** → Jitsi Meet embedded, meeting status updated to "ongoing"
6. **Meeting ends** → Status updated to "ended", appointment marked "completed"
7. **Auto redirect** → Back to appointments page

### Meeting Link Generation
- Format: `ayurconnect-{MD5_HASH}`
- Example: `ayurconnect-a1b2c3d4e5f6`
- Full URL: `https://meet.jit.si/ayurconnect-a1b2c3d4e5f6`

### Access Control
- Only appointment participants can join (doctor and patient)
- Meeting available 10 minutes before scheduled time
- Meeting expires 2 hours after scheduled time
- Only confirmed appointments have meeting links

## Configuration

### Jitsi Meet Settings
The MeetingRoom component uses Jitsi Meet's External API with these default settings:

**Features Enabled**:
- Audio/Video mute/unmute
- Screen sharing
- Chat
- Participant list
- Device selection
- Recording (if needed)
- Raise hand
- Full screen

**Customizations**:
- No Jitsi watermark
- Pre-join page disabled
- Auto-join with video/audio enabled
- Deep linking disabled

## Testing Steps

### 1. Create Appointment
```
1. Login as patient
2. Book appointment with a doctor
3. Note the appointment ID
```

### 2. Accept Appointment
```
1. Login as doctor
2. Go to appointments
3. Accept the pending appointment
4. Verify meeting link is generated
```

### 3. Join Meeting (Patient)
```
1. Login as patient
2. Go to appointments
3. Wait until 10 mins before appointment time (or modify time for testing)
4. Click "Join Meeting"
5. Verify Jitsi Meet loads
6. Test video/audio
```

### 4. Join Meeting (Doctor)
```
1. Login as doctor  
2. Go to appointments
3. Click "Start Consultation"
4. Verify Jitsi Meet loads
5. Test video/audio with patient
```

### 5. End Meeting
```
1. Click "Leave Meeting" or hangup in Jitsi
2. Verify redirect to appointments page
3. Check appointment status changed to "completed"
```

## Database Changes

### Before Migration
Existing appointments won't have meeting data. Only new appointments accepted after deployment will have meeting links.

### To Add Meeting Links to Existing Appointments
Run this MongoDB update for confirmed appointments:
```javascript
db.appointments.find({ status: 'confirmed', meetingId: null }).forEach(function(doc) {
  const crypto = require('crypto');
  const hash = crypto.createHash('md5').update(doc._id.toString()).digest('hex');
  const meetingId = `ayurconnect-${hash.substring(0, 12)}`;
  const meetingUrl = `https://meet.jit.si/${meetingId}`;
  
  db.appointments.updateOne(
    { _id: doc._id },
    { $set: { 
      meetingId: meetingId,
      meetingUrl: meetingUrl,
      meetingStatus: 'not_started'
    }}
  );
});
```

## Troubleshooting

### Meeting Button Not Showing
- Check appointment status is "confirmed"
- Verify meeting link exists in appointment data
- Check current time is within 10 mins before to 2 hours after appointment

### Meeting Won't Load
- Check browser console for errors
- Verify Jitsi External API script loaded
- Check network connection
- Try refreshing the page

### Access Denied Error
- Verify user is either the patient or doctor for this appointment
- Check authentication cookies are valid
- Verify appointment exists

## Security Considerations

✅ Meeting links only generated for confirmed appointments
✅ Access restricted to appointment participants only  
✅ Time-based access control (10 mins before to 2 hours after)
✅ Meeting IDs are unique and non-guessable (MD5 hash)
✅ All API endpoints protected with authentication middleware
✅ Meeting status tracking prevents unauthorized access

## Future Enhancements

- [ ] Email/SMS notifications with meeting link
- [ ] Meeting recording functionality
- [ ] In-meeting prescription sharing
- [ ] Post-consultation notes
- [ ] Meeting history/recordings storage
- [ ] Calendar integration
- [ ] Waiting room feature
- [ ] Meeting reminders (15 mins, 5 mins before)

## Dependencies

### Backend
- crypto (Node.js built-in)
- Existing: express, mongoose, axios

### Frontend
- Jitsi Meet External API (loaded via CDN)
- Existing: react, react-router-dom, axios, react-hot-toast

## Support

For issues or questions:
1. Check console logs (browser and server)
2. Verify all endpoints are working
3. Test with different appointment statuses
4. Check time synchronization between client/server

---

**Status**: ✅ Fully Implemented and Ready for Testing
**Date**: November 22, 2025
**Integration**: Jitsi Meet (Free, Open Source)
