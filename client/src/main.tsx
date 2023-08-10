/* eslint-disable react-refresh/only-export-components */
import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";

// import CreationPage from "./pages/organizer_pages/creation.tsx";
import "./index.css";

import SpinnerComponent from "./components/common/Spinner.tsx";

const CreationPage = lazy(() => import("./pages/organizer_pages/creation.tsx"));
const ErrorElement = lazy(() => import("./components/common/ErrorElement.tsx"));
const UserHome = lazy(() => import("./pages/home_pages/userHome.tsx"));
const OrganizerHome = lazy(
  () => import("./pages/home_pages/organizerHome.tsx")
);
const LoginPage = lazy(() => import("./pages/user_pages/loginPage.tsx"));
const SignIn = lazy(() => import("./pages/user_pages/signInPage.tsx"));
const SignUpEmailVerifyPage = lazy(
  () => import("./pages/user_pages/signupEmailVerify.tsx")
);
const RegisterHome = lazy(() => import("./pages/home_pages/registerHome.tsx"));
const AdminHome = lazy(() => import("./pages/home_pages/adminHome.tsx"));
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
const AdminLogin = lazy(() => import("./pages/admin_pages/adminLogin.tsx"));
const EventCategoryAddingPage = lazy(
  () => import("./pages/admin_pages/eventCategoryAdding.tsx")
);
const EventCategoryEditForm = lazy(
  () => import("./components/admin_components/editEventCategory.tsx")
);

const OrgCategoryForm = lazy(
  () => import("./components/admin_components/orgcategoryAddingForm.tsx")
);

const OTPLogin = lazy(() => import("./pages/user_pages/OTPLogin.tsx"));
const OTPVerifyPage = lazy(() => import("./pages/user_pages/OTPVerify.tsx"));
const AddCities = lazy(() => import("./pages/admin_pages/addCities.tsx"));
const CityAddingForm = lazy(
  () => import("./components/admin_components/CityAddingForm.tsx")
);

const appRouter = createBrowserRouter([
  {
    path: "/admin/login",
    element: (
      <Suspense fallback={<SpinnerComponent />}>
        <AdminLogin />,
      </Suspense>
    ),
  },
  {
    path: "/admin/add-event-category",
    element: (
      <Suspense fallback={<SpinnerComponent />}>
        <EventCategoryAddingPage />,
      </Suspense>
    ),
  },
  {
    path: "/admin/edit-event-category/:id",
    element: (
      <Suspense fallback={<SpinnerComponent />}>
        <EventCategoryEditForm />,
      </Suspense>
    ),
  },
  {
    path: "/admin/add-org-category",
    element: (
      <Suspense fallback={<SpinnerComponent />}>
        <OrgCategoryForm />,
      </Suspense>
    ),
  },
  {
    path: "/admin",
    element: (
      <Suspense fallback={<SpinnerComponent />}>
        <AdminHome />
      </Suspense>
    ),
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
        element: (
          <Suspense fallback={<SpinnerComponent />}>
            <AddCities />
          </Suspense>
        ),
      },
      {
        path: "/admin/add-cities/add-event-city",
        element: (
          <Suspense>
            <CityAddingForm />
          </Suspense>
        ),
      },
    ],
  },

  {
    path: "/register",
    element: (
      <Suspense fallback={<SpinnerComponent />}>
        <RegisterHome />
      </Suspense>
    ),
    children: [
      {
        path: "/register/user-sign-up-email-verify",
        element: (
          <Suspense fallback={<SpinnerComponent />}>
            <SignUpEmailVerifyPage />
          </Suspense>
        ),
      },
      {
        path: "/register/user-sign-up",
        element: (
          <Suspense fallback={<SpinnerComponent />}>
            <SignIn />
          </Suspense>
        ),
      },
      {
        path: "/register/user-login",
        element: (
          <Suspense fallback={<SpinnerComponent />}>
            <LoginPage />,
          </Suspense>
        ),
      },
      {
        path: "/register/OTP-login",
        element: (
          <Suspense fallback={<SpinnerComponent />}>
            <OTPLogin />,
          </Suspense>
        ),
      },
      {
        path: "/register/OTP-login/OTP-login-submit/:email",
        element: (
          <Suspense fallback={<SpinnerComponent />}>
            <OTPVerifyPage />,
          </Suspense>
        ),
      },
    ],
  },

  {
    path: "/",
    element: (
      <Suspense fallback={<SpinnerComponent />}>
        <UserHome />
      </Suspense>
    ),
    errorElement: (
      <Suspense>
        <ErrorElement />
      </Suspense>
    ),
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
    element: (
      <Suspense fallback={<SpinnerComponent />}>
        <OrganizerHome />
      </Suspense>
    ),
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
        element: (
          <Suspense>
            <CreationPage />
          </Suspense>
        ),
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
