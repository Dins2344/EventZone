import { createBrowserRouter } from "react-router-dom";
import AdminLanding from "./pages/admin_pages/adminHome.tsx";
import AdminLogin from "./pages/admin_pages/adminLogin.tsx";
import {
  UserHome,
  AdminHome,
  OrganizerHome,
  RegisterHome,
} from "./pages/homePages.tsx";
import SignIn from "./pages/user_pages/signInPage.tsx";
import SignUpEmailVerifyPage from "./pages/user_pages/signupEmailVerify.tsx";
import LoginPage from "./pages/user_pages/loginPage.tsx";
import OTPLogin from "./pages/user_pages/OTPLogin.tsx";
import OTPVerifyPage from "./pages/user_pages/OTPVerify.tsx";
import Body from "./pages/user_pages/userLanding.tsx";
import ProfilePage from "./pages/user_pages/profile_pages/profile.tsx";
import BookingDetailsPage from "./pages/user_pages/profile_pages/bookingDetails.tsx";
import CreationPage from "./pages/organizer_pages/creation.tsx";
import OrganizationHome from "./pages/organizer_pages/home.tsx";
import CategoryManagement from "./pages/admin_pages/categoryManagement.tsx";
import EventCategoryAddingPage from "./pages/admin_pages/eventCategoryAdding.tsx";
import EventCategoryEditForm from "./components/admin_components/editEventCategory.tsx";
import OrgCategoryForm from "./components/admin_components/orgcategoryAddingForm.tsx";
import EventsHome from "./pages/organizer_pages/eventsHome.tsx";
import "./index.css";
import EventAddingPage from "./pages/organizer_pages/eventAdding.tsx";
import RequestManagement from "./pages/admin_pages/requestManagement.tsx";
import EventDetails from "./pages/user_pages/showEvent.tsx";
import ViewEvent from "./pages/organizer_pages/viewEvent.tsx";
import ErrorElement from "./components/common/ErrorElement.tsx";
import BookingHome from "./pages/organizer_pages/bookingHome.tsx";
import EditProfile from "./pages/user_pages/profile_pages/editProfile.tsx";

const appRouter = createBrowserRouter([
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },
  {
    path: "/admin/add-event-category",
    element: <EventCategoryAddingPage />,
  },
  {
    path: "/admin/edit-event-category/:id",
    element: <EventCategoryEditForm />,
  },
  {
    path: "/admin/add-org-category",
    element: <OrgCategoryForm />,
  },
  {
    path: "/admin",
    element: <AdminHome />,
    children: [
      {
        path: "/admin",
        element: <AdminLanding />,
      },

      {
        path: "/admin/category-management",
        element: <CategoryManagement />,
      },
      {
        path: "/admin/request-management",
        element: <RequestManagement />,
      },
    ],
  },

  {
    path: "/register",
    element: <RegisterHome />,
    children: [
      {
        path: "/register/user-sign-up-email-verify",
        element: <SignUpEmailVerifyPage />,
      },
      {
        path: "/register/user-sign-up",
        element: <SignIn />,
      },
      {
        path: "/register/user-login",
        element: <LoginPage />,
      },
      {
        path: "/register/OTP-login",
        element: <OTPLogin />,
      },
      {
        path: "/register/OTP-login/OTP-login-submit/:email",
        element: <OTPVerifyPage />,
      },
    ],
  },

  {
    path: "/",
    element: <UserHome />,
    errorElement: <ErrorElement />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/show-event",
        element: <EventDetails />,
      },
      {
        path: "/user/user-profile",
        element: <ProfilePage />,
      },
      {
        path: '/user/edit-profile',
        element: <EditProfile />
      },
      {
        path: "/show-booking",
        element: <BookingDetailsPage />,
      },
    ],
  },

  {
    path: "/organization",
    element: <OrganizerHome />,
    children: [
      {
        path: "/organization/home",
        element: <OrganizationHome />,
      },
      {
        path: "/organization/creation",
        element: <CreationPage />,
      },
      {
        path: "/organization/events",
        element: <EventsHome />,
      },
      {
        path: "/organization/events/event",
        element: <ViewEvent />,
      },
      {
        path: "/organization/add-event",
        element: <EventAddingPage />,
      },
      {
        path: "/organization/bookings",
        element: <BookingHome />,
      },
    ],
  },
]);
export default appRouter;
