# Navigate to the project directory (ensure you're in the correct path before running)
cd src

# Create the directories
mkdir api
mkdir assets
mkdir components
mkdir components\common
mkdir components\auth
mkdir components\user
mkdir components\appointments
mkdir components\chat
mkdir components\prescription
mkdir components\video
mkdir components\payments
mkdir components\admin
mkdir components\notifications
mkdir context
mkdir hooks
mkdir pages
mkdir routes
mkdir styles

# Create the files
ni api\axiosInstance.js -ItemType File
ni api\userApi.js -ItemType File
ni api\authApi.js -ItemType File
ni api\appointmentApi.js -ItemType File

ni context\AuthContext.js -ItemType File
ni context\UserContext.js -ItemType File

ni hooks\useAuth.js -ItemType File
ni hooks\useFetch.js -ItemType File

ni pages\Home.jsx -ItemType File
ni pages\Login.jsx -ItemType File
ni pages\Register.jsx -ItemType File
ni pages\Profile.jsx -ItemType File
ni pages\AppointmentBooking.jsx -ItemType File
ni pages\ChatRoom.jsx -ItemType File
ni pages\PrescriptionView.jsx -ItemType File
ni pages\VideoConsultation.jsx -ItemType File
ni pages\Payments.jsx -ItemType File
ni pages\AdminDashboard.jsx -ItemType File
ni pages\NotificationsPage.jsx -ItemType File

ni routes\AppRoutes.jsx -ItemType File

ni styles\index.css -ItemType File
ni styles\theme.css -ItemType File

ni App.jsx -ItemType File
ni main.jsx -ItemType File

# Output success message
Write-Host "Vite frontend folder and file structure created successfully!"
