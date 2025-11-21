# Meeting Troubleshooting Guide

## Why is the meeting not starting?

The meeting requires several conditions to be met:

### ✅ Checklist Before Joining Meeting:

1. **Appointment Status**
   - Must be "confirmed" (not "pending", "cancelled", or "completed")
   - Check in appointments list

2. **Doctor Acceptance**
   - Doctor MUST click "Accept" button first
   - This generates the meeting ID and URL
   - Without acceptance, no meeting link exists

3. **Meeting Time Window**
   - Can join **10 minutes before** scheduled time
   - Can join up to **2 hours after** scheduled time
   - Outside this window = "Meeting Unavailable"

4. **Meeting ID Generated**
   - Check if appointment has a `meetingId` field
   - Generated automatically when doctor accepts

5. **Browser Permissions**
   - Allow camera access
   - Allow microphone access
   - Disable ad blockers (they may block Jitsi)
   - Clear browser cache if needed

---

## Common Errors & Solutions:

### Error: "Meeting is only available for confirmed appointments"
**Solution:** Doctor must accept the appointment first

### Error: "Meeting link not generated yet"
**Solution:** Doctor must accept the appointment to trigger link generation

### Error: "Meeting can only be joined 10 minutes before scheduled time"
**Solution:** Wait until 10 minutes before appointment time

### Error: "Meeting time has expired"
**Solution:** Appointment window has passed (>2 hours after scheduled time)

### Error: "ERR_BLOCKED_BY_CLIENT" (in browser console)
**Solution:** 
- Disable ad blockers
- Check browser permissions for camera/microphone
- Try a different browser (Chrome recommended)

---

## Step-by-Step Process:

### For Patients:
1. Book appointment
2. Wait for doctor to accept
3. Check appointment status shows "confirmed"
4. Join 10 minutes before scheduled time
5. Allow camera/microphone permissions

### For Doctors:
1. Receive appointment request
2. **Click "Accept" button** (CRITICAL STEP)
3. System generates meeting link automatically
4. Join 10 minutes before scheduled time
5. Allow camera/microphone permissions

---

## Testing Your Setup:

Run this in browser console on appointments page:
```javascript
// Check your appointments data
console.log('Appointments:', appointments);

// Check specific appointment
const appointment = appointments[0]; // Change index as needed
console.log('Status:', appointment.status);
console.log('Meeting ID:', appointment.meetingId);
console.log('Can Join:', canJoinMeeting(appointment));
```

---

## Database Check (Backend):

If you have database access, verify appointment document:
```javascript
{
  status: "confirmed",        // Must be confirmed
  meetingId: "ayurconnect-...", // Must exist
  meetingUrl: "https://meet.jit.si/...", // Must exist
  meetingStatus: "not_started" // or "ongoing"
}
```

---

## Still Not Working?

1. **Check browser console** for specific errors
2. **Verify backend is running** (port 3030)
3. **Check network tab** for failed API calls
4. **Ensure cookies are enabled** (authentication required)
5. **Try incognito mode** (rules out extensions)

---

## Quick Fix Commands:

### Check Backend Status:
```bash
cd Backend
npm run dev
# Should show: Server running on port 3030
```

### Check Frontend Status:
```bash
cd Frontend  
npm run dev
# Should show: Local: http://localhost:5173/
```

### Verify Environment Variables:
```bash
# Frontend/.env
VITE_API_URL=http://localhost:3030

# Backend/.env
PORT=3030
MONGODB_URI=your_mongodb_connection_string
```
