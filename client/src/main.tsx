/* eslint-disable react-refresh/only-export-components */
import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
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
import CreationPage from "./pages/organizer_pages/creation.tsx";
import EventCategoryAddingPage from "./pages/admin_pages/eventCategoryAdding.tsx";
import EventCategoryEditForm from "./components/admin_components/editEventCategory.tsx";
import OrgCategoryForm from "./components/admin_components/orgcategoryAddingForm.tsx";
import "./index.css";
import ErrorElement from "./components/common/ErrorElement.tsx";
import AddCities from "./pages/admin_pages/addCities.tsx";
import CityAddingForm from "./components/admin_components/CityAddingForm.tsx";
import SpinnerComponent from "./components/common/Spinner.tsx";

const AdminLanding = lazy(() => import("./pages/admin_pages/adminHome.tsx"));
const Body = lazy(() => import("./pages/user_pages/userLanding.tsx"));
const CategoryManagement = lazy(
  () => import("./pages/admin_pages/categoryManagement.tsx")
);
const RequestManagement = lazy(
  () => import("./pages/admin_pages/requestManagement.tsx")
);
const UsersAndOrganization = lazy(
  () => import("./pages/admin_pages/usersAndOrganization.tsx")
);
const EventDetails = lazy(() => import("./pages/user_pages/showEvent.tsx"));
const ProfilePage = lazy(
  () => import("./pages/user_pages/profile_pages/profile.tsx")
);
const EditProfile = lazy(
  () => import("./pages/user_pages/profile_pages/editProfile.tsx")
);
const BookingDetailsPage = lazy(
  () => import("./pages/user_pages/profile_pages/bookingDetails.tsx")
);
const SearchPage = lazy(() => import("./pages/user_pages/searchPage.tsx"));
const ShowOrganizer = lazy(
  () => import("./pages/user_pages/showOrganizer.tsx")
);
const OrganizationHome = lazy(() => import("./pages/organizer_pages/home.tsx"));
const EventsHome = lazy(() => import("./pages/organizer_pages/eventsHome.tsx"));
const OrganizationSettings = lazy(
  () => import("./pages/organizer_pages/organizationSettings.tsx")
);
const EditOrganization = lazy(
  () => import("./pages/organizer_pages/editOrganization.tsx")
);

const Reports = lazy(() => import("./pages/organizer_pages/reports.tsx"));
const ViewEvent = lazy(() => import("./pages/organizer_pages/viewEvent.tsx"));
const EventAddingPage = lazy(
  () => import("./pages/organizer_pages/eventAdding.tsx")
);
const BookingHome = lazy(
  () => import("./pages/organizer_pages/bookingHome.tsx")
);


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
        element: (
          <Suspense fallback={<SpinnerComponent />}>
            <AdminLanding />,
          </Suspense>
        ),
      },

      {
        path: "/admin/category-management",
        element: (
          <Suspense fallback={<SpinnerComponent></SpinnerComponent>}>
            <CategoryManagement />,
          </Suspense>
        ),
      },
      {
        path: "/admin/events-management",
        element: (
          <Suspense fallback={<SpinnerComponent />}>
            <RequestManagement />,
          </Suspense>
        ),
      },
      {
        path: "/admin/users-organization-management",
        element: (
          <Suspense fallback={<SpinnerComponent />}>
            <UsersAndOrganization />,
          </Suspense>
        ),
      },
      {
        path: "/admin/add-cities",
        element: <AddCities />,
      },
      {
        path: "/admin/add-cities/add-event-city",
        element: <CityAddingForm />,
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
        element: (
          <Suspense fallback={<SpinnerComponent />}>
            <Body />,
          </Suspense>
        ),
      },
      {
        path: "/show-event",
        element: (
          <Suspense fallback={<SpinnerComponent />}>
            <EventDetails />,
          </Suspense>
        ),
      },
      {
        path: "/user/user-profile",
        element: (
          <Suspense fallback={<SpinnerComponent />}>
            <ProfilePage />,
          </Suspense>
        ),
      },
      {
        path: "/user/edit-profile",
        element: (
          <Suspense fallback={<SpinnerComponent />}>
            <EditProfile />,
          </Suspense>
        ),
      },
      {
        path: "/show-booking",
        element: (
          <Suspense fallback={<SpinnerComponent />}>
            <BookingDetailsPage />,
          </Suspense>
        ),
      },
      {
        path: "/search-events",
        element: (
          <Suspense fallback={<SpinnerComponent />}>
            <SearchPage />,
          </Suspense>
        ),
      },
      {
        path: "/show-organizer",
        element: (
          <Suspense fallback={<SpinnerComponent />}>
            <ShowOrganizer />,
          </Suspense>
        ),
      },
    ],
  },

  {
    path: "/organization",
    element: <OrganizerHome />,
    children: [
      {
        path: "/organization/home",
        element: (
          <Suspense fallback={<SpinnerComponent />}>
            <OrganizationHome />,
          </Suspense>
        ),
      },
      {
        path: "/organization/creation",
        element: <CreationPage />,
      },
      {
        path: "/organization/events",
        element: (
          <Suspense fallback={<SpinnerComponent />}>
            <EventsHome />,
          </Suspense>
        ),
      },
      {
        path: "/organization/settings",
        element: (
          <Suspense fallback={<SpinnerComponent />}>
            <OrganizationSettings />,
          </Suspense>
        ),
      },
      {
        path: "/organization/settings/edit-organization",
        element: (
          <Suspense fallback={<SpinnerComponent />}>
            <EditOrganization />,
          </Suspense>
        ),
      },
      {
        path: "/organization/reports",
        element: (
          <Suspense fallback={<SpinnerComponent />}>
            <Reports />,
          </Suspense>
        ),
      },
      {
        path: "/organization/events/event",
        element: (
          <Suspense fallback={<SpinnerComponent />}>
            <ViewEvent />,
          </Suspense>
        ),
      },
      {
        path: "/organization/add-event",
        element: (
          <Suspense fallback={<SpinnerComponent />}>
            <EventAddingPage />,
          </Suspense>
        ),
      },
      {
        path: "/organization/bookings",
        element: (
          <Suspense fallback={<SpinnerComponent />}>
            <BookingHome />,
          </Suspense>
        ),
      },
    ],
  },
]);
export default appRouter;
