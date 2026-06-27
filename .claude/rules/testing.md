# Testing Guidelines

## Frontend Manual Testing Flows

### Auth Flow
```
1. Register: fill email → send OTP → verify → submit form
   ✓ Loading state shows during API calls
   ✓ OTP resend cooldown works (60s timer)
   ✓ Email validation prevents invalid formats
   ✓ Password strength indicator updates live
   ✓ Changing email clears OTP state

2. Login: enter credentials → loading → redirect
   ✓ Admin login → /admin-skill-arena
   ✓ Student login → /skill-arena/dashboard
   ✓ Failed login shows error, not stuck loading

3. Logout: click logout
   ✓ Redirects to /
   ✓ /skill-arena/dashboard redirects to /login
   ✓ Guest device ID preserved in localStorage
   ✓ Theme preserved

4. Session restore: load /skill-arena/dashboard directly
   ✓ If valid session → shows dashboard
   ✓ If expired → redirects to /login?redirect=...
   ✓ No flash of unauthenticated content
```

### Dashboard Flow
```
1. Gates view: click a gate
   ✓ SubjectPanel opens (right overlay)
   ✓ Clicking concept opens ConceptInlinePanel (inline left)
   ✓ Changing concept quickly doesn't show stale content (race condition fix)
   ✓ Quiz trial button unlocks after 100% progress

2. Paths view: enroll in a path
   ✓ Enroll button shows spinner during API call
   ✓ Button disabled during pause/resume (separate flags)
   ✓ Progress bar updates after enrollment

3. Quiz flow: start → answer → submit → result
   ✓ Timer counts down (if subject/roadmap quiz)
   ✓ Auto-submits when timer reaches 0
   ✓ Submit button disabled after first click
   ✓ Result page shows score, XP earned, badge if earned

4. After quiz pass: return to dashboard
   ✓ Progress updates (sl:refresh fired)
   ✓ Concept shows as CLEARED
   ✓ Daily quest q1 marked done (if first concept today)
```

### Admin Flow
```
1. Create subject → view in student dashboard
   ✓ Appears in gates list immediately (cache evicted)

2. Create concept under subject
   ✓ Appears in subject panel after cache clears (2 min or hard refresh)

3. Create mission → view in /missions
   ✓ Appears immediately (missions cache 30s TTL)
```

## Backend API Testing (Postman / curl)

### Auth Endpoints
```bash
# Register
POST /api/auth/register
{ "fullName": "Test User", "email": "test@x.com", "password": "***REMOVED***", "collegeName": "MIT" }

# Login
POST /api/auth/login
{ "email": "test@x.com", "password": "***REMOVED***" }
→ Should set SESSION_TOKEN cookie

# Get current user
GET /api/auth/me
Cookie: SESSION_TOKEN=...
→ Returns user object without password

# Guest login
POST /api/auth/guest
{ "guestId": null }
→ Creates guest user, sets cookie
```

### Protected Endpoint Test
```bash
# Without cookie → 401
GET /api/progress/summary

# With cookie → 200
GET /api/progress/summary
Cookie: SESSION_TOKEN=...
```

### Admin Endpoint Test
```bash
# With student cookie → 403
GET /api/admin/users
Cookie: <student-cookie>

# With admin cookie → 200
GET /api/admin/users
Cookie: <admin-cookie>
```

## Edge Cases to Test

### Network Failures
- Kill backend → frontend shows error toast (not blank screen)
- Slow network → loading spinners show correctly
- 500 from backend → error message shown to user

### Data Edge Cases
- Empty missions list → "No missions found" shown (not crash)
- Concept with no video → no broken link shown
- Subject with 0 concepts → gate shows "sealed" state
- User with 0 XP → E-rank shown correctly

### Race Conditions
- Click different concepts rapidly → last clicked concept shown (not an earlier one)
- Navigate away from quiz mid-load → no state update after unmount
- Pause then immediately resume roadmap → both requests complete correctly (separate flags)
