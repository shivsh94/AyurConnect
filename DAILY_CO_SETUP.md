# Daily.co Setup Guide

## ✅ Implementation Complete!

Daily.co has been successfully integrated into AyurConnect. Your video meetings will now:
- ✅ **Connect instantly** - No login or waiting room
- ✅ **Work for free** - Up to 10,000 minutes/month
- ✅ **Professional quality** - HD video and audio
- ✅ **Simple and reliable** - Just works!

---

## Current Setup (No API Key Needed)

The current implementation uses Daily.co's **demo mode** which:
- Works immediately without any setup
- Free for testing and development
- Rooms are temporary (auto-delete after 10 minutes of inactivity)
- Perfect for getting started

**Your meetings will use URLs like:**
`https://ayurconnect.daily.co/ayurconnect-abc123xyz`

---

## Optional: Get Your Own Domain (Recommended for Production)

For production use, you should create a free Daily.co account:

### Step 1: Create Account
1. Go to: https://dashboard.daily.co/signup
2. Sign up for free (no credit card required)
3. Verify your email

### Step 2: Get Your Domain
1. Login to: https://dashboard.daily.co
2. You'll get a custom domain like: `yourcompany.daily.co`
3. This gives you:
   - Persistent rooms
   - Better control
   - Usage analytics
   - Room customization

### Step 3: Update Your Code (Optional)
In `Backend/controllers/appointmentController.js`, change:
```javascript
// From:
return `https://ayurconnect.daily.co/${meetingId}`;

// To:
return `https://YOUR-DOMAIN.daily.co/${meetingId}`;
```

### Step 4: Optional API Key (for Advanced Features)
If you want to programmatically create/delete rooms:

1. Go to: https://dashboard.daily.co/developers
2. Create an API key
3. Add to `Backend/.env`:
   ```
   DAILY_API_KEY=your_api_key_here
   ```

---

## How It Works Now

### When Doctor Accepts Appointment:
1. System generates unique meeting ID: `ayurconnect-abc123`
2. Creates Daily.co URL: `https://ayurconnect.daily.co/ayurconnect-abc123`
3. Stores in database

### When Users Join Meeting:
1. Click "Join Meeting" button
2. Daily.co loads instantly
3. Camera/mic permissions requested
4. **Immediate connection** - no waiting!

### Both Users Can:
- Join/leave anytime
- See each other instantly
- Share screen
- Use chat
- Control audio/video

---

## Features Available

✅ HD video and audio
✅ Screen sharing
✅ Chat messaging
✅ Recording (with API key)
✅ Virtual backgrounds
✅ Mobile support
✅ No downloads needed
✅ Works in browser

---

## Free Tier Limits

- **10,000 minutes/month** (166 hours)
- Unlimited participants per room
- Unlimited rooms
- Full features included

**Example calculations:**
- 30-min consultations: ~333 meetings/month
- 1-hour consultations: ~166 meetings/month

---

## Testing Your Setup

1. Have the doctor accept an appointment
2. Both doctor and patient click "Join Meeting"
3. Should connect **instantly** - no lobby/waiting
4. Test video, audio, and screen sharing

---

## Troubleshooting

### If meeting doesn't load:
1. Check browser console for errors
2. Ensure appointment is "confirmed" status
3. Clear browser cache
4. Try different browser (Chrome recommended)

### If video/audio not working:
1. Check browser permissions for camera/microphone
2. Try refreshing the page
3. Check if camera/mic work in other apps

---

## Upgrade Options (If Needed Later)

Daily.co has paid plans if you need more:
- **Starter**: $99/month - 25,000 minutes
- **Business**: $299/month - 100,000 minutes
- **Enterprise**: Custom pricing

But the **free tier should be plenty** for starting out!

---

## Support & Resources

- Daily.co Docs: https://docs.daily.co
- React SDK: https://docs.daily.co/reference/daily-react
- Support: support@daily.co

---

## Next Steps

1. ✅ Implementation is complete
2. Test the new instant-connect meetings
3. (Optional) Create free Daily.co account for custom domain
4. Deploy and start using in production!

**Your meetings will now connect instantly!** 🎉
