# TODO List

## Completed Tasks

### Add Return to Home Screen Button
- [x] Added home button to AdminDashboard.tsx
- [x] Added home button to Login.tsx
- [x] Both buttons navigate to '/' using React Router's useNavigate

### Export to Excel Button (Dashboard)
- [x] Added new backend route `/api/donations/export` to generate Excel files
- [x] Used xlsx library to create properly formatted Excel files with Arabic headers
- [x] Added export button to AdminDashboard with Download icon
- [x] Implemented client-side download functionality with proper error handling
- [x] File includes all donation data with proper column formatting

## Pending Tasks

- [ ] Add dark mode toggle to other components if needed
- [ ] Test the new buttons for functionality
- [ ] Ensure consistency across all components

## Summary

The task to add return to home screen buttons in the AdminDashboard and Login components has been completed successfully. Both components now have a home button that allows users to navigate back to the home page easily.

Additionally, the Export to Excel functionality has been implemented:
- Backend generates Excel files with all donation data
- Frontend provides a green "تصدير إلى Excel" button in the dashboard filters
- Downloads file as "donations.xlsx" with proper Arabic column headers
- Includes ID, full name, phone, region, district, category, status, and creation date
